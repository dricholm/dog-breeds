import { quizReducer } from './reducers';
import {
  initialQuizState,
  QuizActionTypes,
  SET_OPTIONS,
  ANSWER,
  RESTART,
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
