import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DementiaUserChatMessagesService } from './dementia-user-chat-messages.service';
import { DementiaUserChatMessagesController } from './dementia-user-chat-messages.controller';
import { DementiaUserChatMessage } from './entities/dementia-user-chat-message.entity';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DementiaUserChatMessage, User]),
    forwardRef(() => AuthModule),
  ],
  controllers: [DementiaUserChatMessagesController],
  providers: [DementiaUserChatMessagesService],
  exports: [DementiaUserChatMessagesService],
})
export class DementiaUserChatMessagesModule {}

