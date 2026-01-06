import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MemoryAiAgentService } from './memory-ai-agent.service';
import { MemoryAiAgentController } from './memory-ai-agent.controller';
import { DementiaProfilesModule } from '../dementia-profiles/dementia-profiles.module';
import { DementiaUserActivitiesModule } from '../dementia-user-activities/dementia-user-activities.module';
import { DementiaUserChatMessagesModule } from '../dementia-user-chat-messages/dementia-user-chat-messages.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => DementiaProfilesModule),
    forwardRef(() => DementiaUserActivitiesModule),
    forwardRef(() => DementiaUserChatMessagesModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [MemoryAiAgentController],
  providers: [MemoryAiAgentService],
  exports: [MemoryAiAgentService],
})
export class MemoryAiAgentModule {}

