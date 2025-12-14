export type QuestionType = "multiple-choice" | "yes-no";

export type QuestionCategory = 
  | "identity-self-recall"
  | "people-relationships"
  | "routine-daily-awareness"
  | "recognition-based"
  | "story-memory"
  | "behavioral-prompts";

export type Question = {
  id: string;
  category: QuestionCategory;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation?: string;
};

export type GameState = {
  currentQuestionIndex: number;
  score: number;
  lives: number;
  totalXP: number;
  accuracy: number;
  answeredQuestions: number;
  correctAnswers: number;
};

export type CategoryInfo = {
  id: QuestionCategory;
  title: string;
  icon: string;
  description: string;
  color: string;
};

