import { quizReducer } from './reducers';
import {
  ANSWER,
  initialQuizState,
  NEXT_QUESTION,
  NEXT_QUESTION_FAIL,
  NEXT_QUESTION_SUCCESS,
  QuizActionTypes,
  RESTART,
  SET_OPTIONS,
} from './types';

describe('quiz reducer', () => {
  it('should set options', () => {
    const action: QuizActionTypes = {
      type: SET_OPTIONS,
      payload: {
        questionCount: 2,
        selectedBreeds: ['Test'],
      },
    };
    expect(quizReducer(initialQuizState, action)).toEqual({
      ...initialQuizState,
      numberOfCorrect: 0,
      loading: false,
      questionCount: 2,
      selectedBreeds: ['Test'],
      numberOfWrong: 0,
    });
  });

  it('should start next question', () => {
    const action: QuizActionTypes = {
      type: NEXT_QUESTION,
    };
    expect(quizReducer(initialQuizState, action)).toEqual({
      ...initialQuizState,
      choices: [],
      chosenAnswer: null,
      correctAnswer: null,
      errorMessage: null,
      image: null,
      loading: true,
      wasCorrect: null,
    });
  });

  it('should set next question', () => {
    const action: QuizActionTypes = {
      type: NEXT_QUESTION_SUCCESS,
      payload: {
        choices: ['corgi', 'akita', 'husky'],
        correctAnswer: 'akita',
        imageUrl: 'akita.jpg',
      },
    };
    expect(quizReducer(initialQuizState, action)).toEqual({
      ...initialQuizState,
      choices: action.payload.choices.sort(),
      correctAnswer: action.payload.correctAnswer,
      errorMessage: null,
      image: action.payload.imageUrl,
      loading: false,
    });
  });

  it('should fail to set next question', () => {
    const action: QuizActionTypes = {
      type: NEXT_QUESTION_FAIL,
      payload: { errorMessage: 'Error message' },
    };
    expect(quizReducer(initialQuizState, action)).toEqual({
      ...initialQuizState,
      errorMessage: action.payload.errorMessage,
      loading: false,
    });
  });

  it('should set correct answer', () => {
    const action: QuizActionTypes = {
      type: ANSWER,
      payload: { answer: 'Test' },
    };
    expect(
      quizReducer(
        {
          ...initialQuizState,
          correctAnswer: 'Test',
          numberOfCorrect: 0,
          numberOfWrong: 0,
        },
        action
      )
    ).toEqual({
      ...initialQuizState,
      chosenAnswer: action.payload.answer,
      numberOfCorrect: 1,
      correctAnswer: 'Test',
      wasCorrect: true,
      numberOfWrong: 0,
    });
  });

  it('should set wrong answer', () => {
    const action: QuizActionTypes = {
      type: ANSWER,
      payload: { answer: 'Incorrect' },
    };
    expect(
      quizReducer(
        {
          ...initialQuizState,
          correctAnswer: 'Test',
          numberOfCorrect: 0,
          numberOfWrong: 0,
        },
        action
      )
    ).toEqual({
      ...initialQuizState,
      chosenAnswer: action.payload.answer,
      correctAnswer: 'Test',
      numberOfCorrect: 0,
      wasCorrect: false,
      numberOfWrong: 1,
    });
  });

  it('should restart', () => {
    const action: QuizActionTypes = {
      type: RESTART,
    };
    expect(
      quizReducer(
        {
          ...initialQuizState,
          choices: ['A'],
          chosenAnswer: 'A',
          numberOfCorrect: 2,
          correctAnswer: 'A',
          numberOfWrong: 1,
        },
        action
      )
    ).toEqual({ ...initialQuizState, numberOfCorrect: 0, numberOfWrong: 0 });
  });
});
