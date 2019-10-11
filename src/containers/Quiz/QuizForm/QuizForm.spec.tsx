import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { breedReducer } from '../../../store/breed/reducers';
import { initialBreedState } from '../../../store/breed/types';
import { initialQuizState } from '../../../store/quiz/types';
import QuizForm from './QuizForm';

function renderWithRedux(
  ui: React.ReactElement,
  {
    initialState = { breeds: initialBreedState, quiz: initialQuizState },
    store = createStore(
      breedReducer,
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

describe('<QuizForm />', () => {
  it('should render QuizForm', () => {
    const utils = renderWithRedux(<QuizForm />);

    utils.getByText('Number of questions');
    utils.getByText('Show');
    utils.getByText('Start quiz');
  });

  it('should render QuizForm with breeds loaded', () => {
    const utils = renderWithRedux(<QuizForm />, {
      initialState: {
        breeds: { ...initialBreedState, breedNames: ['Akita', 'Husky'] },
        quiz: initialQuizState,
      },
    });

    utils.getByText('Number of questions');
    utils.getByText('Show');
    utils.getByText('Start quiz');
  });

  it('should toggle every selection', () => {
    const utils = renderWithRedux(<QuizForm />, {
      initialState: {
        breeds: { ...initialBreedState, breedNames: ['Akita', 'Husky'] },
        quiz: initialQuizState,
      },
    });

    const akita = utils.getByLabelText('Akita') as HTMLInputElement;
    const husky = utils.getByLabelText('Husky') as HTMLInputElement;

    expect(akita.checked).toBe(true);
    expect(husky.checked).toBe(true);

    const selectNone = utils.getByText('Select none');
    fireEvent.click(selectNone);

    expect(akita.checked).toBe(false);
    expect(husky.checked).toBe(false);

    const selectAll = utils.getByText('Select all');
    fireEvent.click(selectAll);

    expect(akita.checked).toBe(true);
    expect(husky.checked).toBe(true);
  });
});
