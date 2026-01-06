import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
  ValidateNested,
  IsEmail,
  Length,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Gender } from '../types/gender.type';

export class ImportantDateDto {
  @ApiProperty({ example: 'Anniversary' })
  @IsString()
  label: string;

  @ApiProperty({ example: '1965-06-12' })
  @IsDateString()
  date: string;
}

export class CreateDementiaProfileDto {
  @ApiPropertyOptional({ example: 'Johnny', maxLength: 100 })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiPropertyOptional({ example: 'John', maxLength: 150 })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe', maxLength: 150 })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: '1950-01-15' })
  @IsOptional()
  @IsDateString()
  dob?: string;

  @ApiPropertyOptional({ enum: Gender, example: Gender.MALE })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'john.doe@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '123 Main St, City, State' })
  @IsObject()
  @IsOptional()
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };

  @ApiPropertyOptional({ example: ['Worked as a teacher for 30 years'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  workHistory?: string[];

  @ApiPropertyOptional({ example: ['reading', 'gardening', 'music'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hobbies?: string[];

  @ApiPropertyOptional({
    example: [{ label: 'Anniversary', date: '1965-06-12' }],
    type: [ImportantDateDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImportantDateDto)
  importantDates?: ImportantDateDto[];

  @ApiPropertyOptional({ example: 'Prefers morning activities' })
  @IsOptional()
  @IsString()
  @Length(1, 5000, { message: 'Notes from caregiver must be between 1 and 5,000 characters' })
  notesFromCaregiver?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'https://example.com/bio.txt' })
  @IsOptional()
  @IsString()
  @Length(1, 70000, { message: 'Bio must be between 1 and 70,000 characters' })
  bio?: string;
}

