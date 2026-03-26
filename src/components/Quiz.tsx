import React, { useState, useEffect, useRef } from 'react';
import { QUESTIONS, SUBJECTS, SCORE_SUBJECTS } from '../constants';
import { QuizAttempt, Subject } from '../types';
import { calculateResult } from '../utils/quizLogic';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, CheckCircle2, ChevronRight, Timer, User, Trophy, Star, Target, Compass, Rocket } from 'lucide-react';
import { logo01Src, braneryLogoSrc, finskillzLogoSrc } from '../logoData';

const ZONE_DATA = [
  { name: 'Zone Platinum', subtitle: 'The Professional Legend', score: 'More than 75% in ALL 6 subjects', Icon: Trophy },
  { name: 'Zone Gold', subtitle: 'The Specialist Powerhouse', score: 'More than 75% in Top 3 subjects and more than 50% in the remaining 3', Icon: Star },
  { name: 'Zone Silver', subtitle: 'The Practical Builder', score: 'More than 50% in ALL 6 subjects', Icon: Target },
  { name: 'Zone Bronze', subtitle: 'The Niche Explorer', score: 'More than 50% in Top 3 subjects and less than 50% in the remaining 3', Icon: Compass },
  { name: 'Zone Analysis', subtitle: 'The Career Voyager', score: 'Not even 3 subjects have 50% or more', Icon: Rocket },
];
import { ResultCard } from './ResultCard';
import { domToPng } from 'modern-screenshot';
import { toast } from 'sonner';

