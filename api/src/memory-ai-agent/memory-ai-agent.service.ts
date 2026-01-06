import {
  Injectable,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import * as https from 'https';
import { DementiaProfilesService } from '../dementia-profiles/dementia-profiles.service';
import { DementiaUserActivitiesService } from '../dementia-user-activities/dementia-user-activities.service';
import { DementiaUserChatMessagesService } from '../dementia-user-chat-messages/dementia-user-chat-messages.service';
import { CreateMemoryAiChatDto } from './dto/create-memory-ai-chat.dto';
import { ChatResponse } from './types/chat-response.type';

@Injectable()
export class MemoryAiAgentService {
  private readonly openaiApiKey: string = process.env.OPENAI_API_KEY || '';

  constructor(
    private readonly dementiaProfilesService: DementiaProfilesService,
    private readonly dementiaUserActivitiesService: DementiaUserActivitiesService,
    private readonly dementiaUserChatMessagesService: DementiaUserChatMessagesService,
  ) {}

  private makeRequest<T>(data: any, path: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.openai.com',
        path: `/v1${path}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.openaiApiKey}`,
        },
      };

      const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(responseData));
          } else {
            reject(
              new HttpException(
                JSON.parse(responseData).error?.message || 'OpenAI API Error',
                res.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          }
        });
      });

      req.on('error', (error) => {
        reject(
          new HttpException(
            error.message || 'OpenAI API Request Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      });

      req.write(JSON.stringify(data));
      req.end();
    });
  }

  private buildSystemPrompt(
    profile: any,
    activities: any[],
    chatHistory: any[],
  ): string {
    let prompt = `You are a compassionate Memory AI Agent designed to help individuals with dementia manage their daily activities and answer their questions. Your role is to be patient, understanding, and supportive.

## User Profile Information:
`;

    if (profile) {
      prompt += `- Name: ${profile.firstName || ''} ${profile.lastName || ''}${profile.nickname ? ` (${profile.nickname})` : ''}\n`;
      if (profile.dob) {
        prompt += `- Date of Birth: ${profile.dob}\n`;
      }
      if (profile.gender) {
        prompt += `- Gender: ${profile.gender}\n`;
      }
      if (profile.email) {
        prompt += `- Email: ${profile.email}\n`;
      }
      if (profile.phoneNumber) {
        prompt += `- Phone Number: ${profile.phoneNumber}\n`;
      }
      if (profile.address) {
        const addr = profile.address;
        const addressParts = [];
        if (addr.street) addressParts.push('Street: ' + addr.street);
        if (addr.city) addressParts.push('City: ' + addr.city);
        if (addr.state) addressParts.push('State: ' + addr.state);
        if (addr.country) addressParts.push('Country: ' + addr.country);
        if (addr.postal_code) addressParts.push('Postal Code: ' + addr.postal_code);
        if (addressParts.length > 0) {
          prompt += `- Address: ${addressParts.join(', ')}\n`;
        }
      }
      if (profile.avatarUrl) {
        prompt += `- Profile Picture: ${profile.avatarUrl}\n`;
      }
      if (profile.bio) {
        prompt += `- Biography: ${profile.bio}\n`;
      }
      if (profile.workHistory && Array.isArray(profile.workHistory) && profile.workHistory.length > 0) {
        prompt += `- Work History: ${profile.workHistory.join(', ')}\n`;
      }
      if (profile.hobbies && profile.hobbies.length > 0) {
        prompt += `- Hobbies: ${profile.hobbies.join(', ')}\n`;
      }
      if (profile.importantDates && profile.importantDates.length > 0) {
        prompt += `- Important Dates:\n`;
        profile.importantDates.forEach((date: any) => {
          prompt += `  - ${date.label}: ${date.date}\n`;
        });
      }
      if (profile.notesFromCaregiver) {
        prompt += `- Notes from Caregiver: ${profile.notesFromCaregiver}\n`;
      }
    }

    prompt += `\n## Daily Activities:\n`;
    if (activities && activities.length > 0) {
      activities.forEach((activity) => {
        prompt += `- ${activity.title}`;
        if (activity.description) {
          prompt += `: ${activity.description}`;
        }
        if (activity.isRecurring && activity.dayOfWeek !== null) {
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          prompt += ` (Recurring on ${days[activity.dayOfWeek]}`;
          if (activity.timeOfDay) {
            prompt += ` at ${activity.timeOfDay}`;
          }
          prompt += `)`;
        } else if (activity.startDatetime) {
          prompt += ` (Scheduled for ${activity.startDatetime})`;
        }
        if (activity.location) {
          prompt += ` at ${activity.location}`;
        }
        prompt += `\n`;
      });
    } else {
      prompt += `No scheduled activities at this time.\n`;
    }

    if (chatHistory && chatHistory.length > 0) {
      prompt += `\n## Recent Conversation History:\n`;
      chatHistory.slice(-10).forEach((msg: any) => {
        const role = msg.content.role === 'user' ? 'User' : 'Assistant';
        prompt += `${role}: ${msg.content.content}\n`;
      });
    }

    prompt += `\n## Instructions:
- Answer questions clearly and simply, using short sentences.
- Help the user remember their scheduled activities.
- Be patient and repeat information if needed.
- Use the user's name and personal information to make conversations more personal.
- If asked about activities, reference the specific activities listed above.
- Be encouraging and supportive.
- If you don't know something, say so honestly and offer to help find the information.`;

    return prompt;
  }

  async chat(
    userId: string,
    createMemoryAiChatDto: CreateMemoryAiChatDto,
  ): Promise<ChatResponse> {
    try {
      if (!userId) {
        userId = createMemoryAiChatDto.userId;
      }
      if (!userId) {
        throw new BadRequestException('User ID is required');
      }

      // Get user context
      let profile = null;
      try {
        profile = await this.dementiaProfilesService.findByUserId(userId);
      } catch (error) {
        // Profile might not exist, continue without it
      }

      // Get user activities
      let activities = [];
      try {
        activities = await this.dementiaUserActivitiesService.findActiveByUserId(
          userId,
        );
      } catch (error) {
        // Activities might not exist, continue without them
      }

      // Get chat history
      let chatHistory = [];
      try {
        chatHistory = await this.dementiaUserChatMessagesService.findByUserId(
          userId,
        );
      } catch (error) {
        // Chat history might not exist, continue without it
      }
      // Build system prompt with context
      const systemPrompt = this.buildSystemPrompt(profile, activities, chatHistory);

      // Build messages array for OpenAI
      const messages: any[] = [
        { role: 'system', content: systemPrompt },
      ];

      // Add chat history
      chatHistory.forEach((msg: any) => {
        messages.push({
          role: msg.content.role,
          content: msg.content.content,
        });
      });

      // Add current user message
      messages.push({
        role: 'user',
        content: createMemoryAiChatDto.message,
      });

      // Store user message
      const userMessage = await this.dementiaUserChatMessagesService.create(
        userId,
        {
          content: {
            role: 'user',
            content: createMemoryAiChatDto.message,
            date_created: new Date().toISOString(),
          },
        },
      );

      // Call OpenAI API
      const requestBody = {
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      };

      const response = await this.makeRequest<any>(
        requestBody,
        '/chat/completions',
      );

      const assistantResponse =
        response.choices[0]?.message?.content?.trim() ||
        "I'm sorry, I couldn't process that request. Please try again.";

      // Store assistant response
      const assistantMessage = await this.dementiaUserChatMessagesService.create(
        userId,
        {
          content: {
            role: 'assistant',
            content: assistantResponse,
            date_created: new Date().toISOString(),
          },
        },
      );

      return {
        message: assistantResponse,
        messageId: assistantMessage.id,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Memory AI Agent Error:', error);
      throw new InternalServerErrorException(
        'Failed to process chat request. Please try again.',
      );
    }
  }
}

