import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { quizReducer } from '../../../store/quiz/reducers';
import { initialQuizState } from '../../../store/quiz/types';
import QuizGame from './QuizGame';

function renderWithRedux(
  ui: React.ReactElement,
  {
    initialState = { quiz: initialQuizState },
    store = createStore(
      quizReducer,
      initialState,
      compose(applyMiddleware(thunk))
    ),
  } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>, {
      wrapper: MemoryRouter,
    }),
    store,
  };
}

describe('<QuizGame />', () => {
  it('should render loading', () => {
    const utils = renderWithRedux(<QuizGame />, {
      initialState: {
        quiz: {
          ...initialQuizState,
          questionCount: 2,
          selectedBreeds: ['Akita', 'Husky'],
        },
      },
    });

    utils.getByLabelText('Loading');
  });

  it('should render answers', () => {
    const utils = renderWithRedux(<QuizGame />, {
      initialState: {
        quiz: {
          ...initialQuizState,
          choices: ['Akita', 'Husky'],
          loading: false,
          numberOfCorrect: 0,
          numberOfWrong: 0,
          questionCount: 2,
          selectedBreeds: ['Akita', 'Husky'],
          image: 'image.jpg',
        },
      },
    });

    expect(utils.queryByLabelText('Loading')).toBeNull();
    utils.getByText('Akita');
    utils.getByText('Husky');
  });
});
