import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DementiaUserActivity } from './entities/dementia-user-activity.entity';
import { CreateDementiaUserActivityDto } from './dto/create-dementia-user-activity.dto';
import { UpdateDementiaUserActivityDto } from './dto/update-dementia-user-activity.dto';

@Injectable()
export class DementiaUserActivitiesService {
  constructor(
    @InjectRepository(DementiaUserActivity)
    private dementiaUserActivitiesRepository: Repository<DementiaUserActivity>,
  ) {}

  async create(
    userId: string,
    createDementiaUserActivityDto: CreateDementiaUserActivityDto,
  ): Promise<DementiaUserActivity> {
    // Check if an activity with the same userId and title already exists
    const existingActivity = await this.dementiaUserActivitiesRepository.findOne({
      where: {
        userId,
        title: createDementiaUserActivityDto.title,
      },
    });

    // if the activity already exists, return the existing activity
    if (existingActivity) {
      return existingActivity;
    }

    const activity = this.dementiaUserActivitiesRepository.create({
      ...createDementiaUserActivityDto,
      userId,
      createdBy: createDementiaUserActivityDto.createdBy || userId,
    });
    return await this.dementiaUserActivitiesRepository.save(activity);
  }

  async findAll(): Promise<DementiaUserActivity[]> {
    return await this.dementiaUserActivitiesRepository.find({
      relations: ['user', 'createdByUser'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByUserId(userId: string): Promise<DementiaUserActivity[]> {
    return await this.dementiaUserActivitiesRepository.find({
      where: { userId },
      relations: ['user', 'createdByUser'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findActiveByUserId(userId: string): Promise<DementiaUserActivity[]> {
    return await this.dementiaUserActivitiesRepository.find({
      where: { userId, isActive: true },
      relations: ['user', 'createdByUser'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<DementiaUserActivity> {
    const activity = await this.dementiaUserActivitiesRepository.findOne({
      where: { id },
      relations: ['user', 'createdByUser'],
    });
    if (!activity) {
      throw new NotFoundException(`Dementia user activity with ID ${id} not found`);
    }
    return activity;
  }

  async update(
    id: string,
    updateDementiaUserActivityDto: UpdateDementiaUserActivityDto,
  ): Promise<DementiaUserActivity> {
    const activity = await this.findOne(id);
    Object.assign(activity, updateDementiaUserActivityDto);
    return await this.dementiaUserActivitiesRepository.save(activity);
  }

  async remove(id: string): Promise<void> {
    const result = await this.dementiaUserActivitiesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Dementia user activity with ID ${id} not found`);
    }
  }
}

