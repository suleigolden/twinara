import { PartialType } from '@nestjs/swagger';
import { CreateDementiaProfileDto } from './create-dementia-profile.dto';

export class UpdateDementiaProfileDto extends PartialType(CreateDementiaProfileDto) {}

