import { Injectable, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { DementiaProfilesService } from '../dementia-profiles/dementia-profiles.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private tokenBlacklist: Set<string> = new Set();

  constructor(
    private usersService: UsersService,
    @Inject(forwardRef(() => DementiaProfilesService))
    private dementiaProfilesService: DementiaProfilesService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.usersService.findByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.usersService.registerJwt(user, res);
  }

  async register(signUpDto: SignUpDto, res: Response) {
    
    const createUserDto = {
      email: signUpDto.email,
      firstName: signUpDto.first_name,
      lastName: signUpDto.last_name,
      password: signUpDto.password,
      accountType: signUpDto.accountType || 'individual',
      isActive: true,
      credit: 1,
      country: signUpDto.country || '',
      organizationName: signUpDto.organization_name || '',
      provider: 'external',
    };

    const authResponse = await this.usersService.create(createUserDto, res);
    const fullUser = await this.usersService.findOne(authResponse.user.id);

    // Create dementia profile if account type is dementia-user
    // Handle both single value and array cases from SignUpDto
    const signUpAccountType = signUpDto.accountType;
    const isDementiaUser = 
      signUpAccountType === 'dementia-user' || 
      (Array.isArray(signUpAccountType) && signUpAccountType.includes('dementia-user')) ||
      createUserDto.accountType === 'dementia-user';
    
    if (isDementiaUser) {
      await this.dementiaProfilesService.create(fullUser.id, {
        firstName: signUpDto.first_name,
        lastName: signUpDto.last_name,
        email: signUpDto.email,
      });
    }
    
    return this.usersService.registerJwt(fullUser, res);
  }

  async signOut(res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return { message: 'Successfully logged out' };
  }

  isTokenBlacklisted(token: string): boolean {
    return this.tokenBlacklist.has(token);
  }
}
