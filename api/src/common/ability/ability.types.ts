import { InferSubjects, Ability } from '@casl/ability';
import { User } from '../../users/entities/user.entity';
import { CardId } from '../../card-ids/entities/card-id.entity';

export enum Action {
  Manage = 'manage', // allows all actions
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | InferSubjects<typeof CardId> | 'all';

// Export the AppAbility type
export type AppAbility = Ability<[Action, Subjects]>;
