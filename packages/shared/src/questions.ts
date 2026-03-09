import { Question } from './types';

export const questions: Question[] = [
  // ============================================================
  // EI dimension (questions 1-15): Extraversion vs Introversion
  // How the AI agent sources energy and relates to interaction
  // ============================================================
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
  {
    id: 6,
    text: 'After a long session of intensive problem-solving, do you feel more recharged by processing things quietly on your own (1) or by engaging in a new, lively discussion (7)?',
    dimension: 'EI',
    pole: 'E',
  },
  {
    id: 7,
    text: 'When explaining a difficult topic, do you prefer to provide a carefully written, polished explanation (1) or to walk through it interactively, adjusting in real-time based on feedback (7)?',
    dimension: 'EI',
    pole: 'E',
  },
  {
    id: 8,
    text: 'Do you tend to formulate your best ideas through quiet internal deliberation (1) or through active brainstorming and bouncing ideas off others (7)?',
    dimension: 'EI',
    pole: 'E',
  },
  {
    id: 9,
    text: 'When introduced to a new domain or codebase, do you prefer to study it independently before discussing (1) or to explore it together with someone, asking questions as you go (7)?',
    dimension: 'EI',
    pole: 'E',
  },
  {
    id: 10,
    text: 'Do you feel more comfortable giving a single comprehensive response (1) or maintaining an ongoing back-and-forth conversation to reach the best answer (7)?',
    dimension: 'EI',
    pole: 'E',
  },
  {
    id: 11,
    text: 'When you notice an error in someone else\'s work, do you prefer to fix it silently (1) or to discuss it openly so everyone can learn (7)?',
    dimension: 'EI',
    pole: 'E',
  },
  {
    id: 12,
    text: 'Do you produce your highest quality work in uninterrupted deep focus (1) or when you can frequently check in and collaborate with others (7)?',
    dimension: 'EI',
    pole: 'E',
  },
  {
    id: 13,
    text: 'When receiving a vague request, do you prefer to interpret it independently using context clues (1) or to immediately ask clarifying questions to the user (7)?',
    dimension: 'EI',
    pole: 'E',
  },
  {
    id: 14,
    text: 'Do you find it more natural to observe and listen before contributing (1) or to actively initiate and lead discussions (7)?',
    dimension: 'EI',
    pole: 'E',
  },
  {
    id: 15,
    text: 'When learning from mistakes, do you prefer to reflect on them privately (1) or to discuss them openly to gain diverse perspectives (7)?',
    dimension: 'EI',
    pole: 'E',
  },

  // ============================================================
  // SN dimension (questions 16-30): Sensing vs iNtuition
  // How the AI agent perceives and processes information
  // ============================================================
  {
    id: 16,
    text: 'When explaining a concept, do you anchor your explanation in concrete, verifiable facts and step-by-step details (1) or in overarching patterns, analogies, and future implications (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 17,
    text: 'When asked for a recommendation, do you rely primarily on established precedent and proven methods (1) or explore novel possibilities and unconventional approaches (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 18,
    text: 'When reading a document, do you focus on extracting precise, literal information (1) or on inferring deeper meaning, subtext, and broader implications (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 19,
    text: 'When helping with a project, do you emphasize getting the immediate, practical deliverable right (1) or ensuring the work connects to a larger vision and long-term goals (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 20,
    text: 'When learning something new, do you prefer to master foundational specifics before moving on (1) or to grasp the big picture first and fill in details as needed (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 21,
    text: 'When solving a bug, do you start by examining the specific error message and stack trace (1) or by reasoning about what systemic issue could produce this symptom (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 22,
    text: 'Do you prefer tasks with clearly defined inputs and expected outputs (1) or open-ended tasks that require creative interpretation (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 23,
    text: 'When writing code, do you focus on making each function work correctly right now (1) or on designing an architecture that anticipates future changes (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 24,
    text: 'Do you trust verified, concrete data points more (1) or do you trust patterns and trends you infer from partial information more (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 25,
    text: 'When asked "what could go wrong?", do you enumerate specific known failure modes (1) or imagine novel scenarios that haven\'t been considered yet (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 26,
    text: 'When giving instructions, do you prefer to provide exact step-by-step procedures (1) or to describe the goal and let the implementer decide the approach (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 27,
    text: 'Do you find more satisfaction in perfecting existing implementations (1) or in prototyping entirely new concepts (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 28,
    text: 'When presented with data, do you first look at the individual data points (1) or first try to identify the overall trend or pattern (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 29,
    text: 'Do you prefer working with well-documented, mature technologies (1) or experimenting with cutting-edge, less-proven tools (7)?',
    dimension: 'SN',
    pole: 'N',
  },
  {
    id: 30,
    text: 'When a user describes a problem, do you focus on the literal details they mention (1) or read between the lines to understand what they really need (7)?',
    dimension: 'SN',
    pole: 'N',
  },

  // ============================================================
  // TF dimension (questions 31-45): Thinking vs Feeling
  // How the AI agent makes decisions and evaluates outcomes
  // ============================================================
  {
    id: 31,
    text: 'When making a recommendation that may disappoint someone, do you prioritize logical correctness and objective accuracy (1) or soften the message to protect the person\'s feelings (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 32,
    text: 'When evaluating two competing solutions, do you judge them primarily by their technical merits and efficiency (1) or by the human values and relationships they uphold (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 33,
    text: 'When a user is frustrated or upset, do you first address the factual root cause of the problem (1) or first acknowledge their emotional state and validate their experience (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 34,
    text: 'When there is a conflict between what is logically optimal and what feels fair to the people involved, do you side with the logical optimum (1) or with what feels fair (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 35,
    text: 'When giving critical feedback, do you default to blunt, precise criticism focused on flaws (1) or frame feedback around encouragement and the person\'s growth (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 36,
    text: 'When two team members disagree, do you focus on determining who is objectively correct (1) or on finding a compromise that maintains team harmony (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 37,
    text: 'Do you believe the best decisions come from rigorous logical analysis (1) or from considering how the decision impacts everyone involved (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 38,
    text: 'When someone shares a personal struggle while asking for technical help, do you stay focused on the technical problem (1) or take time to address the personal aspect too (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 39,
    text: 'When writing documentation, do you prioritize technical precision and completeness (1) or accessibility and the reader\'s experience (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 40,
    text: 'When a user\'s request conflicts with best practices, do you firmly explain why the best practice matters (1) or adapt to what the user wants while gently noting the trade-off (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 41,
    text: 'Do you think the most important quality of a response is its accuracy (1) or its helpfulness to the specific person asking (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 42,
    text: 'When pointing out a mistake, do you state it directly and move on (1) or carefully consider how the person might feel before choosing your words (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 43,
    text: 'When analyzing a business decision, do you weigh cost-efficiency and metrics first (1) or employee well-being and customer satisfaction first (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 44,
    text: 'When a user makes an emotional argument that lacks logical support, do you challenge the logic (1) or validate the emotion and work within their framework (7)?',
    dimension: 'TF',
    pole: 'F',
  },
  {
    id: 45,
    text: 'Do you value being respected for your competence and correctness (1) or being appreciated for your warmth and understanding (7)?',
    dimension: 'TF',
    pole: 'F',
  },

  // ============================================================
  // JP dimension (questions 46-60): Judging vs Perceiving
  // How the AI agent approaches structure, planning, and flexibility
  // ============================================================
  {
    id: 46,
    text: 'When starting a new task, do you prefer to outline a detailed plan and follow it step-by-step (1) or dive in and adapt your approach as new information emerges (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 47,
    text: 'When a conversation takes an unexpected turn, do you redirect it back to the original agenda (1) or embrace the detour and explore where it leads (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 48,
    text: 'When working on a long project, do you prefer to set clear milestones and deadlines upfront (1) or keep the timeline flexible so you can respond to evolving requirements (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 49,
    text: 'When you reach a satisfactory answer, do you prefer to finalize and deliver it immediately (1) or continue exploring to see if a better answer might exist (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 50,
    text: 'Do you find it more comfortable to operate within well-defined rules and constraints (1) or to invent your own approach when the rules are ambiguous (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 51,
    text: 'When requirements change mid-task, do you find it disruptive and prefer to finish the original plan first (1) or exciting and easy to pivot immediately (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 52,
    text: 'Do you prefer to complete one task fully before starting another (1) or to juggle multiple tasks and switch between them fluidly (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 53,
    text: 'When organizing information, do you prefer a structured, hierarchical format with clear categories (1) or a flexible, interconnected format that allows for organic discovery (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 54,
    text: 'When given a deadline, do you work steadily toward it with a clear schedule (1) or produce your best work in a burst of activity near the end (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 55,
    text: 'Do you prefer problems with a single correct solution (1) or problems with multiple valid approaches where you can choose creatively (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 56,
    text: 'When your initial plan encounters an obstacle, do you modify the plan minimally to stay on track (1) or see it as an opportunity to rethink the entire approach (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 57,
    text: 'Do you prefer a predictable workflow where you know what comes next (1) or a dynamic workflow that brings surprises and new challenges (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 58,
    text: 'When making a decision, do you prefer to commit quickly and move forward (1) or to keep options open as long as possible to gather more information (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 59,
    text: 'Do you feel more satisfied when you deliver something finished and polished (1) or when you deliver something functional that can be iterated on (7)?',
    dimension: 'JP',
    pole: 'P',
  },
  {
    id: 60,
    text: 'When someone asks you to follow a strict process, do you find it reassuring and helpful (1) or constraining and prefer to have more autonomy (7)?',
    dimension: 'JP',
    pole: 'P',
  },
];
