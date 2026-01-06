import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateGoogleAuthDto } from './dto/create-google-auth.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { ResetPasswordDto } from './dto/reset-password.dto';

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
        country: ' ',
      },
      credit: 1,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);

    return this.registerJwt(savedUser, res);
  }

  async generateResetPasswordToken(email: string): Promise<User> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    const user = await this.usersRepository.findOne({ 
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    await this.usersRepository.save({
      ...user,
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: expiresAt,
    });

    return user;
  }

  async resetPassword(data: ResetPasswordDto) {
    const user = await this.usersRepository.findOne({
      where: { email: data.email },
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
    newPassword: string): Promise<{ message: string; userStatus: string }> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    if (!user.isInvited) {
      throw new UnauthorizedException('User is not an invited employee');
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
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
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

    return updatedUser;
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
          password: password,
          accountType: 'dementia-user',
          credit: 1,
          isActive: true,
        },
        res,
      );
      return authResponse;
    }
    return this.registerJwt(user, res);
  }
}
