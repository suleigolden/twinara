import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MemoryAiAgentService } from './memory-ai-agent.service';
import { CreateMemoryAiChatDto } from './dto/create-memory-ai-chat.dto';

@ApiTags('memory-ai-agent')
@Controller('memory-ai-agent')
// @UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MemoryAiAgentController {
  constructor(private readonly memoryAiAgentService: MemoryAiAgentService) {}

  @Post('chat')
  @ApiOperation({
    summary: 'Chat with the Memory AI Agent',
    description:
      'Send a message to the Memory AI Agent and get a response. The agent has access to the user\'s profile, activities, and conversation history.',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully received response from Memory AI Agent',
  })
  async chat(
    @Request() req,
    @Body() createMemoryAiChatDto: CreateMemoryAiChatDto,
  ) {
    return this.memoryAiAgentService.chat(req?.user?.id, createMemoryAiChatDto);
  }
}

