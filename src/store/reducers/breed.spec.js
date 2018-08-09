import reducer from './breed';
import * as actionTypes from '../actions/actionTypes';

describe('breed reducer', () => {
  const initialState = {
    breeds: {},
    breedNames: [],
    error: null,
    loading: false
  };

  it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should set loading when beginning to fetch', () => {
    expect(reducer(initialState, { type: actionTypes.GET_BREEDS }))
    .toEqual({
      ...initialState,
      error: null,
      loading: true
    });
  });

  it('should set error when failed to fetch', () => {
    expect(reducer({ ...initialState, loading: true }, {
      type: actionTypes.GET_BREEDS_FAIL,
      payload: {errorMessage: 'Error occured' }
    }))
    .toEqual({
      ...initialState,
      error: 'Error occured',
      loading: false
    });
  });

  it('should set breeds when fetch was successful', () => {
    const breeds = {
      akita: [],
      corgi: ['cardigan', 'pembroke welsh']
    };

    expect(reducer({ ...initialState, loading: true }, {
      type: actionTypes.GET_BREEDS_SUCCESS,
      payload: { breeds: breeds }
    }))
    .toEqual({
      ...initialState,
      breeds: breeds,
      breedNames: ['akita', 'cardigan corgi', 'pembroke welsh corgi'],
      loading: false
    });
  });

});
