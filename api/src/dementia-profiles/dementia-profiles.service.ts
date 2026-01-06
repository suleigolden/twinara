import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DementiaProfile } from './entities/dementia-profile.entity';
import { CreateDementiaProfileDto } from './dto/create-dementia-profile.dto';
import { UpdateDementiaProfileDto } from './dto/update-dementia-profile.dto';

@Injectable()
export class DementiaProfilesService {
  constructor(
    @InjectRepository(DementiaProfile)
    private dementiaProfilesRepository: Repository<DementiaProfile>,
  ) {}

  async create(
    userId: string,
    createDementiaProfileDto: CreateDementiaProfileDto,
  ): Promise<DementiaProfile> {
    const profile = this.dementiaProfilesRepository.create({
      ...createDementiaProfileDto,
      userId,
    });
    return await this.dementiaProfilesRepository.save(profile);
  }

  async findAll(): Promise<DementiaProfile[]> {
    return await this.dementiaProfilesRepository.find({
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByUserId(userId: string): Promise<DementiaProfile> {
    const profile = await this.dementiaProfilesRepository.findOne({
      where: { userId },
      relations: ['user'],
    });
    if (!profile) {
      throw new NotFoundException(`Dementia profile for user ID ${userId} not found`);
    }
    return profile;
  }

  async findOne(id: string): Promise<DementiaProfile> {
    const profile = await this.dementiaProfilesRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!profile) {
      throw new NotFoundException(`Dementia profile with ID ${id} not found`);
    }
    return profile;
  }

  async update(
    id: string,
    updateDementiaProfileDto: UpdateDementiaProfileDto,
  ): Promise<DementiaProfile> {
    const profile = await this.findOne(id);
    Object.assign(profile, updateDementiaProfileDto);
    return await this.dementiaProfilesRepository.save(profile);
  }

  async remove(id: string): Promise<void> {
    const result = await this.dementiaProfilesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Dementia profile with ID ${id} not found`);
    }
  }
}

