import { breedReducer } from './reducers';
import {
  BreedState,
  GET_BREEDS,
  GET_BREEDS_FAIL,
  GET_BREEDS_SUCCESS,
} from './types';

describe('breed reducer', () => {
  const initialState: Partial<BreedState> = {
    breedNames: [],
    breeds: {},
    error: null,
    loading: false,
  };

  it('should set loading when beginning to fetch', () => {
    expect(breedReducer(initialState, { type: GET_BREEDS })).toEqual({
      ...initialState,
      error: null,
      loading: true,
    });
  });

  it('should set error when failed to fetch', () => {
    expect(
      breedReducer(
        { ...initialState, loading: true },
        {
          payload: { errorMessage: 'Error occured' },
          type: GET_BREEDS_FAIL,
        }
      )
    ).toEqual({
      ...initialState,
      error: 'Error occured',
      loading: false,
    });
  });

  it('should set breeds when fetch was successful', () => {
    const breeds = {
      akita: [],
      corgi: ['cardigan', 'pembroke welsh'],
    };

    expect(
      breedReducer(
        { ...initialState, loading: true },
        {
          payload: { breeds: breeds },
          type: GET_BREEDS_SUCCESS,
        }
      )
    ).toEqual({
      ...initialState,
      breedNames: ['akita', 'cardigan corgi', 'pembroke welsh corgi'],
      breeds: breeds,
      loading: false,
    });
  });
});
