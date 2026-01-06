import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Gender } from '../types/gender.type';

export type ImportantDate = {
  label: string;
  date: string;
}

@Entity('dementia_profiles')
export class DementiaProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  userId: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nickname?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  firstName?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  lastName?: string;

  @Column({ type: 'date', nullable: true })
  dob?: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender?: Gender;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber?: string;

  @Column({ type: 'varchar', nullable: true })
  email?: string;

  @Column({ type: 'jsonb', nullable: true })
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };

  @Column({ type: 'jsonb', nullable: true, default: [] })
  workHistory?: string[];

  @Column({ type: 'jsonb', nullable: true, default: [] })
  hobbies?: string[];

  @Column({ type: 'jsonb', nullable: true, default: [] })
  importantDates?: ImportantDate[];

  @Column({ type: 'text', nullable: true })
  notesFromCaregiver?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'text', nullable: true })
  avatarUrl?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

