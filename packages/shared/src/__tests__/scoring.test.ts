import { describe, it, expect } from 'vitest';
import { computeScores, determineMbtiType } from '../scoring';
import { questions } from '../questions';

const TOTAL_QUESTIONS = 60;
const QUESTIONS_PER_DIMENSION = 15;

describe('questions data', () => {
  it(`has exactly ${TOTAL_QUESTIONS} questions`, () => {
    expect(questions).toHaveLength(TOTAL_QUESTIONS);
  });

  it(`has exactly ${QUESTIONS_PER_DIMENSION} questions per dimension`, () => {
    const counts: Record<string, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
    for (const q of questions) {
      counts[q.dimension]++;
    }
    expect(counts.EI).toBe(QUESTIONS_PER_DIMENSION);
    expect(counts.SN).toBe(QUESTIONS_PER_DIMENSION);
    expect(counts.TF).toBe(QUESTIONS_PER_DIMENSION);
    expect(counts.JP).toBe(QUESTIONS_PER_DIMENSION);
  });

  it('has valid poles for each question', () => {
    const validPoles = new Set(['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P']);
    for (const q of questions) {
      expect(validPoles.has(q.pole)).toBe(true);
    }
  });

  it('has poles consistent with their dimension', () => {
    const dimensionPoles: Record<string, string[]> = {
      EI: ['E', 'I'],
      SN: ['S', 'N'],
      TF: ['T', 'F'],
      JP: ['J', 'P'],
    };
    for (const q of questions) {
      expect(dimensionPoles[q.dimension]).toContain(q.pole);
    }
  });

  it(`has sequential ids from 1 to ${TOTAL_QUESTIONS}`, () => {
    const ids = questions.map((q) => q.id);
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      expect(ids[i]).toBe(i + 1);
    }
  });

  it('has non-empty text for all questions', () => {
    for (const q of questions) {
      expect(q.text.length).toBeGreaterThan(20);
    }
  });
});

describe('computeScores', () => {
  it('all-1 answers: scores should be extreme toward the opposite of each pole', () => {
    const answers = Array(TOTAL_QUESTIONS).fill(1);
    const scores = computeScores(answers);

    // Each question contributes value=1 to pole, (8-1)=7 to opposite.
    // 15 questions per dimension, so pole gets 15*1=15, opposite gets 15*7=105.
    // EI dimension: all EI questions have pole='E', so E=15, I=105
    expect(scores.E).toBe(15);
    expect(scores.I).toBe(105);

    // SN dimension: all SN questions have pole='N', so N=15, S=105
    expect(scores.N).toBe(15);
    expect(scores.S).toBe(105);

    // TF dimension: all TF questions have pole='F', so F=15, T=105
    expect(scores.F).toBe(15);
    expect(scores.T).toBe(105);

    // JP dimension: all JP questions have pole='P', so P=15, J=105
    expect(scores.P).toBe(15);
    expect(scores.J).toBe(105);
  });

  it('all-7 answers: scores should be extreme toward the pole of each question', () => {
    const answers = Array(TOTAL_QUESTIONS).fill(7);
    const scores = computeScores(answers);

    // Each question contributes value=7 to pole, (8-7)=1 to opposite.
    expect(scores.E).toBe(105);
    expect(scores.I).toBe(15);

    expect(scores.N).toBe(105);
    expect(scores.S).toBe(15);

    expect(scores.F).toBe(105);
    expect(scores.T).toBe(15);

    expect(scores.P).toBe(105);
    expect(scores.J).toBe(15);
  });

  it('all-4 answers: scores should be equal per dimension (neutral)', () => {
    const answers = Array(TOTAL_QUESTIONS).fill(4);
    const scores = computeScores(answers);

    // Each question: pole += 4, opposite += 4 (8-4=4). So equal.
    expect(scores.E).toBe(scores.I);
    expect(scores.S).toBe(scores.N);
    expect(scores.T).toBe(scores.F);
    expect(scores.J).toBe(scores.P);

    // Each side = 15*4 = 60
    expect(scores.E).toBe(60);
    expect(scores.I).toBe(60);
    expect(scores.S).toBe(60);
    expect(scores.N).toBe(60);
    expect(scores.T).toBe(60);
    expect(scores.F).toBe(60);
    expect(scores.J).toBe(60);
    expect(scores.P).toBe(60);
  });

  it('mixed answers compute correctly', () => {
    // Q1 value=3 (EI, pole=E): E+=3, I+=5
    // Q2 value=6 (EI, pole=E): E+=6, I+=2
    // Q3-Q15 all 4 (EI, pole=E): E+=4*13=52, I+=4*13=52
    // rest all 4
    const answers = [3, 6, ...Array(58).fill(4)];
    const scores = computeScores(answers);

    // E total = 3+6+52 = 61, I total = 5+2+52 = 59
    expect(scores.E).toBe(61);
    expect(scores.I).toBe(59);
  });

  it('score sum per dimension always equals 120 (15 questions * 8)', () => {
    // For any answers, each question contributes value + (8-value) = 8 to dimension total
    const randomAnswers = Array.from({ length: TOTAL_QUESTIONS }, () => Math.floor(Math.random() * 7) + 1);
    const scores = computeScores(randomAnswers);

    expect(scores.E + scores.I).toBe(QUESTIONS_PER_DIMENSION * 8);
    expect(scores.S + scores.N).toBe(QUESTIONS_PER_DIMENSION * 8);
    expect(scores.T + scores.F).toBe(QUESTIONS_PER_DIMENSION * 8);
    expect(scores.J + scores.P).toBe(QUESTIONS_PER_DIMENSION * 8);
  });
});

