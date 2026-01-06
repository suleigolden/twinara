export const AccountTypes = [
'individual', 
'organization', 
'organization-user', 
'udemy-user', 
'dementia-user',
'caregiver-user'] as const;
type AccountTypesTuple = typeof AccountTypes;
export type AccountTypes = AccountTypesTuple[number];
