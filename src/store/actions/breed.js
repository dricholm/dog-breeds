import * as actionTypes from './actionTypes';
import axios from '../../shared/axiosDogApi';

export const getBreeds = () => {
  return async dispatch => {
    dispatch({ type: actionTypes.GET_BREEDS });

    let errorMessage;
    try {
      const result = await axios.get('/breeds/list/all');

      if (result.status === 200) {
        dispatch({
          payload: {
            breeds: result.data.message,
          },
          type: actionTypes.GET_BREEDS_SUCCESS,
        });
      } else {
        errorMessage = 'Failed to get breeds';
      }
    } catch (err) {
      errorMessage = 'A network error has occured';
    }

    if (errorMessage) {
      dispatch({
        payload: {
          errorMessage: errorMessage,
        },
        type: actionTypes.GET_BREEDS_FAIL,
      });
    }
  };
};
