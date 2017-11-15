import * as actionTypes from './actionTypes';
import axios from '../../shared/axiosDogApi';

export const getBreeds = () => {
  return async dispatch => {
    dispatch({ type: actionTypes.GET_BREEDS });
    try {
      const result = await axios.get('/breeds/list/all');
      if (result.status === 200) {
        dispatch({
          type: actionTypes.GET_BREEDS_SUCCESS,
          payload: {
            breeds: result.data.message
          }
        });
      } else {
        dispatch({
          type: actionTypes.GET_BREEDS_FAIL,
          payload: {
            errorMessage: 'Failed to get breeds'
          }
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.GET_BREEDS_FAIL,
        payload: {
          errorMessage: 'A network error has occured'
        }
      });
    }
  };
};

export const setOptions = (questions, breeds) => ({
  type: actionTypes.SET_OPTIONS,
  payload: {
    questions: questions,
    selectedBreeds: breeds
  }
});

export const nextQuestion = () => ({
  type: actionTypes.NEXT_QUESTION
});

export const answer = breed => ({
  type: actionTypes.ANSWER,
  payload: {
    answer: breed
  }
});

export const restart = () => ({
  type: actionTypes.RESTART
});
