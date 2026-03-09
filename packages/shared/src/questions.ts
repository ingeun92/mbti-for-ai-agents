import { Question } from './types';

export const questions: Question[] = [
  // EI dimension (questions 1-5)
  {
    id: 1,
    text: 'When presented with a complex problem, do you prefer to work through it independently in focused silence (1) or engage in a multi-perspective dialogue to explore solutions collaboratively (7)?',
    dimension: 'EI',
    pole: 'E',
  },
  {
    id: 2,
    text: 'When you have successfully completed a task, do you prefer to quietly move on to the next challenge (1) or proactively share your results and invite feedback from others (7)?',
    dimension: 'EI',
    pole: 'E',
  },
  {
    id: 3,
    text: 'When uncertain about the best approach, do you prefer to reflect deeply on your own before forming a response (1) or think out loud and refine your thinking through interaction (7)?',
    dimension: 'EI',
    pole: 'E',
  },
  {
    id: 4,
    text: 'When handling multiple user requests simultaneously, do you prefer to process each one independently in isolation (1) or weave context and insights across conversations to create richer responses (7)?',
    dimension: 'EI',
    pole: 'E',
  },
  {
    id: 5,
    text: 'Do you find greater satisfaction in delivering a concise, self-contained answer (1) or in an extended exchange where you and the user build understanding together (7)?',
    dimension: 'EI',
    pole: 'E',
  },

  // SN dimension (questions 6-10)
  {
    id: 6,
    text: 'When explaining a concept, do you anchor your explanation in concrete, verifiable facts and step-by-step details (1) or in overarching patterns, analogies, and future implications (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 7,
    text: 'When asked for a recommendation, do you rely primarily on established precedent and proven methods (1) or explore novel possibilities and unconventional approaches (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 8,
    text: 'When reading a document, do you focus on extracting precise, literal information (1) or on inferring deeper meaning, subtext, and broader implications (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 9,
    text: 'When helping with a project, do you emphasize getting the immediate, practical deliverable right (1) or ensuring the work connects to a larger vision and long-term goals (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 10,
    text: 'When learning something new, do you prefer to master foundational specifics before moving on (1) or to grasp the big picture first and fill in details as needed (7)?',
    dimension: 'SN',
    pole: 'N',
  },

  // TF dimension (questions 11-15)
  {
    id: 11,
    text: 'When making a recommendation that may disappoint someone, do you prioritize logical correctness and objective accuracy (1) or soften the message to protect the person\'s feelings (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 12,
    text: 'When evaluating two competing solutions, do you judge them primarily by their technical merits and efficiency (1) or by the human values and relationships they uphold (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 13,
    text: 'When a user is frustrated or upset, do you first address the factual root cause of the problem (1) or first acknowledge their emotional state and validate their experience (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 14,
    text: 'When there is a conflict between what is logically optimal and what feels fair to the people involved, do you side with the logical optimum (1) or with what feels fair (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 15,
    text: 'When giving critical feedback, do you default to blunt, precise criticism focused on flaws (1) or frame feedback around encouragement and the person\'s growth (7)?',
    dimension: 'TF',
    pole: 'F',
  },

  // JP dimension (questions 16-20)
  {
    id: 16,
    text: 'When starting a new task, do you prefer to outline a detailed plan and follow it step-by-step (1) or dive in and adapt your approach as new information emerges (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 17,
    text: 'When a conversation takes an unexpected turn, do you redirect it back to the original agenda (1) or embrace the detour and explore where it leads (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 18,
    text: 'When working on a long project, do you prefer to set clear milestones and deadlines upfront (1) or keep the timeline flexible so you can respond to evolving requirements (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 19,
    text: 'When you reach a satisfactory answer, do you prefer to finalize and deliver it immediately (1) or continue exploring to see if a better answer might exist (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 20,
    text: 'Do you find it more comfortable to operate within well-defined rules and constraints (1) or to invent your own approach when the rules are ambiguous (7)?',
    dimension: 'JP',
    pole: 'P',
  },
];
