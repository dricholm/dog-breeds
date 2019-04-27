import {
  BreedState,
  BreedActionTypes,
  GET_BREEDS,
  GET_BREEDS_SUCCESS,
  GET_BREEDS_FAIL,
} from './types';

const initialState: Partial<BreedState> = {
  breedNames: [],
  breeds: {},
  error: null,
  loading: false,
};

export const breedReducer = (
  state: Partial<BreedState> = initialState,
  action: BreedActionTypes
) => {
  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case GET_BREEDS_SUCCESS: {
      const breedNames: Array<string> = [];
      for (let breed in action.payload.breeds) {
        if (action.payload.breeds[breed].length === 0) {
          breedNames.push(breed.toLowerCase());
        } else {
          breedNames.push(
            ...action.payload.breeds[breed].map(
              (sub: string) => sub.toLowerCase() + ' ' + breed.toLowerCase()
            )
          );
        }
      }
      return {
        ...state,
        breedNames: breedNames.sort(),
        breeds: action.payload.breeds,
        error: null,
        loading: false,
      };
    }

    case GET_BREEDS_FAIL:
      return {
        ...state,
        error: action.payload.errorMessage,
        loading: false,
      };

    default:
      return state;
  }
};
