import { Quiz } from '../types/quiz';
import { Animal } from '../types/animal';
// Local storage keys
const QUIZZES_KEY = 'wildlife_guardians_quizzes';
const ANIMALS_KEY = 'wildlife_guardians_animals';
const USER_DATA_KEY = 'wildlife_guardians_user_data';
const QUIZ_RESULTS_KEY = 'wildlife_guardians_quiz_results';
// Save quizzes to local storage
export const saveQuizzesToLocalStorage = (quizzes: Quiz[]) => {
  try {
    localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));
    return true;
  } catch (error) {
    console.error('Error saving quizzes to local storage:', error);
    return false;
  }
};
// Get quizzes from local storage
export const getQuizzesFromLocalStorage = (): Quiz[] => {
  try {
    const quizzes = localStorage.getItem(QUIZZES_KEY);
    return quizzes ? JSON.parse(quizzes) : [];
  } catch (error) {
    console.error('Error getting quizzes from local storage:', error);
    return [];
  }
};
// Save animals to local storage
export const saveAnimalsToLocalStorage = (animals: Animal[]) => {
  try {
    localStorage.setItem(ANIMALS_KEY, JSON.stringify(animals));
    return true;
  } catch (error) {
    console.error('Error saving animals to local storage:', error);
    return false;
  }
};
// Get animals from local storage
export const getAnimalsFromLocalStorage = (): Animal[] => {
  try {
    const animals = localStorage.getItem(ANIMALS_KEY);
    return animals ? JSON.parse(animals) : [];
  } catch (error) {
    console.error('Error getting animals from local storage:', error);
    return [];
  }
};
// Save user data to local storage
export const saveUserDataToLocalStorage = (userData: any) => {
  try {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error('Error saving user data to local storage:', error);
    return false;
  }
};
// Get user data from local storage
export const getUserDataFromLocalStorage = () => {
  try {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data from local storage:', error);
    return null;
  }
};
// Save quiz results to local storage (for offline sync later)
export const saveQuizResultToLocalStorage = (result: any) => {
  try {
    const results = getQuizResultsFromLocalStorage();
    results.push({
      ...result,
      timestamp: new Date().toISOString(),
      synced: false
    });
    localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(results));
    return true;
  } catch (error) {
    console.error('Error saving quiz result to local storage:', error);
    return false;
  }
};
// Get quiz results from local storage
export const getQuizResultsFromLocalStorage = () => {
  try {
    const results = localStorage.getItem(QUIZ_RESULTS_KEY);
    return results ? JSON.parse(results) : [];
  } catch (error) {
    console.error('Error getting quiz results from local storage:', error);
    return [];
  }
};
// Mark quiz results as synced
export const markQuizResultsAsSynced = (resultIds: string[]) => {
  try {
    const results = getQuizResultsFromLocalStorage();
    const updatedResults = results.map((result: any) => {
      if (resultIds.includes(result.id)) {
        return {
          ...result,
          synced: true
        };
      }
      return result;
    });
    localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(updatedResults));
    return true;
  } catch (error) {
    console.error('Error marking quiz results as synced:', error);
    return false;
  }
};
// Clear all local storage data
export const clearLocalStorage = () => {
  try {
    localStorage.removeItem(QUIZZES_KEY);
    localStorage.removeItem(ANIMALS_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(QUIZ_RESULTS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing local storage:', error);
    return false;
  }
};