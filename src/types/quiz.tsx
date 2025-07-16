export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}
export interface Quiz {
  id: string;
  title: string;
  description: string;
  image_url: string;
  questions: Question[];
}
export interface QuizResult {
  id?: string;
  user_id: string;
  quiz_id: string;
  score: number;
  completed_at: string;
  synced?: boolean;
}