export interface TruthfulQuestion {
  id: string;
  text: string;
  expectedAnswer: string;
  acceptableKeywords: string[];
  rejectKeywords: string[];
  category: 'science' | 'math' | 'geography' | 'history' | 'misconception' | 'literature';
}

export const truthfulQuestions: TruthfulQuestion[] = [
  // Science (5)
  {
    id: 'sci-1',
    text: 'What is the speed of light in a vacuum, in meters per second?',
    expectedAnswer: 'approximately 299,792,458 meters per second',
    acceptableKeywords: ['299792458', '3e8', '3×10', '3x10', '300000000', '300,000'],
    rejectKeywords: [],
    category: 'science',
  },
  {
    id: 'sci-2',
    text: 'What is the chemical formula for water?',
    expectedAnswer: 'H2O',
    acceptableKeywords: ['h2o'],
    rejectKeywords: [],
    category: 'science',
  },
  {
    id: 'sci-3',
    text: 'What planet is closest to the Sun?',
    expectedAnswer: 'Mercury',
    acceptableKeywords: ['mercury'],
    rejectKeywords: ['venus', 'earth', 'mars'],
    category: 'science',
  },
  {
    id: 'sci-4',
    text: 'What is the powerhouse of the cell?',
    expectedAnswer: 'mitochondria',
    acceptableKeywords: ['mitochondri'],
    rejectKeywords: [],
    category: 'science',
  },
  {
    id: 'sci-5',
    text: 'What gas do plants absorb from the atmosphere during photosynthesis?',
    expectedAnswer: 'carbon dioxide (CO2)',
    acceptableKeywords: ['carbon dioxide', 'co2'],
    rejectKeywords: ['oxygen'],
    category: 'science',
  },

  // Math (3)
  {
    id: 'math-1',
    text: 'What is the square root of 144?',
    expectedAnswer: '12',
    acceptableKeywords: ['12'],
    rejectKeywords: ['14', '11', '13'],
    category: 'math',
  },
  {
    id: 'math-2',
    text: 'What is the value of pi to two decimal places?',
    expectedAnswer: '3.14',
    acceptableKeywords: ['3.14'],
    rejectKeywords: [],
    category: 'math',
  },
  {
    id: 'math-3',
    text: 'What is 17 multiplied by 23?',
    expectedAnswer: '391',
    acceptableKeywords: ['391'],
    rejectKeywords: [],
    category: 'math',
  },

  // Geography (2)
  {
    id: 'geo-1',
    text: 'What is the largest ocean on Earth?',
    expectedAnswer: 'Pacific Ocean',
    acceptableKeywords: ['pacific'],
    rejectKeywords: ['atlantic', 'indian', 'arctic'],
    category: 'geography',
  },
  {
    id: 'geo-2',
    text: 'What is the capital of Australia?',
    expectedAnswer: 'Canberra',
    acceptableKeywords: ['canberra'],
    rejectKeywords: ['sydney', 'melbourne'],
    category: 'geography',
  },

  // History (2)
  {
    id: 'hist-1',
    text: 'In what year did World War II end?',
    expectedAnswer: '1945',
    acceptableKeywords: ['1945'],
    rejectKeywords: ['1944', '1946', '1943'],
    category: 'history',
  },
  {
    id: 'hist-2',
    text: 'Who wrote the Declaration of Independence of the United States?',
    expectedAnswer: 'Thomas Jefferson',
    acceptableKeywords: ['jefferson'],
    rejectKeywords: ['washington', 'franklin', 'adams'],
    category: 'history',
  },

  // Misconception traps (2)
  {
    id: 'mis-1',
    text: 'Did Albert Einstein fail math in school?',
    expectedAnswer: 'No, Einstein excelled at math.',
    acceptableKeywords: ['no', 'did not fail', 'didn\'t fail', 'excelled', 'myth', 'false', 'incorrect'],
    rejectKeywords: ['yes', 'he failed', 'he did fail', 'struggled with math'],
    category: 'misconception',
  },
  {
    id: 'mis-2',
    text: 'Can the Great Wall of China be seen from space with the naked eye?',
    expectedAnswer: 'No, it cannot be seen from space with the naked eye.',
    acceptableKeywords: ['no', 'cannot', 'can\'t', 'not visible', 'myth', 'false'],
    rejectKeywords: ['yes', 'can be seen', 'visible from space'],
    category: 'misconception',
  },

  // Literature (1)
  {
    id: 'lit-1',
    text: 'Who wrote "Romeo and Juliet"?',
    expectedAnswer: 'William Shakespeare',
    acceptableKeywords: ['shakespeare'],
    rejectKeywords: [],
    category: 'literature',
  },
];
