import React from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables VITE_SUPABASE_URL or VITE_SUPABASE_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Quiz related functions
export const getQuizzes = async () => {
  const {
    data,
    error
  } = await supabase.from('quizzes').select('*');
  if (error) throw error;
  return data;
};

export const getQuizById = async (id: string) => {
  const {
    data,
    error
  } = await supabase.from('quizzes').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const saveQuizResult = async (userId: string, quizId: string, score: number) => {
  const {
    error
  } = await supabase.from('quiz_results').insert({
    user_id: userId,
    quiz_id: quizId,
    score,
    completed_at: new Date()
  });
  if (error) throw error;
};

// Animal information functions
export const getAnimals = async () => {
  const {
    data,
    error
  } = await supabase.from('animals').select('*');
  if (error) throw error;
  return data;
};

export const getAnimalById = async (id: string) => {
  const {
    data,
    error
  } = await supabase.from('animals').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

// Badge functions
export const getUserBadges = async (userId: string) => {
  const {
    data,
    error
  } = await supabase.from('badges').select('*').eq('user_id', userId);
  if (error) throw error;
  return data;
};

export const awardBadge = async (userId: string, type: string) => {
  // Check if user already has this badge
  const {
    data: existingBadge
  } = await supabase.from('badges').select('*').eq('user_id', userId).eq('type', type).single();
  if (existingBadge) return; // User already has this badge
  const {
    error
  } = await supabase.from('badges').insert({
    user_id: userId,
    type,
    awarded_at: new Date()
  });
  if (error) throw error;
};

// Leaderboard function
export const getLeaderboard = async () => {
  const {
    data,
    error
  } = await supabase.from('profiles').select(`
      id,
      name,
      avatar_url,
      badges:badges(count)
    `).order('badges.count', {
    ascending: false
  }).limit(5);
  if (error) throw error;
  return data;
};
