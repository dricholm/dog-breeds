import * as actionTypes from '../actions/actionTypes';

const initialState = {
  breeds: {
    'akita': [],
    'corgi': [
      'cardigan',
      'pembroke welsh'
    ],
    'shiba': [],
    'vizsla': [
      'short haired',
      'wire haired'
    ]
  }
};

const reducer = (state = initialState, action) => {
  switch (action) {
    case actionTypes.GET_BREEDS:
    default:
      return state;
  }
};

export default reducer;
