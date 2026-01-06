import { AccountTypes, Roles } from "./account-types";
import { InvitedStatus } from "./invited-status.type";
import { Organization } from "./organization-type";

export type User = {
  id?: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  accountType?: AccountTypes;
  country?: string;
  credit?: number;
  isActive?: boolean;
  role?: Roles;
  organization?: Organization;
  organizationId?: string;
  isInvited?: boolean;
  invitedStatus?: InvitedStatus;
  invitedAt?: Date;
  invitedBy?: string; // uuid of user table
  canAccessMemoryIqTraining?: boolean;
  memoryIqTrainingAccessEndDate?: Date;
  createdAt?: string;
  updatedAt?: string;
};

export type UdemyUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isCodeIdSent: boolean;
  cardId: string | null;
  createdAt: string;
  updatedAt: string;
}