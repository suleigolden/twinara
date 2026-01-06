import { IsEnum, IsOptional, IsInt, Min, Max, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ActivityQuestionType } from '../entities/twinara-activity-game.entity';

export class GenerateQuestionsDto {
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Type of activity questions to generate',
    enum: [
      'IDENTITY_SELF_RECALL',
      'PEOPLE_RELATIONSHIPS',
      'ROUTINE_DAILY_AWARENESS',
      'RECOGNITION_TASKS',
      'STORY_AND_MEMORY',
      'WELLNESS_PROMPTS',
    ],
    example: 'IDENTITY_SELF_RECALL',
  })
  @IsEnum([
    'IDENTITY_SELF_RECALL',
    'PEOPLE_RELATIONSHIPS',
    'ROUTINE_DAILY_AWARENESS',
    'RECOGNITION_TASKS',
    'STORY_AND_MEMORY',
    'WELLNESS_PROMPTS',
  ])
  questionType: ActivityQuestionType;

  @ApiPropertyOptional({
    description: 'Number of questions to generate',
    default: 10,
    minimum: 1,
    maximum: 50,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  numberOfQuestions?: number = 10;
}

export type QuestionAnswerType = 'multiple-choice' | 'yes-no';

export interface QuestionOption {
  label: string;
  value: string;
}

export interface GeneratedQuestion {
  question: string;
  correctAnswer: string;
  answerType: QuestionAnswerType;
  options?: QuestionOption[];
}

export class GenerateQuestionsResponseDto {
  @ApiProperty({
    description: 'Generated questions',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        question: { type: 'string' },
        correctAnswer: { type: 'string' },
        answerType: { type: 'string', enum: ['multiple-choice', 'yes-no'] },
        options: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: { type: 'string' },
              value: { type: 'string' },
            },
          },
        },
      },
    },
  })
  questions: GeneratedQuestion[];
}

