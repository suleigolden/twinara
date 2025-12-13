import { array, InferType, object, string, number, boolean, date } from "yup";

// Combined schema matching DementiaProfile and DementiaUserActivity entity structures
export const DementiaUserOnboardingSchema = object().shape({
  // Basic Information (DementiaProfile)
  nickname: string().max(100).optional(),
  firstName: string().max(150).optional(),
  lastName: string().max(150).optional(),
  dob: string().optional(), // Date string format: YYYY-MM-DD
  gender: string().oneOf(['male', 'female', 'other']).optional(),
  phoneNumber: string().optional(),
  email: string().email().optional(),
  
  // Address (DementiaProfile) - single line string as per entity
  addressLine: string().optional(),
  
  // Profile Information (DementiaProfile)
  workHistory: string().optional(),
  hobbies: array().of(string()).optional(),
  importantDates: array().of(
    object().shape({
      label: string().required(),
      date: string().required(), // Date string format: YYYY-MM-DD
    })
  ).optional(),
  notesFromCaregiver: string().optional(),
  bio: string().optional(),
  
  // User entity fields (for avatar)
  avatar_url: string().optional(),
  
  // Activities (DementiaUserActivity) - optional array for initial activities setup
  activities: array().of(
    object().shape({
      title: string().required(),
      description: string().optional(),
      dayOfWeek: number().min(0).max(6).optional(), // 0 = Sunday, 6 = Saturday
      timeOfDay: string().optional(), // Time format: HH:mm:ss
      startDatetime: date().optional(),
      location: string().optional(),
      isRecurring: boolean().optional().default(false),
      isActive: boolean().optional().default(true),
    })
  ).optional(),
});

export type DementiaUserOnboardingSchemaType = InferType<typeof DementiaUserOnboardingSchema>;


