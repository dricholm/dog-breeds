import { quizReducer } from './reducers';
import {
  initialQuizState,
  QuizActionTypes,
  SET_OPTIONS,
  NEXT_QUESTION,
  NEXT_QUESTION_SUCCESS,
  NEXT_QUESTION_FAIL,
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
      correct: 0,
      loading: false,
      questionCount: 2,
      selectedBreeds: ['Test'],
      wrong: 0,
    });
  });

  it('should set correct answer', () => {
    const action: QuizActionTypes = {
      type: ANSWER,
      payload: { answer: 'Test' },
    };
    expect(
      quizReducer(
        { ...initialQuizState, correctAnswer: 'Test', correct: 0, wrong: 0 },
        action
      )
    ).toEqual({
      ...initialQuizState,
      chosenAnswer: action.payload.answer,
      correct: 1,
      correctAnswer: 'Test',
      wasCorrect: true,
      wrong: 0,
    });
  });

  it('should set wrong answer', () => {
    const action: QuizActionTypes = {
      type: ANSWER,
      payload: { answer: 'Incorrect' },
    };
    expect(
      quizReducer(
        { ...initialQuizState, correctAnswer: 'Test', correct: 0, wrong: 0 },
        action
      )
    ).toEqual({
      ...initialQuizState,
      chosenAnswer: action.payload.answer,
      correctAnswer: 'Test',
      correct: 0,
      wasCorrect: false,
      wrong: 1,
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
          correct: 2,
          correctAnswer: 'A',
          wrong: 1,
        },
        action
      )
    ).toEqual({ ...initialQuizState, correct: 0, wrong: 0 });
  });
});
