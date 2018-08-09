import * as actionTypes from './actionTypes';
import axios from '../../shared/axiosDogApi';

const getRandomAnswers = selectedBreeds => {
  const answerCount = Math.min(4, selectedBreeds.length);
  let answers = [];
  while (answers.length < answerCount) {
    const idx = Math.floor(Math.random() * selectedBreeds.length);
    if (answers.indexOf(selectedBreeds[idx].toLowerCase()) === -1)
      answers.push(selectedBreeds[idx].toLowerCase());
  }
  return answers;
};

export const setOptions = (questionCount, selectedBreeds) => ({
  payload: {
    questionCount: +questionCount,
    selectedBreeds: selectedBreeds,
  },
  type: actionTypes.SET_OPTIONS,
});

export const nextQuestion = selectedBreeds => {
  return async dispatch => {
    dispatch({ type: actionTypes.NEXT_QUESTION });

    const choices = getRandomAnswers(selectedBreeds);
    const correctAnswer = choices[Math.floor(Math.random() * choices.length)];
    const splitAnswer = correctAnswer.split('-');
    const url =
      splitAnswer.length === 1
        ? `/breed/${splitAnswer[0]}/images/random`
        : `/breed/${splitAnswer[splitAnswer.length - 1]}/${splitAnswer
            .slice(0, splitAnswer.length - 1)
            .join(' ')}/images/random`;

    let errorMessage;
    try {
      const result = await axios.get(url);
      dispatch({
        payload: {
          choices: choices,
          correctAnswer: correctAnswer,
          imageUrl: result.data.message,
        },
        type: actionTypes.NEXT_QUESTION_SUCCESS,
      });
    } catch (err) {
      errorMessage = 'Network error';
    }
    if (errorMessage) {
      dispatch({
        payload: {
          errorMessage: errorMessage,
        },
        type: actionTypes.NEXT_QUESTION_FAIL,
      });
    }
  };
};

export const answer = answer => ({
  payload: {
    answer: answer,
  },
  type: actionTypes.ANSWER,
});

export const restart = () => ({
  type: actionTypes.RESTART,
});
