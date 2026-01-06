import { PartialType } from '@nestjs/swagger';
import { CreateDementiaUserChatMessageDto } from './create-dementia-user-chat-message.dto';

export class UpdateDementiaUserChatMessageDto extends PartialType(
  CreateDementiaUserChatMessageDto,
) {}

