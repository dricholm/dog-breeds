export interface QuizState {
  choices: Array<string>;
  chosenAnswer: string;
  correct: number;
  correctAnswer: string;
  errorMessage: string;
  image: string;
  loading: boolean;
  questionCount: number;
  selectedBreeds: Array<string>;
  wasCorrect: boolean;
  wrong: number;
}

export const SET_OPTIONS = 'SET_OPTIONS';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const NEXT_QUESTION_SUCCESS = 'NEXT_QUESTION_SUCCESS';
export const NEXT_QUESTION_FAIL = 'NEXT_QUESTION_FAIL';
export const ANSWER = 'ANSWER';
export const RESTART = 'RESTART';

interface SetOptionsAction {
  type: typeof SET_OPTIONS;
  payload: {
    questionCount: number;
    selectedBreeds: Array<string>;
  };
}

interface NextQuestionAction {
  type: typeof NEXT_QUESTION;
}

interface NextQuestionSuccessAction {
  type: typeof NEXT_QUESTION_SUCCESS;
  payload: {
    choices: Array<string>;
    correctAnswer: string;
    imageUrl: string;
  };
}

interface NextQuestionFailAction {
  type: typeof NEXT_QUESTION_FAIL;
  payload: {
    errorMessage: string;
  };
}

interface AnswerAction {
  type: typeof ANSWER;
  payload: {
    answer: string;
  };
}

interface RestartAction {
  type: typeof RESTART;
}

export type QuizActionTypes =
  | SetOptionsAction
  | NextQuestionAction
  | NextQuestionSuccessAction
  | NextQuestionFailAction
  | AnswerAction
  | RestartAction;
