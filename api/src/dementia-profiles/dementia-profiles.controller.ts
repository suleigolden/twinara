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
import { DementiaProfilesService } from './dementia-profiles.service';
import { CreateDementiaProfileDto } from './dto/create-dementia-profile.dto';
import { UpdateDementiaProfileDto } from './dto/update-dementia-profile.dto';

@ApiTags('dementia-profiles')
@Controller('dementia-profiles')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DementiaProfilesController {
  constructor(private readonly dementiaProfilesService: DementiaProfilesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new dementia profile' })
  @ApiResponse({ status: 201, description: 'Dementia profile successfully created' })
  create(@Request() req, @Body() createDementiaProfileDto: CreateDementiaProfileDto) {
    return this.dementiaProfilesService.create(req.user.id, createDementiaProfileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all dementia profiles' })
  findAll() {
    return this.dementiaProfilesService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get dementia profile by user ID' })
  findByUserId(@Param('userId') userId: string) {
    return this.dementiaProfilesService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get dementia profile by ID' })
  findOne(@Param('id') id: string) {
    return this.dementiaProfilesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update dementia profile' })
  update(
    @Param('id') id: string,
    @Body() updateDementiaProfileDto: UpdateDementiaProfileDto,
  ) {
    return this.dementiaProfilesService.update(id, updateDementiaProfileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete dementia profile' })
  remove(@Param('id') id: string) {
    return this.dementiaProfilesService.remove(id);
  }
}

