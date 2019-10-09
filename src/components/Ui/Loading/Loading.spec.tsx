import { render } from '@testing-library/react';
import React from 'react';
import Loading from './Loading';

describe('<Loading />', () => {
  it('should display loading', () => {
    const utils = render(<Loading />);
    expect(utils.getByLabelText('Loading')).toBeDefined();
  });
});
