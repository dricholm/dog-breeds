import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Nav from './Nav';

describe('<Nav />', () => {
  it('should display header', () => {
    const utils = render(<Nav />, { wrapper: MemoryRouter });

    const header = utils.getByText('Dog breeds');
    expect(header.getAttribute('href')).toBe('/');
  });

  it('should display quiz link', () => {
    const utils = render(<Nav />, { wrapper: MemoryRouter });

    const quiz = utils.getByText('Quiz');
    expect(quiz.getAttribute('href')).toBe('/quiz');
  });
});
