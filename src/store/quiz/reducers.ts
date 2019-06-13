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
  numberOfCorrect: 0,
  correctAnswer: null,
  errorMessage: null,
  image: null,
  loading: false,
  questionCount: 0,
  selectedBreeds: [],
  wasCorrect: null,
  numberOfWrong: 0,
};

export const quizReducer = (
  state: QuizState = initialState,
  action: QuizActionTypes
) => {
  switch (action.type) {
    case SET_OPTIONS:
      return {
        ...state,
        numberOfCorrect: 0,
        errorMessage: null,
        image: null,
        loading: false,
        questionCount: action.payload.questionCount,
        selectedBreeds: action.payload.selectedBreeds,
        numberOfWrong: 0,
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
        numberOfCorrect:
          action.payload.answer === state.correctAnswer
            ? state.numberOfCorrect + 1
            : state.numberOfCorrect,
        wasCorrect: action.payload.answer === state.correctAnswer,
        numberOfWrong:
          action.payload.answer === state.correctAnswer
            ? state.numberOfWrong
            : state.numberOfWrong + 1,
      };

    case RESTART:
      return {
        ...state,
        choices: [],
        chosenAnswer: null,
        numberOfCorrect: 0,
        correctAnswer: null,
        numberOfWrong: 0,
      };

    default:
      return state;
  }
};
