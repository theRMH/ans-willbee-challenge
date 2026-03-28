export type Subject = 'Commerce' | 'Economics' | 'English' | 'Maths' | 'Accountancy' | 'Costing';

export interface Question {
  id: string;
  subject: Subject;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export interface QuizAttempt {
  id?: string;
  studentName: string;
  whatsappNumber: string;
  scores: Record<Subject, number>; // Number of correct answers per subject (out of 5)
  totalScore: number;
  timestamp: number;
  zone: string;
  recommendation: string;
}

export interface ZoneResult {
  name: string;
  recommendation: string;
  path: string;
  badge?: string;
  recommendedCourse?: string;
}
