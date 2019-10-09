import { fetchRandomImage } from '../../shared/dogApi';
import {
  ANSWER,
  NEXT_QUESTION,
  NEXT_QUESTION_FAIL,
  NEXT_QUESTION_SUCCESS,
  QuizActionTypes,
  RESTART,
  SET_OPTIONS,
} from './types';

const getRandomAnswers = (selectedBreeds: Array<string>): string[] => {
  const answerCount = Math.min(4, selectedBreeds.length);
  let answers: string[] = [];
  while (answers.length < answerCount) {
    const idx = Math.floor(Math.random() * selectedBreeds.length);
    if (answers.indexOf(selectedBreeds[idx].toLowerCase()) === -1) {
      answers.push(selectedBreeds[idx].toLowerCase());
    }
  }
  return answers;
};

export const setOptions = (
  questionCount: number,
  selectedBreeds: Array<string>
) => ({
  payload: {
    questionCount,
    selectedBreeds: selectedBreeds,
  },
  type: SET_OPTIONS,
});

export const nextQuestion = (selectedBreeds: Array<string>) => {
  return async (dispatch: (action: QuizActionTypes) => void) => {
    dispatch({ type: NEXT_QUESTION });

    const choices = getRandomAnswers(selectedBreeds);
    const correctAnswer = choices[Math.floor(Math.random() * choices.length)];
    const splitAnswer = correctAnswer.split('-');
    const breed = splitAnswer[splitAnswer.length - 1];
    const sub =
      splitAnswer.length === 1
        ? null
        : splitAnswer.slice(0, splitAnswer.length - 1).join(' ');

    try {
      const imageUrl = await fetchRandomImage(breed, sub);
      dispatch({
        payload: {
          choices: choices,
          correctAnswer: correctAnswer,
          imageUrl,
        },
        type: NEXT_QUESTION_SUCCESS,
      });
    } catch (err) {
      dispatch({
        payload: {
          errorMessage: 'Network error',
        },
        type: NEXT_QUESTION_FAIL,
      });
    }
  };
};

export const answer = (answer: string) => ({
  payload: {
    answer: answer,
  },
  type: ANSWER,
});

export const restart = () => ({
  type: RESTART,
});
