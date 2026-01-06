import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DementiaUserChatMessage } from './entities/dementia-user-chat-message.entity';
import { CreateDementiaUserChatMessageDto } from './dto/create-dementia-user-chat-message.dto';
import { UpdateDementiaUserChatMessageDto } from './dto/update-dementia-user-chat-message.dto';
import { ChatMessageContent } from './types/chat-message-content.type';

@Injectable()
export class DementiaUserChatMessagesService {
  constructor(
    @InjectRepository(DementiaUserChatMessage)
    private dementiaUserChatMessagesRepository: Repository<DementiaUserChatMessage>,
  ) {}

  async create(
    userId: string,
    createDementiaUserChatMessageDto: CreateDementiaUserChatMessageDto,
  ): Promise<DementiaUserChatMessage> {
    // Convert date_created string to Date object
    const content: ChatMessageContent = {
      ...createDementiaUserChatMessageDto.content,
      date_created: new Date(createDementiaUserChatMessageDto.content.date_created),
    };

    const message = this.dementiaUserChatMessagesRepository.create({
      content,
      userId,
    });
    return await this.dementiaUserChatMessagesRepository.save(message);
  }

  async findAll(): Promise<DementiaUserChatMessage[]> {
    return await this.dementiaUserChatMessagesRepository.find({
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByUserId(userId: string): Promise<DementiaUserChatMessage[]> {
    return await this.dementiaUserChatMessagesRepository.find({
      where: { userId },
      relations: ['user'],
      order: {
        createdAt: 'ASC', // Order by creation time ascending for chat history
      },
    });
  }

  async findOne(id: string): Promise<DementiaUserChatMessage> {
    const message = await this.dementiaUserChatMessagesRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!message) {
      throw new NotFoundException(
        `Dementia user chat message with ID ${id} not found`,
      );
    }
    return message;
  }

  async update(
    id: string,
    updateDementiaUserChatMessageDto: UpdateDementiaUserChatMessageDto,
  ): Promise<DementiaUserChatMessage> {
    const message = await this.findOne(id);
    
    if (updateDementiaUserChatMessageDto.content) {
      // Convert date_created string to Date object if provided
      const content: ChatMessageContent = {
        ...message.content,
        ...updateDementiaUserChatMessageDto.content,
        date_created: updateDementiaUserChatMessageDto.content.date_created
          ? new Date(updateDementiaUserChatMessageDto.content.date_created)
          : message.content.date_created,
      };
      message.content = content;
    }
    
    return await this.dementiaUserChatMessagesRepository.save(message);
  }

  async remove(id: string): Promise<void> {
    const result = await this.dementiaUserChatMessagesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Dementia user chat message with ID ${id} not found`,
      );
    }
  }
}

