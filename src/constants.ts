import { Question, Subject } from './types';

export const SUBJECTS: Subject[] = [
  'Commerce',
  'Language Skill' as any, // Mapping 'English' to 'Language Skill' as per doc
  'Accounting' as any, // Mapping 'Accountancy' to 'Accounting'
  'Costing',
  'Business Maths' as any, // Mapping 'Maths' to 'Business Maths'
  'Economics'
];

// Actual subjects for scoring logic
export const SCORE_SUBJECTS: Subject[] = [
  'Commerce',
  'English',
  'Accountancy',
  'Costing',
  'Maths',
  'Economics'
];

export const QUESTIONS: Question[] = [
  // COMMERCE
  {
    id: 'c1',
    subject: 'Commerce',
    text: 'What is the maximum number of partners in a Partnership Firm?',
    options: ['20', '50', '100', '200'],
    correctAnswer: 1
  },
  {
    id: 'c2',
    subject: 'Commerce',
    text: 'What is Limited Liability in a company? (as against Personal Liability)',
    options: ['You have to pay to the extent of agreed shares', 'You have to pay for the debts or obligations'],
    correctAnswer: 0
  },
  {
    id: 'c3',
    subject: 'Commerce',
    text: 'Who takes decision on behalf of a company? How does a company act?',
    options: ['Management to take decision', 'Board of directors together to take decision'],
    correctAnswer: 1
  },
  {
    id: 'c4',
    subject: 'Commerce',
    text: 'After buying the laptop you realize that the Copilot AI is not working, then',
    options: ['Affected party can cancel the contract & claim damages (VOIDABLE)', 'Affected party cannot cancel the contract but can claim damages'],
    correctAnswer: 1
  },
  {
    id: 'c5',
    subject: 'Commerce',
    text: 'How voting is done at board meeting and where the resolution is considered as passed?',
    options: ['1 person = 1 vote', '1 share = 1 vote'],
    correctAnswer: 0
  },
  // LANGUAGE SKILL (English)
  {
    id: 'e1',
    subject: 'English',
    text: 'A company needs to request loan approval from bank. Which is more appropriate?',
    options: ['We want you to approve our request as soon as possible.', 'Kindly request you to grant approval for our application at your earliest convenience.'],
    correctAnswer: 1
  },
  {
    id: 'e2',
    subject: 'English',
    text: 'A promoter wants to follow up on a pending incorporation. Which is more appropriate?',
    options: ['It will be our privilege if honourable ministry provides the incorporation certificate...', 'Why haven’t you replied yet? Send the response quickly.'],
    correctAnswer: 0
  },
  {
    id: 'e3',
    subject: 'English',
    text: 'Working like a telescope, ____ the size of objects at great distances.',
    options: ['which magnifies a telephoto lens', 'a telephoto lens magnifies', 'a telephoto lens which magnifies', 'and magnifying a telephoto lens'],
    correctAnswer: 1
  },
  {
    id: 'e4',
    subject: 'English',
    text: 'Don\'t worry, by the time you ___ home I ___ dinner.',
    options: ['came/will make', 'have come/would have make', 'come/will have made', 'had come/ made'],
    correctAnswer: 2
  },
  {
    id: 'e5',
    subject: 'English',
    text: 'During the course of its growth, a frog undergoes a true metamorphosis ____ with “a fish like larval stage”.',
    options: ['begin', 'began', 'beginning', 'is begun'],
    correctAnswer: 2
  },
  // ACCOUNTING
  {
    id: 'a1',
    subject: 'Accountancy',
    text: 'Cash sales of goods costing Rs. 1,20,000 at a profit of 20% on sales less trade discount @ 10% and cash discount @ 5%. Net cash received?',
    options: ['Rs. 14,400; Rs. 6480; and Rs. 1,23,120', 'Rs. 14,400; Rs. 6750; and Rs. 1,22,850', 'Rs. 15,000; Rs. 6480; and Rs. 1,28,520', 'Rs. 15,000; Rs. 6750; and Rs. 1,28,250'],
    correctAnswer: 3
  },
  {
    id: 'a2',
    subject: 'Accountancy',
    text: 'A Ltd. forfeited 2000 shares... Amount to be credited to Capital Reserve account?',
    options: ['Rs. 1500 and Rs. 2000', 'Rs. 2500 and Rs. 1500', 'Rs. 2000 and Rs. 2500', 'Rs. 1500 and Rs. 2500'],
    correctAnswer: 3
  },
  {
    id: 'a3',
    subject: 'Accountancy',
    text: 'If Opening Stock = ₹30,000, Purchases = ₹1,00,000, Closing Stock = ₹20,000, Cost of Goods Sold =?',
    options: ['₹1,10,000', '₹90,000', '₹1,20,000', '₹1,50,000'],
    correctAnswer: 0
  },
  {
    id: 'a4',
    subject: 'Accountancy',
    text: 'If Inventory Turnover Ratio is high, it indicates:',
    options: ['Slow movement of stock', 'Efficient stock management', 'Loss in business', 'High expenses'],
    correctAnswer: 1
  },
  {
    id: 'a5',
    subject: 'Accountancy',
    text: 'Average Inventory will increase if:',
    options: ['Closing stock increases', 'Opening stock decreases', 'Both (a) and (b)', 'None'],
    correctAnswer: 0
  },
  // COSTING
  {
    id: 'co1',
    subject: 'Costing',
    text: 'If the Inventory Turnover Ratio is 4, what is the Inventory Conversion Period (in days) for a year with 360 days?',
    options: ['120 days', '45 days', '90 days', '180 days'],
    correctAnswer: 2
  },
  {
    id: 'co2',
    subject: 'Costing',
    text: 'What is the formula for Inventory Conversion Period (in days)?',
    options: ['Inventory Turnover Ratio / Number of days in a year', 'Number of days in a year / Inventory Turnover Ratio', 'Inventory Turnover Ratio x Number of days in a year', 'Inventory Turnover Ratio + Number of days in a year'],
    correctAnswer: 1
  },
  {
    id: 'co3',
    subject: 'Costing',
    text: 'Which of the following is a variable cost?',
    options: ['Rent', 'Salary', 'Direct material', 'Insurance'],
    correctAnswer: 2
  },
  {
    id: 'co4',
    subject: 'Costing',
    text: 'Break-even point occurs when:',
    options: ['Profit is maximum', 'Loss is minimum', 'Total cost = Total revenue', 'Sales are zero'],
    correctAnswer: 2
  },
  {
    id: 'co5',
    subject: 'Costing',
    text: 'Which method is used for cost control and cost reduction?',
    options: ['Financial accounting', 'Cost accounting', 'Bookkeeping', 'Auditing'],
    correctAnswer: 1
  },
  // BUSINESS MATHS
  {
    id: 'm1',
    subject: 'Maths',
    text: 'A bag contains 3 red balls and 2 blue balls. Probability of getting a red ball?',
    options: ['2/5', '3/5', '1/5', '4/5'],
    correctAnswer: 1
  },
  {
    id: 'm2',
    subject: 'Maths',
    text: 'Selecting every 5th item from a list is called:',
    options: ['Random Sampling', 'Stratified Sampling', 'Systematic Sampling', 'Cluster Sampling'],
    correctAnswer: 2
  },
  {
    id: 'm3',
    subject: 'Maths',
    text: 'A sample is:',
    options: ['Entire population', 'A part of the population selected for study', 'Only numerical data', 'A statistical formula'],
    correctAnswer: 1
  },
  {
    id: 'm4',
    subject: 'Maths',
    text: 'Which of the following is a measure of dispersion?',
    options: ['Mean', 'Median', 'Mode', 'Standard deviation'],
    correctAnswer: 3
  },
  {
    id: 'm5',
    subject: 'Maths',
    text: 'A differential equation is an equation involving:',
    options: ['Only constants', 'Only variables', 'Variables and their derivatives', 'Only algebraic terms'],
    correctAnswer: 2
  },
  // ECONOMICS
  {
    id: 'ec1',
    subject: 'Economics',
    text: 'What do you think will be India’s GDP Value by 2047?',
    options: ['1 trillion Dollar', '50 trillion Dollar', '100 trillion Dollar'],
    correctAnswer: 1
  },
  {
    id: 'ec2',
    subject: 'Economics',
    text: 'In which year was the World Trade Organisation established?',
    options: ['2005', '1991', '1995'],
    correctAnswer: 2
  },
  {
    id: 'ec3',
    subject: 'Economics',
    text: 'Foreign Direct Investment is not permitted in the following sector',
    options: ['Telecommunication', 'Pharmaceuticals', 'Atomic Energy', 'Hospitality and Tourism'],
    correctAnswer: 2
  },
  {
    id: 'ec4',
    subject: 'Economics',
    text: 'How does the World Commission on Environment and Development (1987) define "sustainable development"?',
    options: ['Focus on luxury needs over basic needs', 'Use up past resources for current growth', 'Meet present needs without harming future needs', 'Focus only on declining natural resources'],
    correctAnswer: 2
  },
  {
    id: 'ec5',
    subject: 'Economics',
    text: 'Under the WTO\'s TRIPs, what fundamental shift was introduced regarding patents?',
    options: ['Use process patents instead of product patents', 'Grant product patents instead of process patents.', 'LCDs fully exempt from patent rules', 'Limit Intellectual Property to copyrights and trademarks'],
    correctAnswer: 1
  }
];
