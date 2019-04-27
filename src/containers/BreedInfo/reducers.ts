import {
  BreedInfoState,
  BreedInfoActionTypes,
  INIT_REQUEST,
  SET_IMAGES,
  SET_ERROR,
  LOAD_MORE_IMAGES,
  SELECT_IMAGE,
  CHANGE_IMAGE,
} from './types';

export const initialState: BreedInfoState = {
  breedNames: [],
  breeds: {},
  currentBreed: {},
  error: null,
  imageError: null,
  imageUrls: [],
  loading: null,
  loadingImages: null,
  numberOfImagesLoaded: null,
  selectedImage: null,
};

export const breedInfoReducer: (
  state: BreedInfoState,
  action: BreedInfoActionTypes
) => BreedInfoState = (state, action) => {
  switch (action.type) {
    case INIT_REQUEST:
      return {
        ...state,
        currentBreed: {
          main: action.payload.breed,
          sub: action.payload.sub,
        },
        imageError: null,
        imageUrls: [],
        loadingImages: true,
        numberOfImagesLoaded: 0,
      };

    case SET_IMAGES:
      return {
        ...state,
        currentBreed: { ...state.currentBreed },
        imageError: null,
        imageUrls: action.payload.imageUrls,
        loadingImages: false,
        numberOfImagesLoaded: 10,
      };

    case SET_ERROR:
      return {
        ...state,
        currentBreed: { ...state.currentBreed },
        imageError: action.payload.errorMessage,
        imageUrls: [],
        loadingImages: false,
      };

    case LOAD_MORE_IMAGES:
      return {
        ...state,
        currentBreed: { ...state.currentBreed },
        numberOfImagesLoaded: state.numberOfImagesLoaded + 10,
      };

    case SELECT_IMAGE:
      return {
        ...state,
        currentBreed: { ...state.currentBreed },
        selectedImage: action.payload.imageIndex,
      };

    case CHANGE_IMAGE:
      return {
        ...state,
        currentBreed: { ...state.currentBreed },
        numberOfImagesLoaded:
          state.selectedImage + action.payload.delta >=
          state.numberOfImagesLoaded
            ? state.selectedImage + action.payload.delta + 1
            : state.numberOfImagesLoaded,
        selectedImage: state.selectedImage + action.payload.delta,
      };

    default:
      console.error('Invalid QuizFormAction type', action);
      return state;
  }
};
