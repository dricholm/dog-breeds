import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { nextQuestion, setOptions } from './actions';
import {
  initialQuizState,
  NEXT_QUESTION,
  NEXT_QUESTION_SUCCESS,
  QuizActionTypes,
  SET_OPTIONS,
  NEXT_QUESTION_FAIL,
} from './types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('quiz actions', () => {
  it('should set options', () => {
    const questionCount = 5;
    const selectedBreeds = ['Akita', 'Corgi', 'Husky'];
    const expectedAction: QuizActionTypes = {
      type: SET_OPTIONS,
      payload: { questionCount, selectedBreeds },
    };

    expect(setOptions(questionCount, selectedBreeds)).toEqual(expectedAction);
  });

  describe('nextQuestion', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('should dispatch NEXT_QUESTION_SUCCESS when request succeeds', async () => {
      const selectedBreeds = ['akita'];
      const imageUrl = 'akita.jpg';
      fetchMock.getOnce('https://dog.ceo/api/breed/akita/images/random', {
        body: { message: imageUrl, status: 'Success' },
      });
      const expectedActions: Array<QuizActionTypes> = [
        { type: NEXT_QUESTION },
        {
          type: NEXT_QUESTION_SUCCESS,
          payload: {
            choices: selectedBreeds,
            correctAnswer: selectedBreeds[0],
            imageUrl,
          },
        },
      ];
      const store = mockStore(initialQuizState);

      await store.dispatch<any>(nextQuestion(selectedBreeds));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch NEXT_QUESTION_FAIL when request fails', async () => {
      const selectedBreeds = ['akita'];
      fetchMock.getOnce('https://dog.ceo/api/breed/akita/images/random', 500);
      const expectedActions: Array<QuizActionTypes> = [
        { type: NEXT_QUESTION },
        {
          type: NEXT_QUESTION_FAIL,
          payload: {
            errorMessage: 'Network error',
          },
        },
      ];
      const store = mockStore(initialQuizState);

      await store.dispatch<any>(nextQuestion(selectedBreeds));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
