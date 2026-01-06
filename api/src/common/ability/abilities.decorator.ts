import { SetMetadata } from '@nestjs/common';
import { Action, Subjects } from './ability.types';

export const CHECK_ABILITY = 'abilities';
export const CheckAbilities = (...requirements: [Action, Subjects][]) =>
  SetMetadata(CHECK_ABILITY, requirements);