interface QuizProps {
  onComplete: (attempt: QuizAttempt) => void;
  initialName?: string;
  isAdmin?: boolean;
  onSwitchView?: (view: 'quiz' | 'admin') => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete, initialName = '', isAdmin, onSwitchView }) => {
  const [step, setStep] = useState<'welcome' | 'quiz' | 'result'>(initialName ? 'quiz' : 'welcome');
  const [studentName, setStudentName] = useState(initialName);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'quiz' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleFinish();
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const handleStart = () => {
    if (studentName.trim()) {
      setStep('quiz');
    }
  };

  const handleAnswer = (optionIndex: number) => {
    const question = QUESTIONS[currentQuestionIndex];
    setAnswers({ ...answers, [question.id]: optionIndex });
    
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const [finalAttempt, setFinalAttempt] = useState<QuizAttempt | null>(null);

  const handleFinish = () => {
    const scores: Record<Subject, number> = {
      Commerce: 0,
      Economics: 0,
      English: 0,
      Maths: 0,
      Accountancy: 0,
      Costing: 0
    };

    QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        scores[q.subject]++;
      }
    });

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const result = calculateResult(scores);

    const attempt: QuizAttempt = {
      studentName,
      scores,
      totalScore,
      timestamp: Date.now(),
      zone: result.name,
      recommendation: result.recommendation
    };

    setFinalAttempt(attempt);
    onComplete(attempt);
    setStep('result');
  };

  const breakdownRef = useRef<HTMLDivElement>(null);

  const handleDownloadBreakdown = async () => {
    if (breakdownRef.current === null || !finalAttempt) return;
    try {
      const dataUrl = await domToPng(breakdownRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `WillBee-Breakdown-${finalAttempt.studentName}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Score breakdown downloaded!');
    } catch (err) {
      console.error('Error generating image:', err);
      toast.error('Failed to download breakdown.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  if (step === 'welcome') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto p-6 sm:p-10 featured-card shadow-2xl relative"
      >
        {/* Admin Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          {isAdmin && onSwitchView && (
            <button
              onClick={() => onSwitchView('admin')}
              className="p-2 text-[#1a6645] hover:bg-[#1a6645]/10 rounded-full transition-colors"
              title="Admin Dashboard"
            >
              <LayoutDashboard size={20} />
            </button>
          )}
        </div>

        <div className="text-center space-y-4 sm:space-y-6">
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="p-1 bg-white rounded-xl shadow-md inline-block">
              <img
                src="/logo.png"
                alt="ESG CS Logo"
                className="h-10 sm:h-12 w-auto"
              />
            </div>
            <div className="flex flex-col items-center leading-tight">
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#1a6645]">ESG CS Foundation</span>
              <img
                src="/ANS 3 icon .png"
                alt="Career Center"
                className="h-10 mt-1"
                style={{ width: '55px' }}
              />
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#1a6645] tracking-tight leading-tight text-center">WILLBEE</h1>
            <p className="text-sm sm:text-base text-[#1a6645]/70 font-medium leading-relaxed max-w-md mx-auto">
              Identify your <span className="text-[#1a6645] font-black">professional path</span> in Commerce.
            </p>
          </div>
          
          <div className="bg-white/50 border border-[#a07820]/20 p-4 sm:p-6 rounded-[20px] text-left space-y-2 sm:space-y-3">
            <h3 className="font-black text-[#1a6645] text-sm sm:text-base uppercase tracking-widest">Quiz Details:</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-[#1a6645]/80 font-bold text-[10px] sm:text-xs">
              <li className="flex items-center gap-2 sm:gap-3"><CheckCircle2 size={14} className="text-[#1a6645]" /> 30 Multiple Choice Questions</li>
              <li className="flex items-center gap-2 sm:gap-3"><CheckCircle2 size={14} className="text-[#1a6645]" /> 6 Core Subjects (5 questions each)</li>
              <li className="flex items-center gap-2 sm:gap-3"><CheckCircle2 size={14} className="text-[#1a6645]" /> 15 Minutes Time Limit</li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a6645]/30" size={18} />
              <input
                type="text"
                placeholder="Enter your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#1a6645]/10 rounded-[18px] focus:ring-4 focus:ring-[#1a6645]/10 focus:border-[#1a6645] transition-all outline-none text-base text-[#1a6645] font-bold placeholder:text-[#1a6645]/20"
              />
            </div>
            <button
              onClick={handleStart}
              disabled={!studentName.trim()}
              className="btn-primary w-full text-lg py-3"
            >
              Start Quiz
              <ChevronRight size={22} />
            </button>

          </div>
        </div>
      </motion.div>
    );
  }

  if (step === 'quiz') {
    return (
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-8">
        <div className="flex justify-between items-center glass-surface p-3 sm:p-4 rounded-[22px]">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 bg-[#1a6645] rounded-xl text-[#e8c84a] shadow-lg">
              <Timer size={18} />
            </div>
            <span className={`font-mono font-black text-lg sm:text-xl ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-[#1a6645]'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[8px] sm:text-[9px] text-[#a07820] uppercase font-black tracking-[0.2em]">Question</span>
            <p className="text-lg sm:text-xl font-black text-[#1a6645]">{currentQuestionIndex + 1} <span className="text-[10px] sm:text-xs text-[#1a6645]/30">/ {QUESTIONS.length}</span></p>
          </div>
        </div>

        <div className="w-full bg-[#e8f4ee] h-2 sm:h-3 rounded-full overflow-hidden border border-[#1a6645]/10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-[#1a6645] shadow-[0_0_20px_rgba(26,102,69,0.3)]"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-surface p-6 sm:p-8 rounded-[22px] space-y-6 sm:space-y-8"
          >
            <div className="space-y-2 sm:space-y-3">
              <span className="px-3 py-1 bg-[#e8c84a] text-[#1a6645] rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                {currentQuestion.subject}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a6645] leading-tight">
                {currentQuestion.text}
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-1">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="group relative flex items-center p-4 sm:p-5 bg-white border-2 border-[#1a6645]/5 hover:border-[#1a6645] hover:bg-[#1a6645] rounded-[22px] transition-all text-left shadow-sm hover:shadow-md"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-[#e8f4ee] border-2 border-[#1a6645]/10 group-hover:border-[#e8c84a] rounded-xl mr-4 sm:mr-5 text-[#1a6645] group-hover:text-[#e8c84a] font-black text-base sm:text-lg transition-all shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-base sm:text-lg text-[#1a6645]/80 group-hover:text-white font-bold transition-colors">{option}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (!finalAttempt) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full sm:max-w-5xl mx-auto space-y-8 sm:space-y-12"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#e8c84a] text-[#1a6645] rounded-full shadow-lg border-2 border-[#a07820]/20 animate-bounce">
          <Trophy size={20} className="fill-current" />
          <span className="text-sm font-black uppercase tracking-widest">Congratulations!</span>
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-5xl font-black text-[#1a6645] tracking-tighter leading-none">Quiz Complete!</h1>
          <p className="text-base sm:text-xl text-[#1a6645]/60 font-medium">You've successfully identified your professional path.</p>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-start">
        <ResultCard attempt={finalAttempt} onDownloadBreakdown={handleDownloadBreakdown} />
        
        <div ref={breakdownRef} className="glass-surface p-4 sm:p-8 rounded-[22px] space-y-5 sm:space-y-8 bg-white">
          <h3 className="text-lg sm:text-2xl font-black text-[#1a6645] tracking-tight">Score Breakdown</h3>
          <div className="space-y-3 sm:space-y-6">
            {SCORE_SUBJECTS.map((sub) => {
              const score = finalAttempt.scores[sub];
              return (
                <div key={sub} className="space-y-1 sm:space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[7px] sm:text-[10px] font-black text-[#a07820] uppercase tracking-[0.2em]">{sub}</span>
                    <span className="text-sm sm:text-lg font-black text-[#1a6645]">{score} <span className="text-[9px] sm:text-xs text-[#1a6645]/30">/ 5</span></span>
                  </div>
                  <div className="w-full bg-[#e8f4ee] h-1 sm:h-2 rounded-full overflow-hidden border border-[#1a6645]/10">
                    <div className="bg-[#1a6645] h-full shadow-[0_0_15px_rgba(26,102,69,0.2)]" style={{ width: `${(score / 5) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pt-4 sm:pt-8 border-t border-[#1a6645]/10 space-y-4">
            <div className="flex justify-between items-center p-4 sm:p-6 bg-[#f5efc6] rounded-[22px] border border-[#a07820]/20">
              <span className="text-sm sm:text-lg font-black text-[#1a6645] uppercase tracking-widest">Total Score</span>
              <span className="text-xl sm:text-3xl font-black text-[#1a6645] tracking-tighter">{finalAttempt.totalScore} <span className="text-sm sm:text-lg text-[#1a6645]/40">/ 30</span></span>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] sm:text-xs font-black text-[#a07820] uppercase tracking-[0.2em] px-1">All Zones</p>
              {ZONE_DATA.map(zone => {
                const currentZoneName = calculateResult(finalAttempt.scores).name.split(':')[0].trim();
                const isActive = zone.name === currentZoneName;
                return (
                  <div
                    key={zone.name}
                    className={`p-3 sm:p-4 rounded-[16px] border-2 transition-all ${isActive ? 'border-[#1a6645] bg-[#1a6645]/5' : 'border-slate-100 bg-white/60'}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <zone.Icon size={15} className={`mt-0.5 shrink-0 ${isActive ? 'text-[#1a6645]' : 'text-slate-400'}`} />
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-1.5">
                          <span className={`font-black text-sm ${isActive ? 'text-[#1a6645]' : 'text-slate-700'}`}>{zone.name}</span>
                          <span className={`text-sm font-bold ${isActive ? 'text-[#a07820]' : 'text-slate-500'}`}>{zone.subtitle}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{zone.score}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Partner Logos */}
            <div className="flex justify-center items-center gap-3 pt-2">
              {[{src: logo01Src, alt: 'Startup Secretary'}, {src: braneryLogoSrc, alt: 'Branery'}, {src: finskillzLogoSrc, alt: 'FinSkillz'}].map((logo) => (
                <div key={logo.alt} style={{background:'white', borderRadius:'14px', boxShadow:'0 2px 8px rgba(0,0,0,0.10)', width:'110px', height:'60px', display:'flex', alignItems:'center', justifyContent:'center', padding:'6px'}}>
                  <img src={logo.src} alt={logo.alt} style={{width:'100%', height:'100%', objectFit:'contain'}} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
