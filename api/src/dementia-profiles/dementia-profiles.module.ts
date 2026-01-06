import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DementiaProfilesService } from './dementia-profiles.service';
import { DementiaProfilesController } from './dementia-profiles.controller';
import { DementiaProfile } from './entities/dementia-profile.entity';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DementiaProfile, User]),
    forwardRef(() => AuthModule),
  ],
  controllers: [DementiaProfilesController],
  providers: [DementiaProfilesService],
  exports: [DementiaProfilesService],
})
export class DementiaProfilesModule {}

