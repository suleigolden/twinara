import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemoryAiChatDto {
  @ApiProperty({
    example: '612f1304-3aef-410c-9834-368030ac03d9',
    description: 'The user ID to send the message to',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({
    example: 'What activities do I have today?',
    description: 'The user message to send to the Memory AI Agent',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}


