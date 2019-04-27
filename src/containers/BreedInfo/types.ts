export interface BreedInfoState {
  breedNames: Array<string>;
  breeds: { [breed: string]: Array<string> };
  currentBreed: { main?: string; sub?: string };
  error: string;
  imageError: string;
  imageUrls: Array<string>;
  loading: boolean;
  loadingImages: boolean;
  numberOfImagesLoaded: number;
  selectedImage: number;
}

export const INIT_REQUEST = 'INIT_REQUEST';
export const SET_IMAGES = 'SET_IMAGES';
export const SET_ERROR = 'SET_ERROR';
export const LOAD_MORE_IMAGES = 'LOAD_MORE_IMAGES';
export const SELECT_IMAGE = 'SELECT_IMAGE';
export const CHANGE_IMAGE = 'CHANGE_IMAGE';

interface InitRequestAction {
  type: typeof INIT_REQUEST;
  payload: {
    breed: string;
    sub: string;
  };
}

interface SetImagesAction {
  type: typeof SET_IMAGES;
  payload: {
    imageUrls: Array<string>;
  };
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: {
    errorMessage: string;
  };
}

interface LoadMoreImagesAction {
  type: typeof LOAD_MORE_IMAGES;
}

interface SelectImageAction {
  type: typeof SELECT_IMAGE;
  payload: {
    imageIndex: number;
  };
}

interface ChangeImageAction {
  type: typeof CHANGE_IMAGE;
  payload: {
    delta: number;
  };
}

export type BreedInfoActionTypes =
  | InitRequestAction
  | SetImagesAction
  | SetErrorAction
  | LoadMoreImagesAction
  | SelectImageAction
  | ChangeImageAction;
