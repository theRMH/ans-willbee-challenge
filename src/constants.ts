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

export const QUESTION_TRANSLATIONS: Record<string, { text: string; options: string[] }> = {
  c1: {
    text: 'ஒரு கூட்டுறவு நிறுவனத்தில் அதிகபட்ச கூட்டாளர்கள் எண்ணிக்கை எவ்வளவு?',
    options: ['20', '50', '100', '200']
  },
  c2: {
    text: 'ஒரு நிறுவனத்தில் வரம்பு பொறுப்பு என்பது என்ன? (தனிப்பட்ட பொறுப்புக்கு மாற்றாக)',
    options: ['நீங்கள் ஒப்புக்கொண்ட பங்குகளின் வரம்பிற்கு மட்டுமே செலுத்த வேண்டும்', 'கடன்கள் அல்லது கடமைகளுக்காக உங்களுக்கு தனிப்பட்ட முறையில் செலுத்த வேண்டி வருகிறது']
  },
  c3: {
    text: 'நிறுவனம் எதற்காக முடிவெடுக்கிறது? ஒரு நிறுவனம் எவ்வாறு செயல்படுகிறது?',
    options: ['மேலாண்மை முடிவெடுக்கும்', 'ஆலோசனை குழு சேர்ந்து முடிவெடுக்கும்']
  },
  c4: {
    text: 'லேப்டாப் வாங்கிய பிறகு Copilot AI வேலை செய்யவில்லை என்றால் என்ன செய்ய வேண்டும்?',
    options: ['பார்க்கப்பட்டக் கடமை ரத்து செய்யப்பட முடியும் மற்றும் சேதம் கோரலாம் (தெளிவில்லாதது)', 'நீங்கள் ஒப்புக் கொண்ட ஒப்பந்தத்தை ரத்து செய்ய முடியாது ஆனால் சேதம் கோர முடியும்']
  },
  c5: {
    text: 'போர்டு கூட்டத்தில் வாக்களிப்பு எப்படிப் பண்ணப்படுகிறது மற்றும் தீர்மானம் எங்கு ஒடுக்கப்படுகிறது?',
    options: ['ஒரு நபர் = 1 வோட்', '1 பங்கு = 1 வோட்']
  },
  e1: {
    text: 'வங்கி கடன் அனுமதி கேட்க வேண்டிய போது எது பொருத்தமானது?',
    options: [
      'உங்கள் விண்ணப்பத்தை விரைவில் அனுமதிக்க வேண்டும் என்று நாங்கள் விரும்புகிறோம்.',
      'உங்கள் விண்ணப்பத்திற்கு உடனடியாக அனுமதி அளிக்கும்படி தயவுசெய்து கோருகிறோம்.'
    ]
  },
  e2: {
    text: 'ஒரு ஆற்றுநர் நிலுவையில் இருக்கும் தொடக்கத்தை பின்தொடர விரும்புகிறான். எது பொருத்தமானது?',
    options: [
      'மாண்புமிகு அமைச்சு இணைப்பு சான்றிதழ் வழங்குமானால் நாங்கள் பெருமை கொள்வோம்...',
      'எதற்காக இன்னும் பதில் அளிக்கவில்லை? உடனுக்குடன் பதில் அனுப்புங்கள்.'
    ]
  },
  e3: {
    text: 'தொலைநோக்கு கண்ணாடி போல வேலை செய்வது, தொலைவில் உள்ள பொருள்களின் அளவை ____.',
    options: ['இது ஒரு தொலைநோக்கு லென்ஸைப் பெருக்குகிறது', 'ஒரு தொலைநோக்கு லென்ஸ் பெருக்குகிறது', 'ஒரு தொலைநோக்கு லென்ஸ் இது பெருக்குகிறது', 'மற்றும் பெருக்கி ஒரு தொலைநோக்கு லென்ஸை']
  },
  e4: {
    text: 'கவலைப்பட வேண்டாம், நீங்கள் வீடு வந்து கொண்டிருக்கும் போது நான் உணவு செய்ய ___.',
    options: ['வந்தேன்/செய்வேன்', 'வந்திருக்கிறேன்/செய்திருக்கலாம்', 'வந்து/செய்துவிட்டேன்', 'வந்தேன்/செய்தேன்']
  },
  e5: {
    text: 'இதன் வளர்ச்சியின் போது, ஆமை ஒரு உண்மையான மாற்றத்தைக் கொண்டுள்ளது ____ “மூன் போன்ற உயிரணுக் கட்டம்” உடன்.',
    options: ['தொடக்கம்', 'முதலில்', 'தொடக்கமாக', 'தொடக்கம் செய்யப்பட்டது']
  },
  a1: {
    text: 'Rs. 1,20,000 செலவுக்கு மற்றும் 20% விற்பனை லாபத்திற்கு, வர்த்தக தள்ளுபடி 10% மற்றும் வரிசு தள்ளுபடி 5% செய்யும் போது நிகரக் கடன் பெறுமதி எவ்வளவு?',
    options: ['Rs. 14,400; Rs. 6480; மற்றும் Rs. 1,23,120', 'Rs. 14,400; Rs. 6750; மற்றும் Rs. 1,22,850', 'Rs. 15,000; Rs. 6480; மற்றும் Rs. 1,28,520', 'Rs. 15,000; Rs. 6750; மற்றும் Rs. 1,28,250']
  },
  a2: {
    text: 'ஒரு நிறுவனம் 2000 பங்குகளை விலக்கி விட்டது... மூலதன நிதியகத்தில் எவ்வளவு சேமிக்க வேண்டும்?',
    options: ['Rs. 1500 மற்றும் Rs. 2000', 'Rs. 2500 மற்றும் Rs. 1500', 'Rs. 2000 மற்றும் Rs. 2500', 'Rs. 1500 மற்றும் Rs. 2500']
  },
  a3: {
    text: 'திறப்பு நகை = ₹30,000, வாங்கல்கள் = ₹1,00,000, மூடுதல் நகை = ₹20,000 என்றால் பொருள் விற்பனைக் கட்டனம் =?',
    options: ['₹1,10,000', '₹90,000', '₹1,20,000', '₹1,50,000']
  },
  a4: {
    text: 'பொருள் திரிபுத்தன்மை அதிகமானால் அது என்னக் குறிக்கிறது?',
    options: ['பொருள் மெதுவாக நகர்கிறது', 'பொருள் மேலாண்மையில் திறமை', 'வணிக இழப்பு', 'அதிக செலவுகள்']
  },
  a5: {
    text: 'சராசரி உங்கள் பொருள் மொத்தம் அதிகரிக்குமா?',
    options: ['மூடுதல் கையிருப்பு அதிகரிக்கின்', 'திறப்பு கையிருப்பு குறைவின்', 'இரண்டும் (a) மற்றும் (b)', 'இல்லை']
  },
  co1: {
    text: 'கையிருப்பு மாற்றம் விகிதம் 4 என்றால், 360 நாடுகளில் கையிருப்பு மாற்ற காலம் என்ன?',
    options: ['120 நாட்கள்', '45 நாட்கள்', '90 நாட்கள்', '180 நாட்கள்']
  },
  co2: {
    text: 'கையிருப்பு மாற்ற காலநீதி சூத்திரம் என்ன?',
    options: ['கையிருப்பு மாற்ற விகிதம் / ஒரு வருடம் நாட்கள்', 'ஒரு வருடம் நாட்கள் / கையிருப்பு மாற்ற விகிதம்', 'கையிருப்பு மாற்ற விகிதம் x ஒரு வருடம் நாட்கள்', 'கையிருப்பு மாற்ற விகிதம் + ஒரு வருடம் நாட்கள்']
  },
  co3: {
    text: 'பிழையான செலவுகளில் கீழ்காணுதல் எது?',
    options: ['வாடகை', 'சம்பளம்', 'நேரடி பொருள்', 'காப்பீடு']
  },
  co4: {
    text: 'தீர்கால புள்ளி எப்போது ஏற்படும்?',
    options: ['லைப்ஸ் அதிகபடும்', 'இழப்பு குறைந்தால்', 'மொத்த செலவு = மொத்த வருவாய்', 'விற்பனை பூஜ்யம்']
  },
  co5: {
    text: 'செலவு கட்டுப்பாடு மற்றும் செலவு குறைப்பு எந்த முறை பயன்படுத்தப்படுகிறது?',
    options: ['நிதி கணக்கியல்', 'செலவு கணக்கியல்', 'புத்தகப் பதிவு', 'ஆடிட்']
  },
  m1: {
    text: 'ஒரு பையின் உள்ளே 3 சிவப்பு பந்து மற்றும் 2 நீல பந்து உள்ளது. சிவப்பு பந்து எடுக்கும் சாத்தியம் எவ்வளவு?',
    options: ['2/5', '3/5', '1/5', '4/5']
  },
  m2: {
    text: 'ஒரு பட்டியலிலிருந்து ஒவ்வொரு 5வது பொருளையும் தேர்வு செய்வது என்னவாக அழைக்கப்படுகிறது?',
    options: ['சீரற்ற எடுத்துக்காட்டுதல்', 'படிவாக்கிய எடுத்துக்காட்டுதல்', 'அமைப்புச் சீர்நிலை எடுத்துக்காட்டுதல்', 'குழு எடுத்துக்காட்டுதல்']
  },
  m3: {
    text: 'ஒரு மாதிரி என்ன?',
    options: ['முழு மக்கள் தொகை', 'பயன்பாட்டிற்காக தேர்வு செய்யப்பட்ட ஒரு பகுதி', 'எழுத்து தரவு மட்டுமே', 'நிகழ்வு சூத்திரம்']
  },
  m4: {
    text: 'தொகுதித் தனிமையில் அளவுரு எது?',
    options: ['சாதாரணம்', 'நடுத்தரம்', 'முறை', 'தரவு தாக்கம்']
  },
  m5: {
    text: 'ஒரு வேறுபாட்டு சமன்பாடு என்ன?',
    options: ['மாங்கள் நிரந்தரங்கள் மட்டுமே', 'மாறிலிகள் மட்டுமே', 'மாறிலிகள் மற்றும் அவற்றின் உடலநிலைகள்', 'ஆல்ஜெபிரா சொற்கள் மட்டுமே']
  },
  ec1: {
    text: '2047க்குள் இந்தியாவின் GDP மதிப்பு என்ன என்று நீங்கள் நினைக்கிறீர்கள்?',
    options: ['1 டிரில்லியன் டொலர்', '50 டிரில்லியன் டொலர்', '100 டிரில்லியன் டொலர்']
  },
  ec2: {
    text: 'உலக வர்த்தக அமைப்பு எந்த ஆண்டில் நிறுவப்பட்டது?',
    options: ['2005', '1991', '1995']
  },
  ec3: {
    text: 'பின்வரும் துறையில் வெளிநாட்டு நேரடி முதலீடு அனுமதிக்கப்படாது?',
    options: ['தொடர்பாடல்', 'மருத்துவச்சிகிச்சை', 'ஆட்டோம் சக்தி', 'மயமான மற்றும் சுற்றுலா']
  },
  ec4: {
    text: '1987 உலக சுற்றுச்சூழல் மற்றும் வளர்ச்சி கமிஷன் “திட்டமிடல் வளர்ச்சி” யை எப்படி வரையறுத்தது?',
    options: ['அறிவு தேவைகளை மீறிக்கொண்டே ஆட்சி பெறுதல்', 'தற்போதைய வளர்ச்சிக்காக கடந்த வளங்களை பயன்படுத்துவது', 'இறுதி தேவைகளை பாதிக்காமல் தற்போதைய தேவைகளை பூர்த்தி செய்தல்', 'குறைந்து வரும் இயற்கை வளங்களை மட்டும் கவனிக்கும்']
  },
  ec5: {
    text: 'WTO TRIPs கீழ், காப்புரிமைகள் தொடர்பாக எந்த அடிப்படை மாற்றம் அறிமுகப்படுத்தப்பட்டது?',
    options: ['தயாரிப்பு காப்புரிமைகளுக்கு பதிலாக செயல்முறை காப்புரிமைகள்', 'செயல்முறை காப்புரிமைகளுக்கு பதிலாக தயாரிப்பு காப்புரிமைகள்', 'LCD களை முழுமையாக விதிமுறைகளிலிருந்து விலக்கு', 'படைக்கோப்பு உரிமை மற்றும் வர்த்தகக் குறிச்சொற்களுக்கு மட்டுமே வரம்பு']
  }
};
