import { render } from '@testing-library/react';
import React from 'react';
import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage />', () => {
  it('should display error message when error is passed', () => {
    const message = 'Test error message';
    const utils = render(<ErrorMessage message={message} />);

    const alert = utils.getByRole('alert');
    expect(alert.textContent).toBe(message);
  });
});
