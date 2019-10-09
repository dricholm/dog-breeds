import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getBreeds } from './actions';
import {
  BreedActionTypes,
  GET_BREEDS,
  GET_BREEDS_FAIL,
  GET_BREEDS_SUCCESS,
  initialBreedState,
} from './types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('breed actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should dispatch GET_BREEDS_SUCCESS when network request succeeds', async () => {
    const breeds = { Akita: [], Corgi: ['Cardigan', 'Pembroke Welsh'] };
    fetchMock.getOnce('https://dog.ceo/api/breeds/list/all', {
      body: { message: breeds, status: 'Success' },
    });
    const expectedActions: Array<BreedActionTypes> = [
      { type: GET_BREEDS },
      { type: GET_BREEDS_SUCCESS, payload: { breeds } },
    ];
    const store = mockStore(initialBreedState);

    await store.dispatch<any>(getBreeds());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch GET_BREEDS_FAIL when network request fails', async () => {
    const breeds = ['Breed'];
    fetchMock.getOnce('https://dog.ceo/api/breeds/list/all', 500);
    const expectedActions: Array<BreedActionTypes> = [
      { type: GET_BREEDS },
      {
        type: GET_BREEDS_FAIL,
        payload: { errorMessage: 'A network error has occured' },
      },
    ];
    const store = mockStore(initialBreedState);

    await store.dispatch<any>(getBreeds());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
