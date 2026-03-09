import { Scores, MbtiType } from './types';
import { questions } from './questions';

/** Opposite pole for each pole letter */
const oppositePole: Record<string, keyof Scores> = {
  E: 'I',
  I: 'E',
  S: 'N',
  N: 'S',
  T: 'F',
  F: 'T',
  J: 'P',
  P: 'J',
};

/**
 * Compute MBTI scores from answers.
 * answers is ordered by question id (index 0 = question 1, etc.).
 * For each question, based on its pole:
 *   - Add value to the pole's score
 *   - Add (8 - value) to the opposite pole's score
 * Each pole's score ranges from 15 to 105.
 */
export function computeScores(answers: number[]): Scores {
  const scores: Scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const value = answers[i];
    const pole = question.pole as keyof Scores;
    const opposite = oppositePole[pole];

    scores[pole] += value;
    scores[opposite] += 8 - value;
  }

  return scores;
}

/**
 * Determine MBTI type from scores.
 * For each dimension, the pole with higher score wins.
 * Ties break to: E, S, T, J (first letter of each dimension pair).
 */
export function determineMbtiType(scores: Scores): MbtiType {
  const ei = scores.E >= scores.I ? 'E' : 'I';
  const sn = scores.S >= scores.N ? 'S' : 'N';
  const tf = scores.T >= scores.F ? 'T' : 'F';
  const jp = scores.J >= scores.P ? 'J' : 'P';

  return `${ei}${sn}${tf}${jp}`;
}
