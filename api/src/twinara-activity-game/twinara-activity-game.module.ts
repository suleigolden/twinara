import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwinaraActivityGameService } from './twinara-activity-game.service';
import { TwinaraActivityGameController } from './twinara-activity-game.controller';
import { TwinaraActivityGame } from './entities/twinara-activity-game.entity';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TwinaraActivityGame, User]),
    forwardRef(() => AuthModule),
  ],
  controllers: [TwinaraActivityGameController],
  providers: [TwinaraActivityGameService],
  exports: [TwinaraActivityGameService],
})
export class TwinaraActivityGameModule {}

