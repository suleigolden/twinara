import {
  IsArray,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Roles } from '../../users/types/roles.type';
import { AccountTypes } from '../../users/types/account.type';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  organization_name?: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsArray()
  @IsIn(Roles, { each: true })
  role?: Roles;

  @IsOptional()
  @IsIn(AccountTypes, { each: true })
  accountType?: AccountTypes;
}
