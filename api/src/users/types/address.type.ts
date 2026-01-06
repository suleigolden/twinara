import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class Address {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  street?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  city?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  state?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  country?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  postal_code?: string;
}
