import axios from '../../shared/axiosDogApi';
import {
  SET_OPTIONS,
  NEXT_QUESTION,
  NEXT_QUESTION_SUCCESS,
  NEXT_QUESTION_FAIL,
  ANSWER,
  RESTART,
  QuizActionTypes,
} from './types';

const getRandomAnswers = (selectedBreeds: Array<string>) => {
  const answerCount = Math.min(4, selectedBreeds.length);
  let answers = [];
  while (answers.length < answerCount) {
    const idx = Math.floor(Math.random() * selectedBreeds.length);
    if (answers.indexOf(selectedBreeds[idx].toLowerCase()) === -1)
      answers.push(selectedBreeds[idx].toLowerCase());
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
    const url =
      splitAnswer.length === 1
        ? `/breed/${splitAnswer[0]}/images/random`
        : `/breed/${splitAnswer[splitAnswer.length - 1]}/${splitAnswer
            .slice(0, splitAnswer.length - 1)
            .join(' ')}/images/random`;

    let errorMessage: string;
    try {
      const result = await axios.get(url);
      dispatch({
        payload: {
          choices: choices,
          correctAnswer: correctAnswer,
          imageUrl: result.data.message,
        },
        type: NEXT_QUESTION_SUCCESS,
      });
    } catch (err) {
      errorMessage = 'Network error';
    }
    if (errorMessage) {
      dispatch({
        payload: {
          errorMessage: errorMessage,
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
