import {
  BreedInfoActionTypes,
  BreedInfoState,
  CHANGE_IMAGE,
  INIT_REQUEST,
  LOAD_MORE_IMAGES,
  SELECT_IMAGE,
  SET_ERROR,
  SET_IMAGES,
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
) => BreedInfoState = (state = initialState, action) => {
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
      return state;
  }
};
