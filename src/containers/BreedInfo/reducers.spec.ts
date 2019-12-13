import { breedInfoReducer } from './reducers';
import { BreedInfoActionTypes } from './types';

describe('BreedInfo reducer', () => {
  it('should return the initial state', () => {
    expect(breedInfoReducer(undefined, {} as BreedInfoActionTypes)).toEqual({
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
    });
  });
});
