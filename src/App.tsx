import React, { useState, useEffect } from 'react';
import { Quiz } from './components/Quiz';
import { AdminPanel } from './components/AdminPanel';
import { QuizAttempt } from './types';
import { saveQuizAttempt, subscribeToAttempts } from './services/localStorageService';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';

export default function App() {
  const [view, setView] = useState<'quiz' | 'admin'>('quiz');
  const [isDemoAdmin, setIsDemoAdmin] = useState(false);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    if (isDemoAdmin) {
      const unsubscribe = subscribeToAttempts(setAttempts);
      return () => unsubscribe();
    }
  }, [isDemoAdmin]);

  const handleQuizComplete = async (attempt: QuizAttempt) => {
    try {
      await saveQuizAttempt(attempt);
      toast.success('Quiz attempt saved successfully!');
    } catch (error) {
      console.error('Failed to save attempt:', error);
      toast.error('Failed to save your result. Please try again.');
    }
  };

  useEffect(() => {
    const handleSwitchView = (e: any) => {
      if (e.detail) setView(e.detail);
    };
    const handleLogout = () => {
      setIsDemoAdmin(false);
      setView('quiz');
    };
    const handleDemoAdmin = () => {
      setIsDemoAdmin(true);
      setView('admin');
      toast.success('Entered Demo Admin Mode');
    };
    window.addEventListener('switch-view', handleSwitchView);
    window.addEventListener('logout', handleLogout);
    window.addEventListener('demo-admin', handleDemoAdmin);
    return () => {
      window.removeEventListener('switch-view', handleSwitchView);
      window.removeEventListener('logout', handleLogout);
      window.removeEventListener('demo-admin', handleDemoAdmin);
    };
  }, [isDemoAdmin]);

  const isAdmin = isDemoAdmin;

  return (
    <div className="min-h-screen bg-transparent text-slate-900 font-sans relative flex flex-col">
      <div className="commerce-bg" />
      <Toaster position="top-center" richColors theme="light" />
      
      <main className="flex-grow flex flex-col px-2 sm:px-4 py-6 md:py-10">
        <AnimatePresence mode="wait">
          {view === 'quiz' ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full sm:max-w-4xl mx-auto"
            >
              <Quiz
                onComplete={handleQuizComplete}
                initialName=""
                isAdmin={isAdmin}
                onSwitchView={(v) => setView(v)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-7xl mx-auto"
            >
              <AdminPanel attempts={attempts} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
