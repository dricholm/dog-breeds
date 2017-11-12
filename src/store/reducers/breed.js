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
  },
  breedNames: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BREEDS:
      const breedNames = [];
      for (let breed in state.breeds) {
        if (state.breeds[breed].length === 0) {
          breedNames.push(breed);
        } else {
          breedNames.push(...state.breeds[breed].map((sub) => sub + ' ' + breed));
        }
      };
      return {
        ...state,
        breedNames: breedNames
      };
    default:
      return state;
  }
};

export default reducer;
