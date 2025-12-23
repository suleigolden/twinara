import { QuestionCategory } from "../types";
import { GeneratedQuestion } from "@suleigolden/the-last-spelling-bee-api-client";

const STORAGE_KEY = "twinara_questions";
const EXPIRY_HOURS = 24;

type StoredQuestions = {
  questions: GeneratedQuestion[];
  timestamp: number;
}

type QuestionsStorage = Record<QuestionCategory, StoredQuestions>;

const getStorageData = (): Partial<QuestionsStorage> | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as Partial<QuestionsStorage>;
  } catch (error) {
    console.error("Error reading from local storage:", error);
    return null;
  }
};

const setStorageData = (data: Partial<QuestionsStorage>): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error writing to local storage:", error);
  }
};

const isExpired = (timestamp: number): boolean => {
  const now = Date.now();
  const expiryTime = EXPIRY_HOURS * 60 * 60 * 1000; // 24 hours in milliseconds
  return now - timestamp > expiryTime;
};

/**
 * Get questions from local storage for a specific category
 * Returns null if questions don't exist or are expired
 */
export const getQuestionsFromStorage = (
  category: QuestionCategory
): GeneratedQuestion[] | null => {
  const storageData = getStorageData();
  if (!storageData || !storageData[category]) {
    return null;
  }

  const stored = storageData[category];
  if (isExpired(stored.timestamp)) {
    // Remove expired questions
    delete storageData[category];
    setStorageData(storageData);
    return null;
  }

  return stored.questions;
};

/**
 * Store questions in local storage for a specific category
 */
export const storeQuestionsInStorage = (
  category: QuestionCategory,
  questions: GeneratedQuestion[]
): void => {
  const storageData = getStorageData() || {};
  storageData[category] = {
    questions,
    timestamp: Date.now(),
  };
  setStorageData(storageData);
};

/**
 * Clear all questions from local storage
 */
export const clearQuestionsStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing local storage:", error);
  }
};

/**
 * Clear questions for a specific category from local storage
 */
export const clearCategoryQuestions = (category: QuestionCategory): void => {
  const storageData = getStorageData();
  if (!storageData) return;

  delete storageData[category];
  setStorageData(storageData);
};

