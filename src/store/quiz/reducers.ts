import {
  QuizState,
  QuizActionTypes,
  SET_OPTIONS,
  NEXT_QUESTION,
  NEXT_QUESTION_SUCCESS,
  NEXT_QUESTION_FAIL,
  ANSWER,
  RESTART,
} from './types';

const initialState: QuizState = {
  choices: [],
  chosenAnswer: null,
  correct: 0,
  correctAnswer: null,
  errorMessage: null,
  image: null,
  loading: false,
  questionCount: 0,
  selectedBreeds: [],
  wasCorrect: null,
  wrong: 0,
};

export const quizReducer = (
  state: QuizState = initialState,
  action: QuizActionTypes
) => {
  switch (action.type) {
    case SET_OPTIONS:
      return {
        ...state,
        correct: 0,
        errorMessage: null,
        image: null,
        loading: false,
        questionCount: action.payload.questionCount,
        selectedBreeds: action.payload.selectedBreeds,
        wrong: 0,
      };

    case NEXT_QUESTION:
      return {
        ...state,
        choices: [],
        chosenAnswer: null,
        correctAnswer: null,
        errorMessage: null,
        image: null,
        loading: true,
        wasCorrect: null,
      };

    case NEXT_QUESTION_SUCCESS:
      return {
        ...state,
        choices: action.payload.choices.sort(),
        correctAnswer: action.payload.correctAnswer,
        errorMessage: null,
        image: action.payload.imageUrl,
        loading: false,
      };

    case NEXT_QUESTION_FAIL:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        loading: false,
      };

    case ANSWER:
      return {
        ...state,
        chosenAnswer: action.payload.answer,
        correct:
          action.payload.answer === state.correctAnswer
            ? state.correct + 1
            : state.correct,
        wasCorrect: action.payload.answer === state.correctAnswer,
        wrong:
          action.payload.answer === state.correctAnswer
            ? state.wrong
            : state.wrong + 1,
      };

    case RESTART:
      return {
        ...state,
        choices: [],
        chosenAnswer: null,
        correct: 0,
        correctAnswer: null,
        wrong: 0,
      };

    default:
      return state;
  }
};
