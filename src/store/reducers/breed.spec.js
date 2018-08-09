import reducer from './breed';
import * as actionTypes from '../actions/actionTypes';

describe('breed reducer', () => {
  const initialState = {
    breedNames: [],
    breeds: {},
    error: null,
    loading: false,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should set loading when beginning to fetch', () => {
    expect(reducer(initialState, { type: actionTypes.GET_BREEDS })).toEqual({
      ...initialState,
      error: null,
      loading: true,
    });
  });

  it('should set error when failed to fetch', () => {
    expect(
      reducer(
        { ...initialState, loading: true },
        {
          payload: { errorMessage: 'Error occured' },
          type: actionTypes.GET_BREEDS_FAIL,
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
      reducer(
        { ...initialState, loading: true },
        {
          payload: { breeds: breeds },
          type: actionTypes.GET_BREEDS_SUCCESS,
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
