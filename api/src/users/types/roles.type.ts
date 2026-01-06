export const Roles = ['character', 'system-admin'] as const;
type RolesTuple = typeof Roles;
export type Roles = RolesTuple[number];
