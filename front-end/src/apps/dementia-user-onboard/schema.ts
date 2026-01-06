import { array, InferType, object, string, number, boolean, date } from "yup";

// Combined schema matching DementiaProfile and DementiaUserActivity entity structures
export const DementiaUserOnboardingSchema = object().shape({
  // Basic Information
  nickname: string().max(100).optional(),
  firstName: string().max(150).optional(),
  lastName: string().max(150).optional(),
  dob: string().optional(), // Date string format: YYYY-MM-DD
  gender: string().oneOf(['male', 'female', 'other']).optional(),
  phoneNumber: string().optional(),
  email: string().email().optional(),
  avatar_url: string().optional(),
  
  
  // Profile Information workHistory, hobbies, importantDates
  workHistory: array().of(string()).optional(),
  hobbies: array().of(string()).optional(),
  importantDates: array().of(
    object().shape({
      label: string().required(),
      date: string().required(), // Date string format: YYYY-MM-DD
    })
  ).optional(),

  
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


  // Address - single line string as per entity
  address: object().shape({
    street: string().optional(),
    city: string().optional(),
    state: string().optional(),
    country: string().optional(),
    postal_code: string().optional(),
  }).optional(),

  
  // bio and notes from caregiver Information
   bio: string().optional(),
   notesFromCaregiver: string().optional(),
 
});

export type DementiaUserOnboardingSchemaType = InferType<typeof DementiaUserOnboardingSchema>;


