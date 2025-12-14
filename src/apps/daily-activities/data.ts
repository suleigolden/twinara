import { Question, CategoryInfo } from "./types";

// Dummy data structure for game questions
export const dummyQuestions: Question[] = [
  // Identity & Self Recall
  {
    id: "1",
    category: "identity-self-recall",
    type: "multiple-choice",
    question: "What is your name?",
    options: ["John", "Sarah", "Michael", "Emma"],
    correctAnswer: "John",
    explanation: "Great! You remembered your name correctly.",
  },
  {
    id: "2",
    category: "identity-self-recall",
    type: "yes-no",
    question: "Did you used to work as a teacher?",
    correctAnswer: true,
    explanation: "That's right! You were a teacher for many years.",
  },
  {
    id: "3",
    category: "identity-self-recall",
    type: "multiple-choice",
    question: "What city do you live in?",
    options: ["New York", "Los Angeles", "Chicago", "Boston"],
    correctAnswer: "Boston",
    explanation: "Perfect! Boston is your home.",
  },

  // People & Relationships
  {
    id: "4",
    category: "people-relationships",
    type: "multiple-choice",
    question: "Who is Sarah to you?",
    options: ["Daughter", "Sister", "Friend", "Neighbor"],
    correctAnswer: "Daughter",
    explanation: "Excellent! Sarah is your daughter.",
  },
  {
    id: "5",
    category: "people-relationships",
    type: "yes-no",
    question: "Do you live with your wife?",
    correctAnswer: true,
    explanation: "Yes! You live together with your wife.",
  },

  // Routine & Daily Awareness
  {
    id: "6",
    category: "routine-daily-awareness",
    type: "multiple-choice",
    question: "What do you usually do on Monday mornings?",
    options: ["Go for a walk", "Garden", "Read", "Exercise"],
    correctAnswer: "Go for a walk",
    explanation: "That's your Monday morning routine!",
  },
  {
    id: "7",
    category: "routine-daily-awareness",
    type: "yes-no",
    question: "Do you usually have breakfast at 8 AM?",
    correctAnswer: true,
    explanation: "Yes! Breakfast at 8 AM is part of your routine.",
  },

  // Recognition-Based Tasks
  {
    id: "8",
    category: "recognition-based",
    type: "multiple-choice",
    question: "Which of these is your favorite hobby?",
    options: ["Gardening", "Reading", "Cooking", "Painting"],
    correctAnswer: "Gardening",
    explanation: "Correct! You love gardening.",
  },
  {
    id: "9",
    category: "recognition-based",
    type: "yes-no",
    question: "Do you enjoy listening to classical music?",
    correctAnswer: true,
    explanation: "Yes! Classical music is something you enjoy.",
  },

  // Story & Memory Reinforcement
  {
    id: "10",
    category: "story-memory",
    type: "multiple-choice",
    question: "What do you like most about gardening?",
    options: ["Seeing things grow", "Being outdoors", "The peacefulness", "Growing vegetables"],
    correctAnswer: "Seeing things grow",
    explanation: "You love watching your plants grow and thrive!",
  },
  {
    id: "11",
    category: "story-memory",
    type: "yes-no",
    question: "Do you enjoy spending time with your family on weekends?",
    correctAnswer: true,
    explanation: "Yes! Weekends with family are special to you.",
  },

  // Gentle Behavioral Prompts
  {
    id: "12",
    category: "behavioral-prompts",
    type: "yes-no",
    question: "Would you like to take a short walk now?",
    correctAnswer: true,
    explanation: "Great! Walking is good for you.",
  },
];

export const categories: CategoryInfo[] = [
  {
    id: "identity-self-recall",
    title: "Identity & Self Recall",
    icon: "👤",
    description: "Reinforce sense of self",
    color: "purple",
  },
  {
    id: "people-relationships",
    title: "People & Relationships",
    icon: "❤️",
    description: "Reinforce family and social bonds",
    color: "pink",
  },
  {
    id: "routine-daily-awareness",
    title: "Routine & Daily Awareness",
    icon: "⏰",
    description: "Reduce confusion about time and plans",
    color: "blue",
  },
  {
    id: "recognition-based",
    title: "Recognition Tasks",
    icon: "✅",
    description: "Easy recognition questions",
    color: "green",
  },
  {
    id: "story-memory",
    title: "Story & Memory",
    icon: "📖",
    description: "Strengthen narrative memory",
    color: "orange",
  },
  {
    id: "behavioral-prompts",
    title: "Wellness Prompts",
    icon: "💬",
    description: "Encourage healthy habits",
    color: "teal",
  },
];

