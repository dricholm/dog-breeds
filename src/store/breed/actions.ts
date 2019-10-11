import { fetchBreedList } from '../../shared/dogApi';
import {
  BreedActionTypes,
  GET_BREEDS,
  GET_BREEDS_FAIL,
  GET_BREEDS_SUCCESS,
} from './types';

export const getBreeds = () => {
  return async (dispatch: (action: BreedActionTypes) => void) => {
    dispatch({ type: GET_BREEDS });

    try {
      const breeds = await fetchBreedList();

      dispatch({
        payload: {
          breeds,
        },
        type: GET_BREEDS_SUCCESS,
      });
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
