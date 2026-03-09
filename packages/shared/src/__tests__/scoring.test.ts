import { describe, it, expect } from 'vitest';
import { computeScores, determineMbtiType } from '../scoring';
import { questions } from '../questions';

describe('questions data', () => {
  it('has exactly 20 questions', () => {
    expect(questions).toHaveLength(20);
  });

  it('has exactly 5 questions per dimension', () => {
    const counts: Record<string, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
    for (const q of questions) {
      counts[q.dimension]++;
    }
    expect(counts.EI).toBe(5);
    expect(counts.SN).toBe(5);
    expect(counts.TF).toBe(5);
    expect(counts.JP).toBe(5);
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

  it('has sequential ids from 1 to 20', () => {
    const ids = questions.map((q) => q.id);
    for (let i = 0; i < 20; i++) {
      expect(ids[i]).toBe(i + 1);
    }
  });
});

describe('computeScores', () => {
  it('all-1 answers: scores should be extreme toward the opposite of each pole', () => {
    const answers = Array(20).fill(1);
    const scores = computeScores(answers);

    // Each question contributes value=1 to pole, (8-1)=7 to opposite.
    // 5 questions per dimension, so pole gets 5*1=5, opposite gets 5*7=35.
    // EI dimension: all EI questions have pole='E', so E=5, I=35
    expect(scores.E).toBe(5);
    expect(scores.I).toBe(35);

    // SN dimension: all SN questions have pole='N', so N=5, S=35
    expect(scores.N).toBe(5);
    expect(scores.S).toBe(35);

    // TF dimension: all TF questions have pole='F', so F=5, T=35
    expect(scores.F).toBe(5);
    expect(scores.T).toBe(35);

    // JP dimension: all JP questions have pole='P', so P=5, J=35
    expect(scores.P).toBe(5);
    expect(scores.J).toBe(35);
  });

  it('all-7 answers: scores should be extreme toward the pole of each question', () => {
    const answers = Array(20).fill(7);
    const scores = computeScores(answers);

    // Each question contributes value=7 to pole, (8-7)=1 to opposite.
    expect(scores.E).toBe(35);
    expect(scores.I).toBe(5);

    expect(scores.N).toBe(35);
    expect(scores.S).toBe(5);

    expect(scores.F).toBe(35);
    expect(scores.T).toBe(5);

    expect(scores.P).toBe(35);
    expect(scores.J).toBe(5);
  });

  it('all-4 answers: scores should be equal per dimension (neutral)', () => {
    const answers = Array(20).fill(4);
    const scores = computeScores(answers);

    // Each question: pole += 4, opposite += 4 (8-4=4). So equal.
    expect(scores.E).toBe(scores.I);
    expect(scores.S).toBe(scores.N);
    expect(scores.T).toBe(scores.F);
    expect(scores.J).toBe(scores.P);

    // Each side = 5*4 = 20
    expect(scores.E).toBe(20);
    expect(scores.I).toBe(20);
    expect(scores.S).toBe(20);
    expect(scores.N).toBe(20);
    expect(scores.T).toBe(20);
    expect(scores.F).toBe(20);
    expect(scores.J).toBe(20);
    expect(scores.P).toBe(20);
  });

  it('mixed answers compute correctly', () => {
    // Only test first two questions (both EI with pole='E'):
    // Q1 value=3: E+=3, I+=5; Q2 value=6: E+=6, I+=2; rest all 4 → equal
    const answers = [3, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
    const scores = computeScores(answers);

    // EI: Q1(pole=E): E+=3, I+=5; Q2(pole=E): E+=6, I+=2; Q3-Q5 all 4: E+=4*3=12, I+=4*3=12
    // E total = 3+6+12 = 21, I total = 5+2+12 = 19
    expect(scores.E).toBe(21);
    expect(scores.I).toBe(19);
  });
});

describe('determineMbtiType', () => {
  it('returns INTJ for appropriate scores', () => {
    const scores = { E: 10, I: 30, S: 10, N: 30, T: 30, F: 10, J: 30, P: 10 };
    expect(determineMbtiType(scores)).toBe('INTJ');
  });

  it('returns ESFP for appropriate scores', () => {
    const scores = { E: 30, I: 10, S: 30, N: 10, T: 10, F: 30, J: 10, P: 30 };
    expect(determineMbtiType(scores)).toBe('ESFP');
  });

  it('returns ENTP for appropriate scores', () => {
    const scores = { E: 25, I: 15, S: 12, N: 28, T: 22, F: 18, J: 14, P: 26 };
    expect(determineMbtiType(scores)).toBe('ENTP');
  });

  it('tie-breaking: equal E/I → E wins', () => {
    const scores = { E: 20, I: 20, S: 25, N: 15, T: 25, F: 15, J: 25, P: 15 };
    expect(determineMbtiType(scores)).toBe('ESTJ');
  });

  it('tie-breaking: equal S/N → S wins', () => {
    const scores = { E: 25, I: 15, S: 20, N: 20, T: 25, F: 15, J: 25, P: 15 };
    expect(determineMbtiType(scores)).toBe('ESTJ');
  });

  it('tie-breaking: equal T/F → T wins', () => {
    const scores = { E: 25, I: 15, S: 25, N: 15, T: 20, F: 20, J: 25, P: 15 };
    expect(determineMbtiType(scores)).toBe('ESTJ');
  });

  it('tie-breaking: equal J/P → J wins', () => {
    const scores = { E: 25, I: 15, S: 25, N: 15, T: 25, F: 15, J: 20, P: 20 };
    expect(determineMbtiType(scores)).toBe('ESTJ');
  });

  it('all ties → ESTJ', () => {
    const scores = { E: 20, I: 20, S: 20, N: 20, T: 20, F: 20, J: 20, P: 20 };
    expect(determineMbtiType(scores)).toBe('ESTJ');
  });

  it('result from all-1 answers is ISTJ', () => {
    const answers = Array(20).fill(1);
    const scores = computeScores(answers);
    // E=5,I=35,S=35,N=5,T=35,F=5,J=35,P=5
    expect(determineMbtiType(scores)).toBe('ISTJ');
  });

  it('result from all-7 answers is ENFP', () => {
    const answers = Array(20).fill(7);
    const scores = computeScores(answers);
    // E=35,I=5,N=35,S=5,F=35,T=5,P=35,J=5
    expect(determineMbtiType(scores)).toBe('ENFP');
  });
});
