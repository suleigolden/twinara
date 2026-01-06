import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { DementiaUserChatMessagesService } from './dementia-user-chat-messages.service';
import { CreateDementiaUserChatMessageDto } from './dto/create-dementia-user-chat-message.dto';
import { UpdateDementiaUserChatMessageDto } from './dto/update-dementia-user-chat-message.dto';

@ApiTags('dementia-user-chat-messages')
@Controller('dementia-user-chat-messages')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DementiaUserChatMessagesController {
  constructor(
    private readonly dementiaUserChatMessagesService: DementiaUserChatMessagesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new dementia user chat message' })
  @ApiResponse({
    status: 201,
    description: 'Dementia user chat message successfully created',
  })
  create(
    @Request() req,
    @Body() createDementiaUserChatMessageDto: CreateDementiaUserChatMessageDto,
  ) {
    return this.dementiaUserChatMessagesService.create(
      req.user.id,
      createDementiaUserChatMessageDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all dementia user chat messages' })
  findAll() {
    return this.dementiaUserChatMessagesService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get dementia user chat messages by user ID' })
  findByUserId(@Param('userId') userId: string) {
    return this.dementiaUserChatMessagesService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get dementia user chat message by ID' })
  findOne(@Param('id') id: string) {
    return this.dementiaUserChatMessagesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update dementia user chat message' })
  update(
    @Param('id') id: string,
    @Body() updateDementiaUserChatMessageDto: UpdateDementiaUserChatMessageDto,
  ) {
    return this.dementiaUserChatMessagesService.update(
      id,
      updateDementiaUserChatMessageDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete dementia user chat message' })
  remove(@Param('id') id: string) {
    return this.dementiaUserChatMessagesService.remove(id);
  }
}

