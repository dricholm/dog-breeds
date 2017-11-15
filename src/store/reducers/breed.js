import * as actionTypes from '../actions/actionTypes';

const initialState = {
  breeds: {},
  breedNames: [],
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BREEDS:
      return {
        ...state,
        error: null,
        loading: true
      };

    case actionTypes.GET_BREEDS_SUCCESS:
      const breedNames = [];
      for (let breed in action.payload.breeds) {
        if (action.payload.breeds[breed].length === 0) {
          breedNames.push(breed.toLowerCase());
        } else {
          breedNames.push(...action.payload.breeds[breed].map((sub) => sub.toLowerCase() + ' ' + breed.toLowerCase()));
        }
      };
      return {
        ...state,
        breeds: action.payload.breeds,
        breedNames: breedNames.sort(),
        error: null,
        loading: false
      };

    case actionTypes.GET_BREEDS_FAIL:
      return {
        ...state,
        error: action.payload.errorMessage,
        loading: false
      };

    default:
      return state;
  }
};

export default reducer;
