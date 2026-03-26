import { QuizAttempt } from '../types';

export const saveQuizAttempt = async (attempt: QuizAttempt): Promise<string> => {
  const res = await fetch('/api/attempts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(attempt),
  });
  if (!res.ok) throw new Error('Failed to save attempt');
  const { id } = await res.json();
  return id;
};

export const subscribeToAttempts = (callback: (attempts: QuizAttempt[]) => void): (() => void) => {
  let active = true;

  const fetchAttempts = async () => {
    try {
      const res = await fetch('/api/attempts');
      if (res.ok) {
        const data = await res.json();
        callback(data);
      }
    } catch (err) {
      console.error('Failed to fetch attempts:', err);
    }
  };

  fetchAttempts();
  const interval = setInterval(() => {
    if (active) fetchAttempts();
  }, 5000);

  return () => {
    active = false;
    clearInterval(interval);
  };
};
