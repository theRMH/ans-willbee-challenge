import React, { useState, useEffect } from 'react';
import { QuizAttempt } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Download, Users, Trophy, TrendingUp, Search, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminPanelProps {
  attempts: QuizAttempt[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ attempts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAttempts, setFilteredAttempts] = useState(attempts);

  useEffect(() => {
    setFilteredAttempts(
      attempts.filter(a => 
        a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.zone.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, attempts]);

  const exportToCSV = () => {
    const headers = ['Name', 'WhatsApp', 'Total Score', 'Zone', 'Commerce', 'Economics', 'English', 'Maths', 'Accountancy', 'Costing', 'Date'];
    const rows = attempts.map(a => [
      a.studentName,
      (a as any).whatsappNumber || '',
      a.totalScore,
      a.zone,
      a.scores.Commerce,
      a.scores.Economics,
      a.scores.English,
      a.scores.Maths,
      a.scores.Accountancy,
      a.scores.Costing,
      new Date(a.timestamp).toLocaleString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'WillBee_Quiz_Results.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const zoneStats = attempts.reduce((acc, a) => {
    const zoneName = a.zone.split(':')[0];
    acc[zoneName] = (acc[zoneName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(zoneStats).map(([name, value]) => ({ name, value }));
  const COLORS = ['#2563eb', '#eab308', '#94a3b8', '#b45309', '#ef4444'];

  const averageScore = attempts.length > 0 
    ? (attempts.reduce((sum, a) => sum + a.totalScore, 0) / attempts.length).toFixed(1)
    : 0;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6 sm:space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#1a6645] tracking-tight">Admin Dashboard</h1>
          <p className="text-xs sm:text-sm text-[#1a6645]/60 font-medium">Monitor quiz performance and student insights.</p>
        </div>
        <button
          onClick={exportToCSV}
          className="btn-primary px-6 py-3 text-sm sm:text-base w-full md:w-auto"
        >
          <Download size={18} />
          Export to CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <motion.div 
          whileHover={{ y: -4 }}
          className="glass-surface p-5 sm:p-8 rounded-[22px] flex items-center gap-4 sm:gap-6 border-[#1a6645]/10"
        >
          <div className="p-3 sm:p-4 bg-[#1a6645] rounded-2xl text-[#e8c84a] shadow-xl">
            <Users size={20} />
          </div>
          <div>
            <p className="text-[8px] sm:text-[10px] text-[#a07820] font-black uppercase tracking-[0.3em]">Total Attempts</p>
            <p className="text-2xl sm:text-3xl font-black text-[#1a6645] mt-1">{attempts.length}</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="glass-surface p-5 sm:p-8 rounded-[22px] flex items-center gap-4 sm:gap-6 border-[#a07820]/10"
        >
          <div className="p-3 sm:p-4 bg-[#e8c84a] rounded-2xl text-[#1a6645] shadow-xl">
            <Trophy size={20} />
          </div>
          <div>
            <p className="text-[8px] sm:text-[10px] text-[#a07820] font-black uppercase tracking-[0.3em]">Average Score</p>
            <p className="text-2xl sm:text-3xl font-black text-[#1a6645] mt-1">{averageScore} <span className="text-xs text-[#1a6645]/30">/ 30</span></p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="glass-surface p-5 sm:p-8 rounded-[22px] flex items-center gap-4 sm:gap-6 border-[#1a6645]/10"
        >
          <div className="p-3 sm:p-4 bg-[#1a6645] rounded-2xl text-[#e8c84a] shadow-xl">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-[8px] sm:text-[10px] text-[#a07820] font-black uppercase tracking-[0.3em]">Completion Rate</p>
            <p className="text-2xl sm:text-3xl font-black text-[#1a6645] mt-1">100%</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Zone Distribution Chart */}
        <div className="glass-surface p-6 sm:p-10 rounded-[22px] space-y-6 sm:space-y-8 border-[#1a6645]/10">
          <h3 className="text-lg sm:text-2xl font-black text-[#1a6645] tracking-tight">Zone Distribution</h3>
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #1a664510', borderRadius: '1.2rem', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1a6645', fontWeight: 'bold', fontSize: '12px' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontWeight: 'bold', color: '#1a6645', fontSize: '11px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Attempts Table */}
        <div className="glass-surface p-6 sm:p-10 rounded-[22px] space-y-6 sm:space-y-8 border-[#1a6645]/10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-lg sm:text-2xl font-black text-[#1a6645] tracking-tight">Recent Attempts</h3>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a6645]/30" size={16} />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-12 pr-6 py-2.5 bg-white border-2 border-[#1a6645]/10 rounded-2xl text-xs text-[#1a6645] font-bold placeholder:text-[#1a6645]/20 focus:outline-none focus:ring-4 focus:ring-[#1a6645]/10 focus:border-[#1a6645] transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-[#1a6645]/10">
                  <th className="pb-4 sm:pb-8 font-black text-[#a07820] text-[9px] sm:text-[11px] uppercase tracking-[0.3em]">Student</th>
                  <th className="pb-4 sm:pb-8 font-black text-[#a07820] text-[9px] sm:text-[11px] uppercase tracking-[0.3em]">WhatsApp</th>
                  <th className="pb-4 sm:pb-8 font-black text-[#a07820] text-[9px] sm:text-[11px] uppercase tracking-[0.3em]">Score</th>
                  <th className="pb-4 sm:pb-8 font-black text-[#a07820] text-[9px] sm:text-[11px] uppercase tracking-[0.3em]">Zone</th>
                  <th className="pb-4 sm:pb-8 font-black text-[#a07820] text-[9px] sm:text-[11px] uppercase tracking-[0.3em]">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a6645]/10">
                {filteredAttempts.slice(0, 10).map((a, idx) => (
                  <tr key={idx} className="hover:bg-[#1a6645]/5 transition-colors group">
                    <td className="py-4 sm:py-8 font-black text-[#1a6645] group-hover:text-[#1a6645]/70 transition-colors text-sm sm:text-lg">{a.studentName}</td>
                    <td className="py-4 sm:py-8 text-sm text-[#1a6645] font-bold">{(a as any).whatsappNumber || '-'}</td>
                    <td className="py-4 sm:py-8">
                      <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#e8f4ee] text-[#1a6645] border-2 border-[#1a6645]/10 rounded-xl text-[10px] sm:text-xs font-black">
                        {a.totalScore}/30
                      </span>
                    </td>
                    <td className="py-4 sm:py-8 text-xs sm:text-base text-[#1a6645]/60 font-bold">{a.zone.split(':')[0]}</td>
                    <td className="py-4 sm:py-8 text-[9px] sm:text-[11px] text-[#1a6645]/40 flex items-center gap-2 sm:gap-3 font-black uppercase tracking-widest">
                      <Calendar size={14} className="text-[#1a6645]/30" />
                      {new Date(a.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
