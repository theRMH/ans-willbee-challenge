import { QuizAttempt } from '../types';

const STORAGE_KEY = 'willbee_quiz_attempts';

const getAttempts = (): QuizAttempt[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveQuizAttempt = async (attempt: QuizAttempt): Promise<string> => {
  const attempts = getAttempts();
  const id = `local_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  attempts.unshift({ ...attempt, id });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
  return id;
};

export const subscribeToAttempts = (callback: (attempts: QuizAttempt[]) => void): (() => void) => {
  callback(getAttempts());

  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback(getAttempts());
    }
  };
  window.addEventListener('storage', onStorage);
  return () => window.removeEventListener('storage', onStorage);
};
