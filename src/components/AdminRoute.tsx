import React, { useState, useEffect } from 'react';
import { subscribeToAttempts } from '../services/localStorageService';
import { QuizAttempt, Subject } from '../types';
import { Download, Search, Calendar, Users, Trophy, TrendingUp, Lock, LogOut, Eye, EyeOff } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const ADMIN_USERNAME = 'willbeeadmin';
const ADMIN_PASSWORD = 'willbee@admin2026';
const SESSION_KEY = 'willbee_admin_auth';

const SCORE_SUBJECTS: Subject[] = ['Commerce', 'English', 'Accountancy', 'Costing', 'Maths', 'Economics'];
const COLORS = ['#1a6645', '#e8c84a', '#a07820', '#2563eb', '#94a3b8', '#ef4444'];

export const AdminRoute: React.FC = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  useEffect(() => {
    if (!authed) return;
    const unsub = subscribeToAttempts(setAttempts);
    return () => unsub();
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setAuthed(true);
      toast.success('Welcome, Admin!');
    } else if (username !== ADMIN_USERNAME) {
      toast.error('Wrong username.');
    } else {
      toast.error('Wrong password.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setUsername('');
    setPassword('');
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center px-4">
        <div className="commerce-bg" />
        <Toaster position="top-center" richColors />
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white rounded-[28px] shadow-2xl p-8 space-y-6 border border-[#1a6645]/10"
        >
          <div className="text-center space-y-1">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-[#1a6645] rounded-2xl text-[#e8c84a]">
                <Lock size={24} />
              </div>
            </div>
            <h1 className="text-2xl font-black text-[#1a6645]">Admin Panel</h1>
            <p className="text-xs text-[#1a6645]/50 font-medium">Enter credentials to access dashboard</p>
          </div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-3 border-2 border-[#1a6645]/10 rounded-2xl text-[#1a6645] font-bold focus:outline-none focus:border-[#1a6645] focus:ring-4 focus:ring-[#1a6645]/10 transition-all"
            autoFocus
            autoComplete="username"
          />
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 border-2 border-[#1a6645]/10 rounded-2xl text-[#1a6645] font-bold focus:outline-none focus:border-[#1a6645] focus:ring-4 focus:ring-[#1a6645]/10 transition-all"
              autoComplete="current-password"
            />
            <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1a6645]/40 hover:text-[#1a6645]">
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button type="submit" className="w-full py-3 bg-[#1a6645] text-white font-black rounded-2xl hover:bg-[#1a6645]/90 transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  const filtered = attempts.filter(a =>
    a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['Name', 'Total Score', 'Zone', 'Commerce', 'Economics', 'English', 'Maths', 'Accountancy', 'Costing', 'Recommendation', 'Date'];
    const rows = attempts.map(a => [
      `"${a.studentName}"`,
      a.totalScore,
      `"${a.zone}"`,
      a.scores.Commerce,
      a.scores.Economics,
      a.scores.English,
      a.scores.Maths,
      a.scores.Accountancy,
      a.scores.Costing,
      `"${a.recommendation}"`,
      new Date(a.timestamp).toLocaleString()
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'WillBee_Quiz_Results.csv';
    link.click();
  };

  const avgScore = attempts.length > 0
    ? (attempts.reduce((s, a) => s + a.totalScore, 0) / attempts.length).toFixed(1)
    : '0';

  const zoneStats = attempts.reduce((acc, a) => {
    const z = a.zone.split(':')[0];
    acc[z] = (acc[z] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const pieData = Object.entries(zoneStats).map(([name, value]) => ({ name, value }));

  const subjectAvg = SCORE_SUBJECTS.map(sub => ({
    subject: sub,
    avg: attempts.length > 0
      ? parseFloat((attempts.reduce((s, a) => s + (a.scores[sub] || 0), 0) / attempts.length).toFixed(2))
      : 0
  }));

  return (
    <div className="min-h-screen bg-transparent font-sans">
      <div className="commerce-bg" />
      <Toaster position="top-center" richColors />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1a6645] tracking-tight">Admin Dashboard</h1>
            <p className="text-xs text-[#1a6645]/50 font-medium mt-1">WillBee Quiz — All student results</p>
          </div>
          <div className="flex gap-3">
            <button onClick={exportToCSV} className="flex items-center gap-2 px-5 py-2.5 bg-[#1a6645] text-white rounded-2xl font-black text-sm hover:bg-[#1a6645]/90 transition-colors shadow-lg">
              <Download size={16} /> Export CSV
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-2xl font-black text-sm hover:bg-red-100 transition-colors">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <Users size={20} />, label: 'Total Attempts', value: attempts.length, bg: 'bg-[#1a6645]', text: 'text-[#e8c84a]' },
            { icon: <Trophy size={20} />, label: 'Average Score', value: `${avgScore} / 30`, bg: 'bg-[#e8c84a]', text: 'text-[#1a6645]' },
            { icon: <TrendingUp size={20} />, label: 'Top Score', value: attempts.length ? `${Math.max(...attempts.map(a => a.totalScore))} / 30` : '— / 30', bg: 'bg-[#1a6645]', text: 'text-[#e8c84a]' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-[22px] p-6 flex items-center gap-4 shadow-sm border border-[#1a6645]/10">
              <div className={`p-3 ${s.bg} rounded-xl ${s.text}`}>{s.icon}</div>
              <div>
                <p className="text-[9px] text-[#a07820] font-black uppercase tracking-widest">{s.label}</p>
                <p className="text-2xl font-black text-[#1a6645] mt-0.5">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-[22px] p-6 shadow-sm border border-[#1a6645]/10">
            <h3 className="font-black text-[#1a6645] mb-4">Zone Distribution</h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={6} dataKey="value" stroke="none">
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-[22px] p-6 shadow-sm border border-[#1a6645]/10">
            <h3 className="font-black text-[#1a6645] mb-4">Average Score per Subject</h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectAvg} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a664510" />
                  <XAxis dataKey="subject" tick={{ fontSize: 9, fontWeight: 700, fill: '#a07820' }} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="avg" fill="#1a6645" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Full Data Table */}
        <div className="bg-white rounded-[22px] shadow-sm border border-[#1a6645]/10 overflow-hidden">
          <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1a6645]/10">
            <h3 className="font-black text-[#1a6645] text-lg">All Student Results <span className="text-[#a07820] text-sm font-bold">({filtered.length})</span></h3>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a6645]/30" size={15} />
              <input
                type="text"
                placeholder="Search by name or zone..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-[#1a6645]/10 rounded-xl text-xs text-[#1a6645] font-bold placeholder:text-[#1a6645]/20 focus:outline-none focus:border-[#1a6645] transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#f5f9f7]">
                <tr>
                  {['#', 'Name', 'Total', 'Zone', 'Commerce', 'English', 'Accountancy', 'Costing', 'Maths', 'Economics', 'Date', 'Details'].map(h => (
                    <th key={h} className="px-4 py-3 text-[9px] font-black text-[#a07820] uppercase tracking-widest whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a6645]/5">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="text-center py-12 text-[#1a6645]/30 font-black text-sm">No attempts yet.</td>
                  </tr>
                ) : filtered.map((a, idx) => (
                  <React.Fragment key={a.id || idx}>
                    <tr className="hover:bg-[#f5f9f7] transition-colors">
                      <td className="px-4 py-3 text-xs text-[#1a6645]/40 font-black">{idx + 1}</td>
                      <td className="px-4 py-3 font-black text-[#1a6645] text-sm whitespace-nowrap">{a.studentName}</td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 bg-[#e8f4ee] text-[#1a6645] rounded-lg text-xs font-black border border-[#1a6645]/10">{a.totalScore}/30</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#1a6645]/70 font-bold whitespace-nowrap">{a.zone.split(':')[0]}</td>
                      {SCORE_SUBJECTS.map(sub => (
                        <td key={sub} className="px-4 py-3 text-center">
                          <span className={`inline-block w-6 h-6 rounded-full text-[10px] font-black leading-6 ${a.scores[sub] >= 4 ? 'bg-[#1a6645] text-white' : a.scores[sub] >= 2 ? 'bg-[#e8c84a] text-[#1a6645]' : 'bg-red-100 text-red-600'}`}>
                            {a.scores[sub]}
                          </span>
                        </td>
                      ))}
                      <td className="px-4 py-3 text-[10px] text-[#1a6645]/40 font-bold whitespace-nowrap">
                        <span className="flex items-center gap-1"><Calendar size={11} />{new Date(a.timestamp).toLocaleDateString()}</span>
                        <span className="text-[9px] text-[#1a6645]/30">{new Date(a.timestamp).toLocaleTimeString()}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setExpandedRow(expandedRow === (a.id || String(idx)) ? null : (a.id || String(idx)))}
                          className="text-[10px] font-black text-[#1a6645] underline underline-offset-2 hover:text-[#a07820] transition-colors"
                        >
                          {expandedRow === (a.id || String(idx)) ? 'Hide' : 'View'}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === (a.id || String(idx)) && (
                      <tr className="bg-[#f5f9f7]">
                        <td colSpan={12} className="px-6 py-4">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-[#a07820] uppercase tracking-widest">Recommendation</p>
                            <p className="text-sm text-[#1a6645] font-medium leading-relaxed">{a.recommendation}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
