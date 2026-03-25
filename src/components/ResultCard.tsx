import React, { useRef, useEffect } from 'react';
import { domToPng } from 'modern-screenshot';
import { QuizAttempt, Subject } from '../types';
import { calculateResult, getPersonalityBadge } from '../utils/quizLogic';
import { Share2, Download, Trophy, Star, Target, Compass, Rocket, Quote, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface ResultCardProps {
  attempt: QuizAttempt;
  onDownloadBreakdown?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ attempt, onDownloadBreakdown }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const result = calculateResult(attempt.scores);
  const badge = getPersonalityBadge(attempt.scores);

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

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
      // Ensure images are loaded
      const images = Array.from(cardRef.current.getElementsByTagName('img')) as HTMLImageElement[];
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      }));

      const dataUrl = await domToPng(cardRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        filter: (node) => {
          // Exclude any elements that might interfere with capture if necessary
          return true;
        }
      });
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
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      }));

      const dataUrl = await domToPng(cardRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });

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

  const getZoneIcon = () => {
    if (result.name.includes('Platinum')) return <Trophy className="text-[#a07820]" size={48} />;
    if (result.name.includes('Gold')) return <Star className="text-[#a07820]" size={48} />;
    if (result.name.includes('Silver')) return <Target className="text-[#a07820]" size={48} />;
    if (result.name.includes('Bronze')) return <Compass className="text-[#a07820]" size={48} />;
    return <Rocket className="text-[#a07820]" size={48} />;
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
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1a6645 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
            
            {/* Top Image Banner */}
            <img
              src="/cert-header.png"
              alt="Certificate Header"
              className="w-full h-auto object-cover"
            />

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

              <div className="relative space-y-1 sm:space-y-1.5 text-center">
                <div className="space-y-0.5">
                  <p className="text-[6px] sm:text-[8px] text-[#a07820] uppercase font-black tracking-[0.4em] pt-[2px]">Career DNA Match</p>
                  <h2 className="text-[9px] sm:text-sm font-black text-[#1a6645] leading-tight px-4">
                    {result.name.split(':')[0]}
                  </h2>
                </div>

                <div className="relative py-1 sm:py-1.5 px-2.5 sm:px-4 bg-white/50 backdrop-blur-sm rounded-lg sm:rounded-xl border border-[#1a6645]/10">
                  <Quote className="absolute -left-0.5 -top-0.5 text-[#e8c84a]" size={10} />
                  <p className="text-[6px] sm:text-[9px] text-[#1a6645] font-medium leading-relaxed italic">
                    "{result.recommendation}"
                  </p>
                </div>

                {/* Subject Highlights */}
                <div className="flex justify-center gap-1 pt-0.5">
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

            {/* Stats/Badges Grid */}
            <div className="grid grid-cols-2 gap-1.5 mb-1">
              <div className="bg-[#1a6645] p-1.5 rounded-lg text-center shadow-lg transform -rotate-1 hover:rotate-0 transition-transform flex flex-col justify-center min-h-[36px]">
                <span className="text-[7px] text-[#e8c84a] uppercase font-black tracking-widest opacity-80">Personality</span>
                <p className="text-[8px] font-medium text-white mt-0.5 leading-tight">{badge.split('-')[0]}</p>
              </div>
              <div className="bg-[#e8c84a] p-1.5 rounded-lg text-center shadow-lg transform rotate-1 hover:rotate-0 transition-transform flex flex-col justify-center min-h-[36px]">
                <span className="text-[7px] text-[#1a6645] uppercase font-black tracking-widest opacity-80">Next Step</span>
                <p className="text-[8px] font-medium text-[#1a6645] mt-0.5 leading-tight line-clamp-2">{result.path}</p>
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

    {/* Action Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-md px-4">
        <div className="text-center space-y-1">
          <p className="text-xs font-black text-[#1a6645] uppercase tracking-[0.2em]">Share what you discovered!</p>
          <p className="text-sm sm:text-lg text-red-600 font-black animate-pulse">Tag @ESG_CS_Foundation with #commerce discover</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={handleShare}
            className="btn-primary w-full text-lg py-4 shadow-[0_10px_20px_rgba(26,102,69,0.2)]"
          >
            <Instagram size={20} />
            Share Certificate to Instagram
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
