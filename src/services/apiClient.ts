import axios from 'axios';

// Extend Window interface to include optional toast and showToast properties
declare global {
  interface Window {
    toast?: {
      error: (msg: string) => void;
    };
    showToast?: (msg: string, type?: string) => void;
  }
}


const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default config
// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Store auth token in memory
let authToken: string | null = null;

// Function to set auth token globally for axios instance
export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// No auth token logic needed

// No auth error handling needed for token

// Types
export interface Quiz {
  id: string;
  title: string;
  description: string;
  image_url: string;
  difficulty: string;
  questions?: any[];
  created_at?: string;
  updated_at?: string;
}

export interface Animal {
  id: string;
  name: string;
  description: string;
  image_url: string;
  conservation_status: string;
  habitat: string;
  scientific_name?: string;
  population?: number;
  threats?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Badge {
  id: string;
  type: string;
  description?: string;
  icon?: string;
  awarded_at: string;
  user_id: string;
}

export interface QuizResult {
  id: string;
  quiz_id: string;
  score: number;
  total_questions: number;
  completed_at: string;
  time_spent?: number;
}

export interface DashboardStats {
  totalQuizzes: number;
  completedQuizzes: number;
  totalBadges: number;
  averageScore: number;
  totalAnimals: number;
  recentActivity: any[];
}

// API Functions

// Health check
export const checkApiHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('API health check failed:', error);
    throw error;
  }
};

// Quiz endpoints
export const getQuizzes = async (): Promise<Quiz[]> => {
  try {
    const response = await api.get('/quizzes');
    const data = response.data as { data: { quizzes: Quiz[] } };
    return data.data.quizzes || [];
  } catch (error) {
    console.error('Failed to fetch quizzes:', error);
    throw error;
  }
};

export const getQuizById = async (id: string): Promise<Quiz> => {
  try {
    const response = await api.get(`/quizzes/${id}`);
    const data = response.data as { data: { quiz: Quiz } };
    return data.data.quiz;
  } catch (error) {
    console.error(`Failed to fetch quiz ${id}:`, error);
    throw error;
  }
};

export const submitQuiz = async (quizId: string, answers: any[], score: number, timeSpent: number, totalQuestions: number): Promise<QuizResult> => {
  try {
    const response = await api.post(`/quizzes/${quizId}/submit`, {
      answers,
      score,
      time_spent: timeSpent,
      total_questions: totalQuestions
    });
    const data = response.data as { data: { result: QuizResult } };
    return data.data.result;
  } catch (error) {
    console.error('Failed to submit quiz:', error);
    throw error;
  }
};

// Animal endpoints
export const getAnimals = async (): Promise<Animal[]> => {
  try {
    const response = await api.get('/animals');
    const data = response.data as { data: { animals: Animal[] } };
    return data.data.animals || [];
  } catch (error) {
    console.error('Failed to fetch animals:', error);
    throw error;
  }
};

export const getAnimalById = async (id: string): Promise<Animal> => {
  try {
    const response = await api.get(`/animals/${id}`);
    const data = response.data as { data: { animal: Animal } };
    return data.data.animal;
  } catch (error) {
    console.error(`Failed to fetch animal ${id}:`, error);
    throw error;
  }
};

// Badge endpoints
export const getBadgeTypes = async () => {
  try {
    const response = await api.get('/badges/types');
    const data = response.data as { data: { badge_types: any[] } };
    return data.data.badge_types || [];
  } catch (error) {
    console.error('Failed to fetch badge types:', error);
    throw error;
  }
};

export const getUserBadges = async (email?: string): Promise<Badge[]> => {
  try {
    let userEmail = email;
    if (!userEmail) {
      // Try to get from localStorage
      const userData = localStorage.getItem('wildlife_guardians_user');
      if (userData) {
        const user = JSON.parse(userData);
        userEmail = user.email;
      }
    }
    if (!userEmail) {
      throw new Error('No email provided for user badges fetch');
    }
    const response = await api.get(`/badges/user?email=${encodeURIComponent(userEmail)}`);
    const data = response.data as { data: { badges: Badge[] } };
    return data.data.badges || [];
  } catch (error) {
    console.error('Failed to fetch user badges:', error);
    throw error;
  }
};

