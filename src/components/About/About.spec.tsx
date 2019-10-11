import { render } from '@testing-library/react';
import React from 'react';
import About from './About';

describe('<About />', () => {
  it('should display about', () => {
    const utils = render(<About />);
    utils.getByText('About');
  });
});
