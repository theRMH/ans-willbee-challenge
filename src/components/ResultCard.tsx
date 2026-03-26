import React, { useRef, useEffect } from 'react';
import { domToPng } from 'modern-screenshot';
import { QuizAttempt, Subject } from '../types';
import { calculateResult } from '../utils/quizLogic';
import { Download, Trophy, Star, Target, Compass, Rocket, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const ZONE_DATA = [
  {
    name: 'Zone Platinum',
    subtitle: 'The Professional Legend',
    score: 'More than 75% in ALL 6 subjects',
    recommendation: 'You can choose any career you like! You have the stamina to master multiple complex fields at once. Enroll in a Professional course (CA/CS/CMA) along with a Regular UG degree.',
    Icon: Trophy,
  },
  {
    name: 'Zone Gold',
    subtitle: 'The Specialist Powerhouse',
    score: 'More than 75% in Top 3 subjects and more than 50% in the remaining 3',
    recommendation: 'Aim for direct professional training in your specific line (CA/CMA/CS).',
    Icon: Star,
  },
  {
    name: 'Zone Silver',
    subtitle: 'The Practical Builder',
    score: 'More than 50% in ALL 6 subjects',
    recommendation: 'You have a solid foundation. Pursue a Regular UG degree and use Finskillz and Startup Secretary as "Bridge Courses" to certify your practical skills.',
    Icon: Target,
  },
  {
    name: 'Zone Bronze',
    subtitle: 'The Niche Explorer',
    score: 'More than 50% in Top 3 subjects and less than 50% in the remaining 3',
    recommendation: 'Focus on your specialized Regular UG degree (B.Com, BBA, B.L) and use Skill Courses to decide your career along with employment.',
    Icon: Compass,
  },
  {
    name: 'Zone Analysis',
    subtitle: 'The Career Voyager',
    score: 'Not even 3 subjects have 50% or more',
    recommendation: 'Analyze whether you really have an interest in commerce related courses. You can consider skill-based jobs while studying.',
    Icon: Rocket,
  },
];

interface ResultCardProps {
  attempt: QuizAttempt;
  onDownloadBreakdown?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ attempt, onDownloadBreakdown }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const result = calculateResult(attempt.scores);

  const currentZoneName = result.name.split(':')[0].trim();
  const currentZoneSubtitle = result.name.split(':')[1]?.trim();
  const currentZoneData = ZONE_DATA.find(z => z.name === currentZoneName);

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleDownload = async () => {
    if (cardRef.current === null) return;
    const toastId = toast.loading('Generating high-quality certificate...');
    try {
      const images = Array.from(cardRef.current.getElementsByTagName('img')) as HTMLImageElement[];
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
      }));
      const dataUrl = await domToPng(cardRef.current, { scale: 2, backgroundColor: '#ffffff', filter: () => true });
      const link = document.createElement('a');
      link.download = `WillBee-Certificate-${attempt.studentName}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Certificate downloaded!', { id: toastId });
    } catch (err) {
      console.error('Error generating image:', err);
      toast.error('Failed to generate certificate. Try again.', { id: toastId });
    }
  };

  const handleShare = async () => {
    if (cardRef.current === null) return;
    const toastId = toast.loading('Preparing certificate...');
    try {
      const images = Array.from(cardRef.current.getElementsByTagName('img')) as HTMLImageElement[];
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
      }));
      const dataUrl = await domToPng(cardRef.current, { scale: 2, backgroundColor: '#ffffff' });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `WillBee-Certificate-${attempt.studentName}.png`, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        toast.dismiss(toastId);
        await navigator.share({ files: [file] });
      } else {
        toast.error('Sharing not supported on this device. Use the download button instead.', { id: toastId });
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        toast.dismiss(toastId);
      } else {
        console.error('Error sharing:', err);
        toast.error('Failed to prepare certificate. Try again.', { id: toastId });
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 px-0 py-4 sm:p-4">
      {/* The Shareable Card */}
      <div className="w-full max-w-[450px] flex justify-center px-2 sm:px-0">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          ref={cardRef}
          className="w-full aspect-[4/5] bg-[#1a6645] p-2 sm:p-3 rounded-[32px] sm:rounded-[40px] shadow-2xl relative overflow-hidden flex-shrink-0"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#e8c84a]/40 rounded-full blur-[100px] -mr-36 -mt-36 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#a07820]/40 rounded-full blur-[100px] -ml-36 -mb-36 animate-pulse" style={{ animationDelay: '1.5s' }} />

          <div className="bg-white h-full rounded-[26px] sm:rounded-[34px] overflow-hidden flex flex-col relative z-10 border-b-[10px] sm:border-b-[12px] border-[#e8c84a] shadow-inner">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1a6645 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />

            {/* Top Image Banner */}
            <img src="/cert-header.png" alt="Certificate Header" className="w-full h-auto object-cover" />

            <div className="flex-grow p-2.5 sm:p-5 flex flex-col justify-between">
              {/* Header Section */}
              <div className="space-y-1 sm:space-y-1.5 relative">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#1a6645] text-white rounded-full text-[7px] font-black uppercase tracking-wider shadow-sm">
                  <Trophy size={7} className="text-[#e8c84a]" />
                  Official Result
                </div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg sm:text-2xl font-black text-[#1a6645] leading-none tracking-tighter truncate min-w-0">
                    {attempt.studentName}
                  </h1>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="bg-[#e8c84a] text-[#1a6645] text-[6px] sm:text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-sm border border-white uppercase tracking-tighter whitespace-nowrap shrink-0"
                  >
                    Discovered commerce
                  </motion.div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="relative flex-grow flex flex-col justify-center mt-2 sm:mt-3 mb-0.5">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a6645]/5 to-transparent rounded-[20px] sm:rounded-[28px] -rotate-1" />

                <div className="relative space-y-1.5 sm:space-y-2 text-center">
                  <p className="text-[6px] sm:text-[8px] text-[#a07820] uppercase font-black tracking-[0.4em] pt-[2px]">Career DNA Match</p>
                  <div className="space-y-0.5">
                    <h2 className="text-sm sm:text-xl font-black text-[#1a6645] leading-tight">
                      {currentZoneName}
                    </h2>
                    <p className="text-[9px] sm:text-sm font-bold text-[#a07820] leading-tight">
                      {currentZoneSubtitle}
                    </p>
                  </div>

                  {/* Subject Highlights */}
                  <div className="flex justify-center gap-1 pt-1">
                    {(Object.entries(attempt.scores) as [Subject, number][]).map(([subject, score]) => (
                      <div
                        key={subject}
                        className={`h-1.5 rounded-full transition-all duration-500 ${score > 3 ? 'w-6 bg-[#1a6645]' : 'w-2 bg-[#1a6645]/10'}`}
                        title={subject}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Branding */}
              <div className="pt-1.5 flex justify-between items-end border-t border-[#1a6645]/5">
                <div className="flex items-center gap-1">
                  <img src="/logo.png" alt="Logo" className="h-5 w-auto object-contain" />
                  <div className="flex flex-col leading-none">
                    <span className="text-[7px] font-black text-[#1a6645] uppercase tracking-tighter">WillBee Quiz</span>
                    <span className="text-[5px] font-bold text-[#a07820] uppercase tracking-[0.2em] pt-0.5 inline-block">By ESG CS Foundation</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[5px] font-black text-[#1a6645]/30 uppercase tracking-widest">willbee.career</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Zone Explanation */}
      {currentZoneData && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md px-4"
        >
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border-2 border-[#1a6645]/20">
            <h3 className="text-3xl sm:text-4xl font-black text-[#1a6645] leading-tight">{currentZoneName}</h3>
            <p className="text-xl sm:text-2xl font-bold text-[#a07820] mt-1">{currentZoneSubtitle}</p>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-sm font-black text-slate-500 uppercase tracking-wider">Score</p>
                <p className="text-base font-semibold text-slate-700 mt-1">{currentZoneData.score}</p>
              </div>
              <div>
                <p className="text-sm font-black text-slate-500 uppercase tracking-wider">Recommendation</p>
                <p className="text-base text-slate-700 mt-1">{currentZoneData.recommendation}</p>
                {result.recommendedCourse && currentZoneName === 'Zone Gold' && (
                  <p className="text-base font-black text-[#1a6645] mt-2">
                    Recommended Course: {result.recommendedCourse}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* All Zones */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-md px-4"
      >
        <p className="text-xs font-black text-[#1a6645] uppercase tracking-[0.2em] text-center mb-3">All Zones</p>
        <div className="space-y-2">
          {ZONE_DATA.map(zone => {
            const isActive = zone.name === currentZoneName;
            return (
              <div
                key={zone.name}
                className={`p-3 rounded-xl border-2 transition-all ${isActive ? 'border-[#1a6645] bg-[#1a6645]/5' : 'border-slate-100 bg-white'}`}
              >
                <div className="flex items-start gap-2.5">
                  <zone.Icon size={16} className={`mt-0.5 shrink-0 ${isActive ? 'text-[#1a6645]' : 'text-slate-400'}`} />
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
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-md px-4">
        <div className="text-center space-y-1">
          <p className="text-xs font-black text-[#1a6645] uppercase tracking-[0.2em]">Share what you discovered!</p>
          <p className="text-sm sm:text-lg text-red-600 font-black animate-pulse">Tag @ESG_CS_Foundation with #ESGCS</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleShare}
            className="btn-primary w-full text-lg py-4 shadow-[0_10px_20px_rgba(26,102,69,0.2)]"
          >
            <Instagram size={20} />
            Share Certificate to Instagram / FB
          </button>
          <button
            onClick={onDownloadBreakdown}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-[#f5efc6] hover:bg-[#f0e6a8] text-[#1a6645] rounded-[22px] font-black transition-all border-2 border-[#a07820]/20 active:scale-95 text-base shadow-sm"
          >
            <Download size={20} />
            Download Score Report
          </button>
        </div>
      </div>
    </div>
  );
};
