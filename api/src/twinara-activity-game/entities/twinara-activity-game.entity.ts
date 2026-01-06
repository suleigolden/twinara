import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export const ActivityQuestionTypes = [
  'IDENTITY_SELF_RECALL',
  'PEOPLE_RELATIONSHIPS',
  'ROUTINE_DAILY_AWARENESS',
  'RECOGNITION_TASKS',
  'STORY_AND_MEMORY',
  'WELLNESS_PROMPTS',
] as const;

type ActivityQuestionTypesTuple = typeof ActivityQuestionTypes;
export type ActivityQuestionType = ActivityQuestionTypesTuple[number];

@Entity('twinara_activity_games')
export class TwinaraActivityGame {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: ActivityQuestionTypes,
  })
  questionType: ActivityQuestionType;

  @Column({ type: 'integer' })
  numberOfQuestions: number;

  @Column({ type: 'integer' })
  points: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

