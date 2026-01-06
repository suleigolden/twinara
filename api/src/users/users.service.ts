import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SendInvitationDto } from './dto/send-invitation.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateGoogleAuthDto } from './dto/create-google-auth.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { InvitedStatus } from './types/invited-status.type';
import { EmailService } from '../email/email.service';
import { Organization } from '../organization/entities/organization.entity';

type AuthResponse = {
  access_token?: string;
  user: Omit<User, 'password'>;
};
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    res: Response,
  ): Promise<AuthResponse> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      address: {
        street: ' ',
        city: ' ',
        state: ' ',
        postal_code: ' ',
        country: createUserDto.country,
      },
      credit: 1,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);

    if (createUserDto.accountType === 'organization') {
      const organization = this.organizationRepository.create({
        name: createUserDto.organizationName,
        userId: savedUser.id,
        address: {
          street: savedUser.address.street,
          city: savedUser.address.city,
          state: savedUser.address.state,
          postal_code: savedUser.address.postal_code,
          country: savedUser.address.country,
        },
      });
      await this.organizationRepository.save(organization);
    }
    
    // Reload user with organization relation
    const userWithOrg = await this.usersRepository.findOne({
      where: { id: savedUser.id },
      relations: ['organization'],
    });
    
    if (createUserDto.provider === 'internal') {
      return this.registerJwt(userWithOrg, res);
    }
    return { user: userWithOrg };
  }

  async generateResetPasswordToken(email: string): Promise<User> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    const user = await this.usersRepository.findOne({ 
      where: { email },
      relations: ['organization'],
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    // if (
    //   user.resetPasswordToken &&
    //   !this.isTokenExpired(user.resetPasswordTokenExpiresAt)
    // ) {
    //   throw new Error('We already sent you a password reset link');
    // }

    await this.usersRepository.save({
      ...user,
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: expiresAt,
    });

    // Send password reset email
    await this.emailService.sendPasswordResetEmail({
      email: user.email,
      firstName: user.firstName,
      resetPasswordToken: token,
    });

    return user;
  }

  async resetPassword(data: ResetPasswordDto) {
    const user = await this.usersRepository.findOne({
      where: { email: data.email },
      relations: ['organization'],
    });

    if (!user) {
      throw new NotFoundException(`User with email ${data.email} not found`);
    }
    if (user.resetPasswordToken !== data.token) {
      throw new UnauthorizedException('Invalid token');
    }

    if (this.isTokenExpired(user.resetPasswordTokenExpiresAt)) {
      throw new UnauthorizedException('Token expired');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await this.usersRepository.save({
      ...user,
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordTokenExpiresAt: null,
    });
    return { message: 'Password reset successfully' };
  }

  async setupPassword(email: string, 
    tempPassword: string, 
    newPassword: string,
    organizationId: string): Promise<{ message: string; userStatus: string }> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    if (!user.isInvited) {
      throw new UnauthorizedException('User is not an invited employee');
    }
    if (user.invitedStatus === InvitedStatus.ACTIVE) {
      throw new UnauthorizedException('User is already active');
    }
    if (user.organizationId !== organizationId) {
      throw new UnauthorizedException('User is not part of the organization');
    }
    

    // Verify temporary password
    const isTempPasswordValid = await bcrypt.compare(tempPassword, user.password);
    if (!isTempPasswordValid) {
      throw new UnauthorizedException('Invalid temporary password');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user with new password and mark as active
    await this.usersRepository.save({
      ...user,
      password: hashedPassword,
      invitedStatus: InvitedStatus.ACTIVE,
    });

    return { message: 'Password setup successful', userStatus: 'active' };
  }

  async validateUserSetupStatus(email: string, organizationId: string): Promise<{ 
    isValid: boolean; 
    userStatus: string; 
    message: string; 
    shouldRedirect: boolean;
  }> {
    const user = await this.findByEmail(email);

    if (!user) {
      return {
        isValid: false,
        userStatus: 'not_found',
        message: 'User not found',
        shouldRedirect: false
      };
    }

    if (!user.isInvited) {
      return {
        isValid: false,
        userStatus: 'not_invited',
        message: 'User is not an invited employee',
        shouldRedirect: false
      };
    }

    if (user.invitedStatus === InvitedStatus.ACTIVE) {
      return {
        isValid: false,
        userStatus: 'already_active',
        message: 'User is already active',
        shouldRedirect: true
      };
    }

    if (user.organizationId !== organizationId) {
      return {
        isValid: false,
        userStatus: 'wrong_organization',
        message: 'User is not part of the organization',
        shouldRedirect: false
      };
    }

    return {
      isValid: true,
      userStatus: 'pending',
      message: 'User can proceed with password setup',
      shouldRedirect: false
    };
  }

  isTokenExpired(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tokenExpiresAt = new Date(date);
    return tokenExpiresAt < today;
  }

  async registerJwt(userData: User, res: Response): Promise<AuthResponse> {
    const { access_token, user } = this.createToken(userData);
    this.setTokenCookie(res, access_token);
    return { user, access_token };
  }

  private createToken(user: User): AuthResponse {
    const { password, ...payload } = user;
    return {
      access_token: this.jwtService.sign(payload),
      user: payload as Omit<User, 'password'>,
    };
  }

  private setTokenCookie(res: Response, token: string) {
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensures secure cookies in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Allow cross-origin requests
      domain: process.env.DOMAIN, // Set to your domain
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days expiration
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['organization'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
      relations: ['organization'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  async findInvitedEmployees(organizationId: string): Promise<User[]> {
    const users = await this.usersRepository.find({ 
      where: { organizationId },
      relations: ['invitedByUser', 'organization']
    });

    if (!users) {
      throw new NotFoundException(`No invited employees found for organization ${organizationId}`);
    }
    return users;
  }

  async sendInvitations(
    sendInvitationDto: SendInvitationDto,
    inviterId: string,
    organizationId: string,
    organizationName: string
  ): Promise<{ success: number; failed: number; errors: string[]; invitedEmployees: User[] }> {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    };

    const inviter = await this.findOne(inviterId);

    for (const invitation of sendInvitationDto.invitations) {
      try {
        // Check if user already exists
        const existingUser = await this.findByEmail(invitation.email);
        
        if (existingUser) {
          results.failed++;
          results.errors.push(`User with email ${invitation.email} already exists`);
          continue;
        }

        // Create new user with invitation data
        const tempPassword = crypto.randomBytes(8).toString('hex');
        const hashedPassword = await bcrypt.hash(tempPassword, 10);
        
        const newUser = this.usersRepository.create({
          email: invitation.email,
          firstName: invitation.firstName,
          lastName: invitation.lastName,
          organizationId: organizationId,
          password: hashedPassword,
          accountType: 'organization-user',
          credit: 0,
          isActive: true,
          isInvited: true,
          invitedStatus: InvitedStatus.PENDING,
          invitedAt: new Date(),
          invitedByUser: inviter,
          role: 'character'
        });

        await this.usersRepository.save(newUser);
        results.success++;

        // Determine inviter name based on account type
        const inviterName = inviter.accountType === 'organization' 
          ? organizationName 
          : `${inviter.firstName} ${inviter.lastName}`;

        // Send email invitation here
        await this.emailService.sendInvitationEmail({
          email: invitation.email,
          firstName: invitation.firstName,
          lastName: invitation.lastName,
          organizationName: organizationName,
          organizationId: organizationId,
          inviterName: inviterName,
          tempPassword: tempPassword
        });

      } catch (error) {
        results.failed++;
        results.errors.push(`Failed to invite ${invitation.email}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
    const invitedEmployees = await this.findInvitedEmployees(organizationId);
    return {
      success: results.success,
      failed: results.failed,
      errors: results.errors,
      invitedEmployees: invitedEmployees
    };
  }

  async removeInvitation(invitationId: string): Promise<{ message: string }> {
    const user = await this.findOne(invitationId);
    
    if (!user.isInvited) {
      throw new NotFoundException('User is not an invited employee');
    }

    await this.usersRepository.remove(user);
    
    return { message: 'Invitation removed successfully' };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.currentPassword && updateUserDto.newPassword) {
      // Verify current password
      const isPasswordValid = await bcrypt.compare(
        updateUserDto.currentPassword,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Current password is incorrect');
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(updateUserDto.newPassword, 10);
      updateUserDto.password = hashedPassword;

      // Remove password fields from DTO
      delete updateUserDto.currentPassword;
      delete updateUserDto.newPassword;
    }

    const updatedUser = await this.usersRepository.save({
      ...user,
      ...updateUserDto,
    });

    // Reload user with organization relation
    return await this.usersRepository.findOne({
      where: { id: updatedUser.id },
      relations: ['organization'],
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ 
      where: { email },
      relations: ['organization'],
    });
    return user;
  }

  async googleAuth(
    createGoogleAuthDto: CreateGoogleAuthDto,
    res: Response,
  ): Promise<AuthResponse> {
    const user = await this.findByEmail(createGoogleAuthDto.email);
    const password = `google_${createGoogleAuthDto.email[2]}${createGoogleAuthDto.lastName[1]}`;
    if (!user) {
      const authResponse = await this.create(
        {
          email: createGoogleAuthDto.email,
          firstName: createGoogleAuthDto.firstName,
          lastName: createGoogleAuthDto.lastName,
          organizationName: '',
          password: password,
          accountType: 'individual',
          credit: 1,
          isActive: true,
          country: '',
        },
        res,
      );
      return authResponse;
    }
    return this.registerJwt(user, res);
  }
}
