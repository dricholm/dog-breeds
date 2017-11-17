import * as actionTypes from './actionTypes';
import axios from '../../shared/axiosDogApi';

const getRandomAnswers = (selectedBreeds) => {
  const answerCount = Math.min(4, selectedBreeds.length);
  let answers = [];
  while (answers.length < answerCount) {
    const idx = Math.floor(Math.random() * selectedBreeds.length);
    if (answers.indexOf(selectedBreeds[idx].toLowerCase()) === -1)
      answers.push(selectedBreeds[idx].toLowerCase());
  }
  return answers;
}

export const setOptions = (questionCount, selectedBreeds) => ({
  type: actionTypes.SET_OPTIONS,
  payload: {
    questionCount: questionCount,
    selectedBreeds: selectedBreeds
  }
});

export const nextQuestion = selectedBreeds => {
  return async dispatch => {
    dispatch({ type: actionTypes.NEXT_QUESTION });

    const choices = getRandomAnswers(selectedBreeds);
    const correctAnswer = choices[Math.floor(Math.random() * choices.length)];
    const splitAnswer = correctAnswer.split('-');
    const url = splitAnswer.length === 1
      ? `/breed/${splitAnswer[0]}/images/random`
      : `/breed/${splitAnswer[splitAnswer.length - 1]}/${splitAnswer.slice(0, splitAnswer.length - 1).join(' ')}/images/random`;

    let errorMessage;
    try {
      const result = await axios.get(url);
      dispatch({
        type: actionTypes.NEXT_QUESTION_SUCCESS,
        payload: {
          choices: choices,
          correctAnswer: correctAnswer,
          imageUrl: result.data.message
        }
      });
    } catch (err) {
      errorMessage = 'Network error';
    }
    if (errorMessage) {
      dispatch({
        type: actionTypes.NEXT_QUESTION_FAIL,
        payload: {
          errorMessage: errorMessage
        }
      });
    }
  }
};

export const answer = answer => ({
  type: actionTypes.ANSWER,
  payload: {
    answer: answer
  }
});

export const restart = () => ({
  type: actionTypes.RESTART
});
