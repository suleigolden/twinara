import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DementiaUserActivitiesService } from './dementia-user-activities.service';
import { DementiaUserActivitiesController } from './dementia-user-activities.controller';
import { DementiaUserActivity } from './entities/dementia-user-activity.entity';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DementiaUserActivity, User]),
    forwardRef(() => AuthModule),
  ],
  controllers: [DementiaUserActivitiesController],
  providers: [DementiaUserActivitiesService],
  exports: [DementiaUserActivitiesService],
})
export class DementiaUserActivitiesModule {}

