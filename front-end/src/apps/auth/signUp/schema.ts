import { InferType, object, string } from "yup";

// Define AccountTypes locally since we're no longer using the external API client
const AccountTypes = ['individual', 'organization', 'organization-user', 'udemy-user', 'dementia-user', 'caregiver-user'] as const;

export const SignUpSchema = object({
  first_name: string().required().label("First Name"),
  last_name: string().required().label("Last Name"),
  email: string().required().email("Must be a valid email").label("Email"),
  password: string().required().min(8, "Password must be at least 8 characters").label("Password"),
  country: string().required().label("Country"),
  accountType: string().oneOf(AccountTypes as readonly string[]).required().label("Account Type"),
  acceptTerms: string().oneOf(["true"], "You must accept the terms and conditions").label("Accept Terms"),
});

export type SignUpSchema = InferType<typeof SignUpSchema>;
