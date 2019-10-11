import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Footer from './Footer';

describe('<Footer />', () => {
  it('should display footer', () => {
    const utils = render(<Footer />, { wrapper: MemoryRouter });

    expect(utils.container.querySelector('footer')).toBeDefined();
    const github = utils.getByText('GitHub');
    expect(github.getAttribute('href')).toBe(
      'https://github.com/dricholm/dog-breeds'
    );
  });
});