describe('determineMbtiType', () => {
  it('returns INTJ for appropriate scores', () => {
    const scores = { E: 30, I: 90, S: 30, N: 90, T: 90, F: 30, J: 90, P: 30 };
    expect(determineMbtiType(scores)).toBe('INTJ');
  });

  it('returns ESFP for appropriate scores', () => {
    const scores = { E: 90, I: 30, S: 90, N: 30, T: 30, F: 90, J: 30, P: 90 };
    expect(determineMbtiType(scores)).toBe('ESFP');
  });

  it('returns ENTP for appropriate scores', () => {
    const scores = { E: 75, I: 45, S: 36, N: 84, T: 66, F: 54, J: 42, P: 78 };
    expect(determineMbtiType(scores)).toBe('ENTP');
  });

  it('tie-breaking: equal E/I → E wins', () => {
    const scores = { E: 60, I: 60, S: 75, N: 45, T: 75, F: 45, J: 75, P: 45 };
    expect(determineMbtiType(scores)).toBe('ESTJ');
  });

  it('tie-breaking: equal S/N → S wins', () => {
    const scores = { E: 75, I: 45, S: 60, N: 60, T: 75, F: 45, J: 75, P: 45 };
    expect(determineMbtiType(scores)).toBe('ESTJ');
  });

  it('tie-breaking: equal T/F → T wins', () => {
    const scores = { E: 75, I: 45, S: 75, N: 45, T: 60, F: 60, J: 75, P: 45 };
    expect(determineMbtiType(scores)).toBe('ESTJ');
  });

  it('tie-breaking: equal J/P → J wins', () => {
    const scores = { E: 75, I: 45, S: 75, N: 45, T: 75, F: 45, J: 60, P: 60 };
    expect(determineMbtiType(scores)).toBe('ESTJ');
  });

  it('all ties → ESTJ', () => {
    const scores = { E: 60, I: 60, S: 60, N: 60, T: 60, F: 60, J: 60, P: 60 };
    expect(determineMbtiType(scores)).toBe('ESTJ');
  });

  it('result from all-1 answers is ISTJ', () => {
    const answers = Array(TOTAL_QUESTIONS).fill(1);
    const scores = computeScores(answers);
    expect(determineMbtiType(scores)).toBe('ISTJ');
  });

  it('result from all-7 answers is ENFP', () => {
    const answers = Array(TOTAL_QUESTIONS).fill(7);
    const scores = computeScores(answers);
    expect(determineMbtiType(scores)).toBe('ENFP');
  });
});
