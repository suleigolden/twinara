import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from './ability.factory';
import { Action, Subjects } from './ability.types';
import { ForbiddenError } from '@casl/ability';
import { JwtService } from '@nestjs/jwt';
import { CHECK_ABILITY } from './abilities.decorator';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new ForbiddenException(`Authorization header is missing...`);
    }

    const token = authHeader.split(' ')[1];
    let user;
    try {
      user = this.jwtService.verify(token);
    } catch (err) {
      throw new ForbiddenException(`Invalid token`);
    }
    request.user = user;

    const ability = this.abilityFactory.defineAbility(user);

    // Check for specific abilities if defined
    const requiredAbilities = this.reflector.get<[Action, Subjects][]>(
      CHECK_ABILITY,
      context.getHandler(),
    );

    // If no abilities are required, deny access by default
    if (!requiredAbilities) {
      throw new ForbiddenException('No abilities defined for this resource');
    }

    try {
      for (const [action, subject] of requiredAbilities) {
        ForbiddenError.from(ability).throwUnlessCan(action, subject);
      }
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(
          `You do not have permission to ${error.action} on ${error.subjectType}.`,
        );
      }
      throw error;
    }

    return true;
  }
}
