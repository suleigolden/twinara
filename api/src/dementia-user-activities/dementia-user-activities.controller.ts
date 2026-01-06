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
import { DementiaUserActivitiesService } from './dementia-user-activities.service';
import { CreateDementiaUserActivityDto } from './dto/create-dementia-user-activity.dto';
import { UpdateDementiaUserActivityDto } from './dto/update-dementia-user-activity.dto';

@ApiTags('dementia-user-activities')
@Controller('dementia-user-activities')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DementiaUserActivitiesController {
  constructor(
    private readonly dementiaUserActivitiesService: DementiaUserActivitiesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new dementia user activity' })
  @ApiResponse({
    status: 201,
    description: 'Dementia user activity successfully created',
  })
  create(
    @Request() req,
    @Body() createDementiaUserActivityDto: CreateDementiaUserActivityDto,
  ) {
    return this.dementiaUserActivitiesService.create(
      req.user.id,
      createDementiaUserActivityDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all dementia user activities' })
  findAll() {
    return this.dementiaUserActivitiesService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get dementia user activities by user ID' })
  findByUserId(@Param('userId') userId: string) {
    return this.dementiaUserActivitiesService.findByUserId(userId);
  }

  @Get('user/:userId/active')
  @ApiOperation({
    summary: 'Get active dementia user activities by user ID',
  })
  findActiveByUserId(@Param('userId') userId: string) {
    return this.dementiaUserActivitiesService.findActiveByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get dementia user activity by ID' })
  findOne(@Param('id') id: string) {
    return this.dementiaUserActivitiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update dementia user activity' })
  update(
    @Param('id') id: string,
    @Body() updateDementiaUserActivityDto: UpdateDementiaUserActivityDto,
  ) {
    return this.dementiaUserActivitiesService.update(
      id,
      updateDementiaUserActivityDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete dementia user activity' })
  remove(@Param('id') id: string) {
    return this.dementiaUserActivitiesService.remove(id);
  }
}

