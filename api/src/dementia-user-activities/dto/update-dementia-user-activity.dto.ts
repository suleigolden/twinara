import { PartialType } from '@nestjs/swagger';
import { CreateDementiaUserActivityDto } from './create-dementia-user-activity.dto';

export class UpdateDementiaUserActivityDto extends PartialType(CreateDementiaUserActivityDto) {}

