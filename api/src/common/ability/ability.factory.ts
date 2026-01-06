import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action, Subjects, AppAbility } from './ability.types';
import { User } from '../../users/entities/user.entity';
import { CardId } from '../../card-ids/entities/card-id.entity';

@Injectable()
export class AbilityFactory {
  defineAbility(user?: User): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );

    if (!user) {
      return build();
    }

    if (user.role === 'system-admin') {
      can(Action.Manage, 'all');
    }

    // character actions
    else if (user.role === 'character') {
      can(Action.Create, User);
      can(Action.Read, User, { id: user.id });
      can(Action.Update, User, { id: user.id });
      cannot(Action.Delete, User, { id: user.id });
      
      // CardId permissions for character role
      can(Action.Create, CardId);
      can(Action.Read, CardId);
      can(Action.Update, CardId);
      can(Action.Delete, CardId);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
