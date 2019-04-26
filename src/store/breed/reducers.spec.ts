import { breedReducer } from './reducers';
import {
  initialBreedState,
  BreedActionTypes,
  GET_BREEDS,
  GET_BREEDS_FAIL,
  GET_BREEDS_SUCCESS,
} from './types';

describe('breed reducer', () => {
  it('should set loading when beginning to fetch', () => {
    const action: BreedActionTypes = {
      type: GET_BREEDS,
    };
    expect(breedReducer(initialBreedState, action)).toEqual({
      ...initialBreedState,
      error: null,
      loading: true,
    });
  });

  it('should set error when failed to fetch', () => {
    const action: BreedActionTypes = {
      type: GET_BREEDS_FAIL,
      payload: { errorMessage: 'Error occured' },
    };
    expect(
      breedReducer({ ...initialBreedState, loading: true }, action)
    ).toEqual({
      ...initialBreedState,
      error: 'Error occured',
      loading: false,
    });
  });

  it('should set breeds when fetch was successful', () => {
    const action: BreedActionTypes = {
      type: GET_BREEDS_SUCCESS,
      payload: {
        breeds: {
          akita: [],
          corgi: ['cardigan', 'pembroke welsh'],
        },
      },
    };

    expect(
      breedReducer({ ...initialBreedState, loading: true }, action)
    ).toEqual({
      ...initialBreedState,
      breedNames: ['akita', 'cardigan corgi', 'pembroke welsh corgi'],
      breeds: action.payload.breeds,
      loading: false,
    });
  });
});
