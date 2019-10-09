import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import BreedListLinks from './BreedListLinks';

describe('<BreedListLinks />', () => {
  it('should display error message when no breeds are set', () => {
    const utils = render(<BreedListLinks />);

    const alert = utils.getByRole('alert');
    expect(alert.textContent).toBe('No breeds matched the filter');
  });

  it('should display breeds when passed', () => {
    const breeds = ['main', 'has sub breed'];
    const utils = render(<BreedListLinks breeds={breeds} />, {
      wrapper: MemoryRouter,
    });

    expect(utils.queryByText('No breeds matched the filter')).toBeNull();
    const link1 = utils.getByText(breeds[0]);
    expect(link1.getAttribute('href')).toBe(`/breed/${breeds[0]}`);
    const link2 = utils.getByText(breeds[1]);
    const sub = breeds[1].split(' ');
    expect(link2.getAttribute('href')).toBe(
      `/breed/${sub[sub.length - 1]}/${sub.slice(0, sub.length - 1).join('-')}`
    );
  });
});
