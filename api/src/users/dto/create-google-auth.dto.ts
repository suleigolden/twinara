import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Roles } from '../types/roles.type';
import { Address } from '../types/address.type';
export class CreateGoogleAuthDto {
  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  paymentSessionId: string;

  @IsString()
  @IsOptional()
  role: Roles;

  @IsNotEmpty()
  @IsOptional()
  address: Address;

  @IsString()
  @IsOptional()
  stripeCustomerId?: string;

  @IsBoolean()
  @IsOptional()
  canAccessMemoryIqTraining?: boolean;

  @IsDate()
  @IsOptional()
  memoryIqTrainingAccessEndDate?: Date;
}
