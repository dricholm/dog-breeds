import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { breedReducer } from '../../store/breed/reducers';
import { initialBreedState } from '../../store/breed/types';
import BreedInfo from './BreedInfo';

function renderWithRedux(
  ui: React.ReactElement,
  {
    initialState = { breeds: initialBreedState },
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

describe('<BreedInfo />', () => {
  it('should render without any breed', () => {
    const utils = renderWithRedux(<BreedInfo />);

    utils.getByText('Breed not found');
  });

  it('should render loading', () => {
    const utils = renderWithRedux(<BreedInfo />, {
      initialState: { breeds: { ...initialBreedState, loading: true } },
    });

    utils.getByLabelText('Loading');
  });

  it('should render error', () => {
    const error = 'Test error message';
    const utils = renderWithRedux(<BreedInfo />, {
      initialState: { breeds: { ...initialBreedState, error } },
    });

    utils.getByText(error);
  });
});
