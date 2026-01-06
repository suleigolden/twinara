import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ChatMessageContentDto {
  @ApiProperty({ enum: ['user', 'assistant'], example: 'user' })
  @IsEnum(['user', 'assistant'])
  @IsNotEmpty()
  role: 'user' | 'assistant';

  @ApiProperty({ example: 'Hello, how are you today?' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: '2024-01-15T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  date_created: string;
}

export class CreateDementiaUserChatMessageDto {
  @ApiProperty({ type: ChatMessageContentDto })
  @ValidateNested()
  @Type(() => ChatMessageContentDto)
  @IsNotEmpty()
  content: ChatMessageContentDto;
}

