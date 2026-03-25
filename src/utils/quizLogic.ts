import { Subject, ZoneResult } from '../types';

export const calculateResult = (scores: Record<Subject, number>): ZoneResult => {
  const subjects: Subject[] = ['Commerce', 'Economics', 'English', 'Maths', 'Accountancy', 'Costing'];
  const percentages = subjects.reduce((acc, sub) => {
    acc[sub] = (scores[sub] / 5) * 100;
    return acc;
  }, {} as Record<Subject, number>);

  const sortedByScore = [...subjects].sort((a, b) => percentages[b] - percentages[a]);
  const top3 = sortedByScore.slice(0, 3);
  const remaining3 = sortedByScore.slice(3);

  // Zone Platinum: More than 75% in ALL 6 subjects.
  if (subjects.every(s => percentages[s] > 75)) {
    return {
      name: 'Zone Platinum: The Professional Legend',
      recommendation: 'You can choose any career you like! You have the stamina to master multiple complex fields at once.',
      path: 'Enroll in a Professional course (CA/CS/CMA) along with a Regular UG degree. Be consistent to reach 100% perfection for your Startup or Family Business !'
    };
  }

  // Zone Gold: More than 75% in Top 3 subjects and more than 50% in the remaining 3.
  if (top3.every(s => percentages[s] > 75) && remaining3.every(s => percentages[s] > 50)) {
    const top3Set = new Set(top3);
    let recommendedCourse = 'Specialist Powerhouse';

    if (top3Set.has('Accountancy') && top3Set.has('Costing') && top3Set.has('Maths')) recommendedCourse = 'CA';
    else if (top3Set.has('Accountancy') && top3Set.has('Costing') && top3Set.has('Economics')) recommendedCourse = 'CMA';
    else if (top3Set.has('Commerce') && top3Set.has('Economics') && top3Set.has('English')) recommendedCourse = 'CS/ LLB/ ICLS';
    else if (top3Set.has('Economics') && top3Set.has('Maths') && top3Set.has('Accountancy')) recommendedCourse = 'IIT';
    else if (top3Set.has('English') && top3Set.has('Maths') && top3Set.has('Accountancy')) recommendedCourse = 'IIM';
    else if (top3Set.has('Accountancy') && top3Set.has('Maths') && top3Set.has('Commerce')) recommendedCourse = 'IIBF';
    else if (top3Set.has('Maths') && top3Set.has('Commerce') && top3Set.has('Economics')) recommendedCourse = 'NISM';
    else if (top3Set.has('Accountancy') && top3Set.has('English') && top3Set.has('Economics')) recommendedCourse = 'IRS';
    else if (top3Set.has('Maths') && top3Set.has('Commerce') && top3Set.has('Accountancy')) recommendedCourse = 'Actuary';

    return {
      name: 'Zone Gold: The Specialist Powerhouse',
      recommendation: 'Aim for direct professional training in your specific line.',
      path: `Pursue ${recommendedCourse} as your primary professional goal along with a Regular UG degree.`
    };
  }

  // Zone Silver: More than 50% in ALL 6 subjects.
  if (subjects.every(s => percentages[s] > 50)) {
    return {
      name: 'Zone Silver: The Practical Builder',
      recommendation: 'You have a solid foundation but need "Real-World Proof" to unlock your confidence.',
      path: 'Pursue a Regular UG degree and use Finskillz and Startup Secretary as "Bridge Courses" to certify your practical skills.'
    };
  }

  // Zone Bronze: More than 50% in Top 3 subjects and less than 50% in the remaining 3.
  if (top3.every(s => percentages[s] > 50)) {
    return {
      name: 'Zone Bronze: The Niche Explorer',
      recommendation: 'Focus on your specialized Regular UG degree (B.Com, BBA, B.L) and use Skill Courses to decide your career along with employment.',
      path: 'Specialize in your top subjects during your UG degree.'
    };
  }

  // Zone Analysis: The Career Voyager
  return {
    name: 'Zone Analysis: The Career Voyager',
    recommendation: 'Analyze whether you really have an interest in commerce related courses. You can consider skill-based jobs while studying.',
    path: 'Explore vocational or skill-based certifications while pursuing a general degree.'
  };
};

export const getPersonalityBadge = (scores: Record<Subject, number>): string => {
  const s = scores;
  
  // Choose Company Secretary (CS) if you feel you like to read and interpret rules (Commerce, Economics, English)
  if (s.Commerce >= 4 && s.Economics >= 4 && s.English >= 4) return 'Company Secretary (CS) - Rule Interpreter';
  
  // Choose Chartered Accountant (CA) if you find peace in tallies and solving numerical puzzles (Accounts, Costing, Maths)
  if (s.Accountancy >= 4 && s.Costing >= 4 && s.Maths >= 4) return 'Chartered Accountant (CA) - Numerical Puzzle Solver';
  
  // Choose Cost and Management Accountant (CMA) if you enjoy analyzing costs, controlling expenses, Budgeting ( Accounts, Costing, Economics)
  if (s.Accountancy >= 4 && s.Costing >= 4 && s.Economics >= 4) return 'Cost and Management Accountant (CMA) - Expense Analyzer';
  
  // Choose Indian Institute of Banking and Finance (IIBF) if you love the logic of money and banking (Accounts, Economics, Commerce)
  if (s.Accountancy >= 4 && s.Economics >= 4 && s.Commerce >= 4) return 'IIBF - Money Logic Expert';
  
  // Choose National Institute of Securities Markets (NISM) if you are curious about the stock market, trading and understanding how financial markets work ( Maths, Commerce, Economics)
  if (s.Maths >= 4 && s.Commerce >= 4 && s.Economics >= 4) return 'NISM - Stock Market Enthusiast';
  
  // Choose Indian Revenue Service (IRS - UPSC) if you are passionate about taxation, law enforcement and contributing to the nation’s financial system ( Accounts, English, Economics)
  if (s.Accountancy >= 4 && s.English >= 4 && s.Economics >= 4) return 'IRS - UPSC - Nation Builder';
  
  // Choose Indian Corporate Law Service(ICLS- UPSC) if you are interested in corporate laws, governance and regulating companies ( Commerce, Economics, English)
  if (s.Commerce >= 3 && s.Economics >= 3 && s.English >= 3) return 'ICLS - UPSC - Governance Expert';
  
  // Choose Bachelor of Laws (LL.B) if you enjoy analyzing cases and defending view points and interested in law, argument and justice ( Commerce, English, Economics)
  if (s.Commerce >= 3 && s.English >= 3 && s.Economics >= 3) return 'LL.B - Justice Defender';
  
  // Choose Actuary if you enjoy working with numbers, analyzing risks and using maths to predict future outcomes ( Maths, Commerce, Accounts)
  if (s.Maths >= 3 && s.Commerce >= 3 && s.Accountancy >= 3) return 'Actuary - Risk Predictor';
  
  return 'The Bridge Course (Confidence Validator) - Practical DNA Explorer';
};
