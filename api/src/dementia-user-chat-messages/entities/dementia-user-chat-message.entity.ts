import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ChatMessageContent } from '../types/chat-message-content.type';

@Entity('dementia_user_chat_messages')
export class DementiaUserChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'jsonb' })
  content: ChatMessageContent;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

