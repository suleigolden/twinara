import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ActivityQuestionTypes, ActivityQuestionType } from '../entities/twinara-activity-game.entity';

export class CreateTwinaraActivityGameDto {
  @ApiProperty({ example: 'uuid-of-user' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: 'IDENTITY_SELF_RECALL',
    enum: ActivityQuestionTypes,
    description: 'Type of activity question',
  })
  @IsEnum(ActivityQuestionTypes)
  @IsNotEmpty()
  questionType: ActivityQuestionType;

  @ApiProperty({ example: 10, description: 'Number of questions in the game', minimum: 1 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  numberOfQuestions: number;

  @ApiProperty({ example: 100, description: 'Points earned in the game', minimum: 0 })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  points: number;
}

