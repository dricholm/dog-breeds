import * as actionTypes from './actionTypes';

export const getBreeds = () => ({
  type: actionTypes.GET_BREEDS
});

export const setOptions = (questions, breeds) => ({
  type: actionTypes.SET_OPTIONS,
  payload: {
    questions: questions,
    selectedBreeds: breeds
  }
});
