import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccountTypes } from '../types/account.type';
import { Roles } from '../types/roles.type';
import { InvitedStatus } from '../types/invited-status.type';
import { Address } from '../types/address.type';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'John', required: false })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({ example: 'Acme Corporation', required: false })
  @IsString()
  @IsOptional()
  organizationName: string;

  @ApiProperty({ example: '1234567890', required: false })
  @IsString()
  @IsOptional()
  organizationId?: string;

  @ApiProperty({ example: 'password123', minimum: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'individual', enum: ['individual', 'organization'] })
  @IsString()
  @IsNotEmpty()
  accountType: AccountTypes;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ example: 0 })
  @IsNumber()
  @IsNotEmpty()
  credit: number;

  @IsOptional()
  @IsString()
  currentPassword?: string;

  @IsOptional()
  @IsString()
  newPassword?: string;

  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
  @IsString()
  resetPasswordToken?: string;

  @IsOptional()
  @IsDate()
  resetPasswordTokenExpiresAt?: Date;

  @IsOptional()
  @IsString()
  role?: Roles;

  @ApiProperty({ 
    example: 'pending', 
    enum: InvitedStatus, 
    required: false,
    description: 'Status of user invitation (pending, active)'
  })
  @IsOptional()
  @IsEnum(InvitedStatus)
  invitedStatus?: InvitedStatus;

  @ApiProperty({ 
    example: '2024-01-15T10:30:00Z', 
    required: false,
    description: 'Date when user was invited'
  })
  @IsOptional()
  @IsDate()
  invitedAt?: Date;

  @ApiProperty({ 
    example: '123e4567-e89b-12d3-a456-426614174000', 
    required: false,
    description: 'UUID of the user who sent the invitation'
  })
  @IsOptional()
  @IsString()
  invitedBy?: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  stripeCustomerId?: string;
}
