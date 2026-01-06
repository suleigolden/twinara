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
import { TwinaraActivityGameService } from './twinara-activity-game.service';
import { CreateTwinaraActivityGameDto } from './dto/create-twinara-activity-game.dto';
import { UpdateTwinaraActivityGameDto } from './dto/update-twinara-activity-game.dto';
import { GenerateQuestionsDto, GenerateQuestionsResponseDto } from './dto/generate-questions.dto';

@ApiTags('twinara-activity-games')
@Controller('twinara-activity-games')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TwinaraActivityGameController {
  constructor(
    private readonly twinaraActivityGameService: TwinaraActivityGameService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new twinara activity game' })
  @ApiResponse({
    status: 201,
    description: 'Twinara activity game successfully created',
  })
  create(
    @Request() req,
    @Body() createTwinaraActivityGameDto: CreateTwinaraActivityGameDto,
  ) {
    // Use the authenticated user's ID if userId is not provided or validate it matches
    const dtoWithUserId = {
      ...createTwinaraActivityGameDto,
      userId: createTwinaraActivityGameDto.userId || req.user.id,
    };
    return this.twinaraActivityGameService.create(dtoWithUserId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all twinara activity games' })
  findAll() {
    return this.twinaraActivityGameService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get twinara activity games by user ID' })
  findByUserId(@Param('userId') userId: string) {
    return this.twinaraActivityGameService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get twinara activity game by ID' })
  findOne(@Param('id') id: string) {
    return this.twinaraActivityGameService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update twinara activity game' })
  update(
    @Param('id') id: string,
    @Body() updateTwinaraActivityGameDto: UpdateTwinaraActivityGameDto,
  ) {
    return this.twinaraActivityGameService.update(
      id,
      updateTwinaraActivityGameDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete twinara activity game' })
  remove(@Param('id') id: string) {
    return this.twinaraActivityGameService.remove(id);
  }

  @Post('generate-questions')
  @ApiOperation({ summary: 'Generate questions and answers for an activity game type' })
  @ApiResponse({
    status: 200,
    description: 'Questions and answers successfully generated',
    type: GenerateQuestionsResponseDto,
  })
  generateQuestions(@Body() generateQuestionsDto: GenerateQuestionsDto) {
    return this.twinaraActivityGameService.generateQuestions(generateQuestionsDto);
  }
}

