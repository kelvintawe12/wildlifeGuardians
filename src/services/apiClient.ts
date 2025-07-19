import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add auth token to requests if available
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

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
    return response.data.data.quizzes || [];
  } catch (error) {
    console.error('Failed to fetch quizzes:', error);
    throw error;
  }
};

export const getQuizById = async (id: string): Promise<Quiz> => {
  try {
    const response = await api.get(`/quizzes/${id}`);
    return response.data.data.quiz;
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
    return response.data.data.result;
  } catch (error) {
    console.error('Failed to submit quiz:', error);
    throw error;
  }
};

// Animal endpoints
export const getAnimals = async (): Promise<Animal[]> => {
  try {
    const response = await api.get('/animals');
    return response.data.data.animals || [];
  } catch (error) {
    console.error('Failed to fetch animals:', error);
    throw error;
  }
};

export const getAnimalById = async (id: string): Promise<Animal> => {
  try {
    const response = await api.get(`/animals/${id}`);
    return response.data.data.animal;
  } catch (error) {
    console.error(`Failed to fetch animal ${id}:`, error);
    throw error;
  }
};

// Badge endpoints
export const getBadgeTypes = async () => {
  try {
    const response = await api.get('/badges/types');
    return response.data.data.badge_types || [];
  } catch (error) {
    console.error('Failed to fetch badge types:', error);
    throw error;
  }
};

export const getUserBadges = async (): Promise<Badge[]> => {
  try {
    const response = await api.get('/badges/user');
    return response.data.data.badges || [];
  } catch (error) {
    console.error('Failed to fetch user badges:', error);
    throw error;
  }
};

// User endpoints
export const getUserProfile = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data.data.user;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData: { name?: string; avatar_url?: string }) => {
  try {
    const response = await api.put('/auth/profile', profileData);
    return response.data.data.user;
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw error;
  }
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

    const quizzes = quizzesResponse.status === 'fulfilled' ? quizzesResponse.value.data.data.quizzes || [] : [];
    const animals = animalsResponse.status === 'fulfilled' ? animalsResponse.value.data.data.animals || [] : [];
    const badges = badgesResponse.status === 'fulfilled' ? badgesResponse.value.data.data.badges || [] : [];

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
    const { token, user } = response.data.data;
    localStorage.setItem('authToken', token);
    return { user, token };
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/auth/register', { name, email, password });
    const { token, user } = response.data.data;
    localStorage.setItem('authToken', token);
    return { user, token };
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('authToken');
  } catch (error) {
    console.error('Logout failed:', error);
    localStorage.removeItem('authToken'); // Clear token anyway
  }
};

export default api;
