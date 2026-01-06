import { useDementiaUserActivities } from "./use-dementia-user-activities";
import { useDementiaUserProfile } from "./use-dementia-user-profile";

  
  
export const useDataToGenerateActivityQuestions = () => {   
    // const { dementiaUserProfile } = useDementiaUserProfile();
    // const { dementiaUserActivities } = useDementiaUserActivities();
    const dementiaUserProfile = {
        firstName: "Margaret",
        lastName: "Henderson",
        dob: new Date("1946-04-18"),
        gender: "Female",
        phoneNumber: "+1-519-555-2847",
        email: "margaret.henderson@example.com",
        avatarUrl: "https://example.com/avatars/margaret-henderson.jpg",
      
        bio: `
      Margaret Henderson is a 78-year-old retired elementary school teacher who lived most of her life in London, Ontario.
      She was known for her patience, warm personality, and strong sense of routine. Margaret was married for 42 years
      to her late husband, Robert Henderson, who passed away in 2016 from heart complications.
      
      Margaret was diagnosed with early-stage Alzheimer’s disease in 2021, which has gradually progressed.
      She experiences short-term memory loss, difficulty with time orientation, and occasional confusion in unfamiliar
      environments. Long-term memories—especially related to her teaching career, her children, and her early adulthood—
      remain relatively strong.
      
      She responds very well to structured daily routines, familiar faces, gentle reminders, and calm reassurance.
      Music from the 1960s–1980s, gardening activities, and conversations about her students often bring her comfort.
      `,
      
        workHistory: [
          {
            role: "Elementary School Teacher",
            employer: "Thames Valley District School Board",
            yearsActive: "1969 – 2008",
            notes: "Taught grades 2–4. Especially loved reading programs and art projects."
          }
        ],
      
        hobbies: [
          "Gardening (roses and herbs)",
          "Listening to classical and old-time music",
          "Baking simple desserts (with assistance)",
          "Watching nature documentaries",
          "Reading children’s books aloud"
        ],
      
        importantDates: [
          {
            title: "Wedding Anniversary",
            date: "1974-06-22",
            notes: "Married to Robert Henderson. She still recognizes this date as special."
          },
          {
            title: "Husband’s Passing",
            date: "2016-11-03",
            notes: "Can become emotionally distressed when reminded unexpectedly."
          },
          {
            title: "Alzheimer’s Diagnosis",
            date: "2021-08-14",
            notes: "Diagnosis discussed gently and with family present."
          }
        ],
      
        notesFromCaregiver: `
        - Margaret becomes anxious when her routine is disrupted.
        - She often asks about her husband Robert in the evenings; reassurance works best.
        - Responds positively to being addressed by her first name.
        - Needs reminders to drink water and eat meals.
        - Occasionally forgets that she no longer drives.
        - Best cognitive clarity occurs between 9:00 AM and 1:00 PM.
        - Avoid correcting her harshly; redirection works better.
        - Enjoys being given “small responsibilities” like folding towels.
        `,
      
        createdAt: new Date("2024-01-12T10:15:00"),
        updatedAt: new Date("2025-02-20T14:30:00"),
      };
      const dementiaUserActivities = [
        {
          title: "Morning Orientation & Calendar Review",
          description: `
      Daily orientation session to help Margaret understand the day, date, time, and upcoming activities.
      Includes reviewing photos of family members and discussing simple plans for the day.
      `,
          dayOfWeek: 1,
          timeOfDay: "Morning",
          startDatetime: new Date("2025-03-10T09:00:00"),
          location: "Living Room",
          isRecurring: true,
          isActive: true
        },
        {
          title: "Gardening Therapy",
          description: `
      Light gardening activity focusing on watering plants and trimming roses.
      Helps Margaret reconnect with long-term memories and provides calming sensory stimulation.
      `,
          dayOfWeek: 2,
          timeOfDay: "Late Morning",
          startDatetime: new Date("2025-03-11T10:30:00"),
          location: "Backyard Garden",
          isRecurring: true,
          isActive: true
        },
        {
          title: "Music & Memory Session",
          description: `
      Listening to familiar classical and old-time music from Margaret’s youth.
      Encourages emotional regulation and memory recall.
      `,
          dayOfWeek: 3,
          timeOfDay: "Afternoon",
          startDatetime: new Date("2025-03-12T14:00:00"),
          location: "Bedroom",
          isRecurring: true,
          isActive: true
        },
        {
          title: "Family Photo Reminiscence",
          description: `
      Looking through labeled photo albums of children, grandchildren, and past vacations.
      Focuses on reinforcing identity and emotional connection.
      `,
          dayOfWeek: 4,
          timeOfDay: "Afternoon",
          startDatetime: new Date("2025-03-13T15:00:00"),
          location: "Living Room",
          isRecurring: true,
          isActive: true
        },
        {
          title: "Lunch Preparation Assistance",
          description: `
      Margaret helps with simple lunch prep such as washing vegetables or setting the table.
      Gives a sense of purpose while maintaining safety.
      `,
          dayOfWeek: 5,
          timeOfDay: "Midday",
          startDatetime: new Date("2025-03-14T12:00:00"),
          location: "Kitchen",
          isRecurring: true,
          isActive: true
        },
        {
          title: "Short Neighborhood Walk",
          description: `
      Supervised walk around the block to encourage light physical activity and orientation.
      Avoids unfamiliar routes to prevent confusion.
      `,
          dayOfWeek: 6,
          timeOfDay: "Late Afternoon",
          startDatetime: new Date("2025-03-15T16:30:00"),
          location: "Neighborhood",
          isRecurring: true,
          isActive: true
        },
        {
          title: "Evening Tea & Conversation",
          description: `
      Calm tea time with a caregiver to reduce sundowning anxiety.
      Topics focus on pleasant memories and familiar routines.
      `,
          dayOfWeek: 0,
          timeOfDay: "Evening",
          startDatetime: new Date("2025-03-16T18:00:00"),
          location: "Dining Area",
          isRecurring: true,
          isActive: true
        },
        {
          title: "Reading Aloud Session",
          description: `
      Margaret reads short children’s books aloud, a familiar activity from her teaching career.
      Helps reinforce confidence and verbal engagement.
      `,
          dayOfWeek: 2,
          timeOfDay: "Afternoon",
          startDatetime: new Date("2025-03-11T13:30:00"),
          location: "Living Room",
          isRecurring: true,
          isActive: true
        },
        {
          title: "Medication Reminder Check",
          description: `
      Caregiver-assisted medication reminder and confirmation.
      Margaret does not self-administer medications.
      `,
          dayOfWeek: 1,
          timeOfDay: "Morning",
          startDatetime: new Date("2025-03-10T08:30:00"),
          location: "Bedroom",
          isRecurring: true,
          isActive: true
        },
        {
          title: "Weekly Family Visit",
          description: `
      Visit from daughter Emily Henderson and grandson Lucas.
      Highly beneficial for emotional well-being.
      `,
          dayOfWeek: 6,
          timeOfDay: "Afternoon",
          startDatetime: new Date("2025-03-15T14:00:00"),
          location: "Living Room",
          isRecurring: true,
          isActive: true
        }
      ];

    return {
        firstName: dementiaUserProfile?.firstName,
        lastName: dementiaUserProfile?.lastName,
        dob: dementiaUserProfile?.dob,
        gender: dementiaUserProfile?.gender,
        phoneNumber: dementiaUserProfile?.phoneNumber,
        email: dementiaUserProfile?.email,
        avatarUrl: dementiaUserProfile?.avatarUrl,
        activities: dementiaUserActivities,
        workHistory: dementiaUserProfile?.workHistory,
        hobbies: dementiaUserProfile?.hobbies,
        importantDates: dementiaUserProfile?.importantDates,
        notesFromCaregiver: dementiaUserProfile?.notesFromCaregiver,
        bio: dementiaUserProfile?.bio,
        createdAt: dementiaUserProfile?.createdAt,
        updatedAt: dementiaUserProfile?.updatedAt,
    }
}