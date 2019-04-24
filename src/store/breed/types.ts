export interface BreedState {
  breedNames: Array<string>;
  breeds: { [breed: string]: Array<string> };
  error: string;
  loading: boolean;
}

export const initialBreedState: BreedState = {
  breedNames: [],
  breeds: {},
  error: null,
  loading: null,
};

export const GET_BREEDS = 'GET_BREEDS';
export const GET_BREEDS_SUCCESS = 'GET_BREEDS_SUCCESS';
export const GET_BREEDS_FAIL = 'GET_BREEDS_FAIL';

interface GetBreedsAction {
  type: typeof GET_BREEDS;
}

interface GetBreedsSuccessAction {
  type: typeof GET_BREEDS_SUCCESS;
  payload: {
    breeds: { [breed: string]: Array<string> };
  };
}

interface GetBreedsFailAction {
  type: typeof GET_BREEDS_FAIL;
  payload: {
    errorMessage: string;
  };
}

export type BreedActionTypes =
  | GetBreedsAction
  | GetBreedsSuccessAction
  | GetBreedsFailAction;
