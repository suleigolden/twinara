import { ReCaptcha } from '../../re-captcha/entities/re-captcha.entity';
import { GameScore } from '../../game-score/entities/game-score.entity';
import { Game } from '../../game/entities/game.entity';
import { CourseProgress } from '../../course-progress/entities/course-progress.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { AccountTypes } from '../types/account.type';
import { Roles } from '../types/roles.type';
import { InvitedStatus } from '../types/invited-status.type';
import { Organization } from '../../organization/entities/organization.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  //Thus is for employee tracking in organization
  @Column({ nullable: true })
  organizationId?: string;

  @Column({ default: false })
  isInvited: boolean;

  @Column({ 
    type: 'enum', 
    enum: InvitedStatus, 
    nullable: true,
    default: InvitedStatus.PENDING 
  })
  invitedStatus?: InvitedStatus;

  @Column({ nullable: true, default: new Date() })
  invitedAt?: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'invitedBy' })
  invitedByUser?: User;


  @Column()
  password: string;

  @Column()
  accountType: AccountTypes;

  @Column()
  credit: number;

  @Column()
  isActive: boolean;

  @Column({ nullable: true })
  resetPasswordToken?: string;

  @Column({ nullable: true })
  resetPasswordTokenExpiresAt?: Date;

  @Column({ nullable: true })
  paymentSessionId?: string;

  @Column({ default: 'character' })
  role: Roles;

  @Column({ type: 'jsonb', nullable: true, default: {} })
  address: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
  };
  
  @Column({ nullable: true })
  stripeCustomerId?: string;

  @Column({ nullable: true })
  canAccessMemoryIqTraining?: boolean;

  @Column({ nullable: true })
  memoryIqTrainingAccessEndDate?: Date;

  @Column({ nullable: true })
  memoryIqTrainingAccessEndDateExpired?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Game, (game) => game.user)
  games: Game[];

  @OneToMany(() => GameScore, (score) => score.user)
  scores: GameScore[];

  // This is for organization scores
  @OneToMany(() => GameScore, (score) => score.organizationUserId)
  organizationScores: GameScore[];

  @OneToMany(() => ReCaptcha, (reCaptcha) => reCaptcha.user)
  reCaptchas: ReCaptcha[];

  @OneToMany(() => CourseProgress, (courseProgress) => courseProgress.user)
  courseProgresses: CourseProgress[];

  @OneToOne(() => Organization, (org) => org.user)
  organization: Organization;
}
