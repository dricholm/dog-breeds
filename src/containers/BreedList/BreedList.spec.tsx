import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { breedReducer } from '../../store/breed/reducers';
import { initialBreedState } from '../../store/breed/types';
import BreedList from './BreedList';

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

describe('<BreedList />', () => {
  it('should render without any breed', () => {
    const utils = renderWithRedux(<BreedList />);

    utils.getByText('No breeds matched the filter');
  });

  it('should render loading', () => {
    const utils = renderWithRedux(<BreedList />, {
      initialState: {
        breeds: { ...initialBreedState, loading: true },
      },
    });

    utils.getByLabelText('Loading');
  });

  it('should render error', () => {
    const utils = renderWithRedux(<BreedList />, {
      initialState: {
        breeds: { ...initialBreedState, error: 'Test error message' },
      },
    });

    utils.getByText('Test error message');
  });

  it('should render without any breed', () => {
    const utils = renderWithRedux(<BreedList />, {
      initialState: {
        breeds: { ...initialBreedState, breedNames: ['Akita', 'Husky'] },
      },
    });

    utils.getByText('Akita');
    utils.getByText('Husky');
  });

  it('should filter breeds', () => {
    const utils = renderWithRedux(<BreedList />, {
      initialState: {
        breeds: { ...initialBreedState, breedNames: ['Akita', 'Husky'] },
      },
    });

    const filter = utils.getByLabelText('Filter breeds');
    fireEvent.change(filter, { target: { value: 'akit' } });

    utils.getByText('Akita');
    expect(utils.queryByText('Husky')).toBeNull();
  });
});
