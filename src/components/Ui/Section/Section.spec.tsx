import { render } from '@testing-library/react';
import React from 'react';
import Section from './Section';

describe('<Section />', () => {
  it('should display section with children', () => {
    const utils = render(<Section>Child</Section>);
    utils.getByText('Child');
  });
});
