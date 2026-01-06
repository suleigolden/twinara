import { PartialType } from '@nestjs/swagger';
import { CreateTwinaraActivityGameDto } from './create-twinara-activity-game.dto';

export class UpdateTwinaraActivityGameDto extends PartialType(CreateTwinaraActivityGameDto) {}

