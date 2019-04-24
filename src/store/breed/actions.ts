import axios from '../../shared/axiosDogApi';

import {
  GET_BREEDS,
  GET_BREEDS_SUCCESS,
  GET_BREEDS_FAIL,
  BreedActionTypes,
} from './types';

export const getBreeds = () => {
  return async (dispatch: (action: BreedActionTypes) => void) => {
    dispatch({ type: GET_BREEDS });

    try {
      const result = await axios.get('/breeds/list/all');

      if (result.status === 200) {
        dispatch({
          payload: {
            breeds: result.data.message,
          },
          type: GET_BREEDS_SUCCESS,
        });
      } else {
        dispatch({
          payload: {
            errorMessage: 'Failed to get breeds',
          },
          type: GET_BREEDS_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        payload: {
          errorMessage: 'A network error has occured',
        },
        type: GET_BREEDS_FAIL,
      });
    }
  };
};