// User endpoints
export const getUserProfile = async (email?: string) => {
  try {
    let userEmail = email;
    if (!userEmail) {
      // Try to get from localStorage
      const userData = localStorage.getItem('wildlife_guardians_user');
      if (userData) {
        const user = JSON.parse(userData);
        userEmail = user.email;
      }
    }
    if (!userEmail) {
      throw new Error('No email provided for user profile fetch');
    }
    // Try /users/profile first
    const response = await api.get(`/users/profile?email=${encodeURIComponent(userEmail)}`);
    const data = response.data as { data: { user: any } };
    return data.data.user;
  } catch (error: any) {
    // If 404, try legacy endpoint
    if (error.response && error.response.status === 404) {
      try {
        const legacyResponse = await api.get('/auth/legacy/me');
        const legacyData = legacyResponse.data as { data: { user: any } };
        return legacyData.data.user;
      } catch (legacyError) {
        console.error('Failed to fetch user profile from legacy endpoint:', legacyError);
        throw legacyError;
      }
    }
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData: any, email?: string) => {
  let userEmail = email;
  if (!userEmail) {
    const userData = localStorage.getItem('wildlife_guardians_user');
    if (userData) {
      const user = JSON.parse(userData);
      userEmail = user.email;
    }
  }
  if (!userEmail) {
    throw new Error('No email provided for user profile update');
  }
  const response = await api.put(`/users/profile?email=${encodeURIComponent(userEmail)}`, profileData);
  const data = response.data as { data: { user: any } };
  return data.data.user;
};

// Dashboard stats (derived from multiple endpoints)
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    // Make parallel requests to get all necessary data
    const [quizzesResponse, animalsResponse, badgesResponse] = await Promise.allSettled([
      api.get('/quizzes'),
      api.get('/animals'),
      api.get('/badges/user')
    ]);

    const quizzes = quizzesResponse.status === 'fulfilled'
      ? ((quizzesResponse.value as any).data.data.quizzes || [])
      : [];
    const animals = animalsResponse.status === 'fulfilled'
      ? ((animalsResponse.value as any).data.data.animals || [])
      : [];
    const badges = badgesResponse.status === 'fulfilled'
      ? ((badgesResponse.value as any).data.data.badges || [])
      : [];

    // TODO: Add quiz results endpoint to get completed quizzes and average score
    const stats: DashboardStats = {
      totalQuizzes: quizzes.length,
      completedQuizzes: 0, // Will need quiz results endpoint
      totalBadges: badges.length,
      averageScore: 0, // Will need quiz results endpoint
      totalAnimals: animals.length,
      recentActivity: []
    };

    return stats;
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    throw error;
  }
};

// Auth endpoints
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const data = response.data as { data: { user: any } };
    const { user } = data.data;
    return { user };
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const register = async (name: string, email: string, password: string, confirmPassword?: string) => {
  try {
    const response = await api.post('/auth/register', { 
      name, 
      email, 
      password,
      confirmPassword: password
    });
    const data = response.data as { data: { user: any } };
    const { user } = data.data;
    return { user };
  } catch (error: any) {
    // Check for duplicate email error (400)
    if (error.response && error.response.status === 400) {
      const message = error.response.data?.message || error.response.data?.error || '';
      if (typeof window !== 'undefined' && message.toLowerCase().includes('email')) {
        // Show toast notification if available
        if (window?.toast) {
          window.toast.error('Email is already registered. Please use a different email.');
        } else if (window?.showToast) {
          window.showToast('Email is already registered. Please use a different email.', 'error');
        } else {
          alert('Email is already registered. Please use a different email.');
        }
      }
    }
    console.error('Registration failed:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export const getUserQuizResults = async (): Promise<any[]> => {
  const response = await api.get('/quizzes/results/user');
  // Assuming response.data.data.results is the array of quiz results
  const data = response.data as { data: { results: any[] } };
  return data.data.results || [];
};

export default api;
