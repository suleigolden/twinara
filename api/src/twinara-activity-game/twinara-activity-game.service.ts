import { 
  Injectable, 
  NotFoundException, 
  HttpException, 
  HttpStatus, 
  InternalServerErrorException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as https from 'https';
import { TwinaraActivityGame, ActivityQuestionType } from './entities/twinara-activity-game.entity';
import { CreateTwinaraActivityGameDto } from './dto/create-twinara-activity-game.dto';
import { UpdateTwinaraActivityGameDto } from './dto/update-twinara-activity-game.dto';
import { 
  GenerateQuestionsDto, 
  GeneratedQuestion, 
  QuestionAnswerType,
} from './dto/generate-questions.dto';
import { userInformation } from './dummy-data/dummy-data';

@Injectable()
export class TwinaraActivityGameService {
  private readonly openaiApiKey: string = process.env.OPENAI_API_KEY || '';

  constructor(
    @InjectRepository(TwinaraActivityGame)
    private twinaraActivityGameRepository: Repository<TwinaraActivityGame>,
  ) {}

  async create(
    createTwinaraActivityGameDto: CreateTwinaraActivityGameDto,
  ): Promise<TwinaraActivityGame> {
    const game = this.twinaraActivityGameRepository.create(
      createTwinaraActivityGameDto,
    );
    return await this.twinaraActivityGameRepository.save(game);
  }

  async findAll(): Promise<TwinaraActivityGame[]> {
    return await this.twinaraActivityGameRepository.find({
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByUserId(userId: string): Promise<TwinaraActivityGame[]> {
    return await this.twinaraActivityGameRepository.find({
      where: { userId },
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<TwinaraActivityGame> {
    const game = await this.twinaraActivityGameRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!game) {
      throw new NotFoundException(`Twinara activity game with ID ${id} not found`);
    }
    return game;
  }

  async update(
    id: string,
    updateTwinaraActivityGameDto: UpdateTwinaraActivityGameDto,
  ): Promise<TwinaraActivityGame> {
    const game = await this.findOne(id);
    Object.assign(game, updateTwinaraActivityGameDto);
    return await this.twinaraActivityGameRepository.save(game);
  }

  async remove(id: string): Promise<void> {
    const result = await this.twinaraActivityGameRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Twinara activity game with ID ${id} not found`);
    }
  }

  async generateQuestions(
    generateQuestionsDto: GenerateQuestionsDto,
  ): Promise<{ questions: GeneratedQuestion[] }> {
    try {
      const { questionType, numberOfQuestions = 10 } = generateQuestionsDto;
      
      // For now, use dummy data. In production, fetch from database based on userId
      const userData = userInformation;
      
      const questions = await this.generateQuestionsWithOpenAI(
        questionType,
        numberOfQuestions,
        userData,
      );
      
      return { questions };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Generate Questions Error:', error);
      throw new InternalServerErrorException(
        'Failed to generate questions. Please try again.',
      );
    }
  }

  private async generateQuestionsWithOpenAI(
    questionType: ActivityQuestionType,
    numberOfQuestions: number,
    userData: any,
  ): Promise<GeneratedQuestion[]> {
    const systemPrompt = this.buildQuestionGenerationPrompt(questionType, userData);
    const userPrompt = `Generate exactly ${numberOfQuestions} questions based on the user's information.`;

    const requestBody = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 3000,
      response_format: { type: 'json_object' },
    };

    const response = await this.makeRequest<any>(
      requestBody,
      '/chat/completions',
    );

    const content = response.choices[0]?.message?.content?.trim();
    if (!content) {
      throw new InternalServerErrorException('No response from OpenAI');
    }

    const parsedResponse = JSON.parse(content);
    return this.parseQuestionsFromResponse(parsedResponse);
  }

  private buildQuestionGenerationPrompt(
    questionType: ActivityQuestionType,
    userData: any,
  ): string {
    const questionTypeDescriptions = {
      IDENTITY_SELF_RECALL: 'questions about the user\'s personal identity, name, basic information, and self-awareness',
      PEOPLE_RELATIONSHIPS: 'questions about family members, relationships, and people important to the user',
      ROUTINE_DAILY_AWARENESS: 'questions about daily routines, activities, and time awareness',
      RECOGNITION_TASKS: 'multiple-choice recognition questions about familiar information',
      STORY_AND_MEMORY: 'questions about work history, hobbies, personal stories, and long-term memories',
      WELLNESS_PROMPTS: 'gentle wellness and self-care prompts in yes/no format',
    };

    let prompt = `You are a compassionate AI assistant helping to generate cognitive questions for individuals with dementia.

Your task is to generate questions based on the user's personal information. The questions should be:
- Gentle and supportive (never judgmental)
- Based on the user's actual information
- Appropriate for the question type: ${questionTypeDescriptions[questionType]}
- Mix of multiple-choice and yes/no questions where appropriate

## User Information:
- Name: ${userData.firstName} ${userData.lastName}
- Gender: ${userData.gender || 'Not specified'}
- Email: ${userData.email || 'Not specified'}
- Phone: ${userData.phoneNumber || 'Not specified'}
`;

    if (userData.address) {
      prompt += `- City: ${userData.address.city || ''}
- Address: ${userData.address.street || ''}, ${userData.address.city || ''}, ${userData.address.state || ''}
`;
    }

    if (userData.workHistory && userData.workHistory.length > 0) {
      prompt += `\n## Work History:\n`;
      userData.workHistory.forEach((work: any) => {
        prompt += `- ${work.role || work}${work.employer ? ` at ${work.employer}` : ''}${work.yearsActive ? ` (${work.yearsActive})` : ''}\n`;
      });
    }

    if (userData.hobbies && userData.hobbies.length > 0) {
      prompt += `\n## Hobbies:\n${userData.hobbies.map((hobby: any) => `- ${typeof hobby === 'string' ? hobby : hobby.name || hobby}`).join('\n')}\n`;
    }

    if (userData.activities && userData.activities.length > 0) {
      prompt += `\n## Daily Activities:\n`;
      userData.activities.slice(0, 5).forEach((activity: any) => {
        prompt += `- ${activity.title || activity}${activity.location ? ` (${activity.location})` : ''}${activity.timeOfDay ? ` - ${activity.timeOfDay}` : ''}\n`;
      });
    }

    prompt += `\n## Response Format:
Return a JSON object with this exact structure:
{
  "questions": [
    {
      "question": "Question text here",
      "correctAnswer": "Correct answer here",
      "answerType": "multiple-choice" or "yes-no",
      "options": [{"label": "Option 1", "value": "Option 1"}, ...] // Only for multiple-choice questions
    }
  ]
}

For multiple-choice questions, provide exactly 4 options (1 correct + 3 plausible but incorrect answers).
For yes-no questions, the correctAnswer should be "Yes" or "No", and no options array is needed.

Focus on ${questionTypeDescriptions[questionType]}.`;

    return prompt;
  }

  private parseQuestionsFromResponse(parsedResponse: any): GeneratedQuestion[] {
    if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
      throw new InternalServerErrorException('Invalid response format from OpenAI');
    }

    return parsedResponse.questions.map((q: any) => {
      const question: GeneratedQuestion = {
        question: q.question,
        correctAnswer: q.correctAnswer,
        answerType: q.answerType === 'yes-no' ? 'yes-no' : 'multiple-choice',
      };

      if (question.answerType === 'multiple-choice' && q.options) {
        question.options = q.options;
      }

      return question;
    });
  }

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

}

