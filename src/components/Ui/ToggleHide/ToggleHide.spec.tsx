import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import ToggleHide from './ToggleHide';

describe('<ToggleHide />', () => {
  it('should display button with shown: true', () => {
    const click = jest.fn();
    const shown = true;
    const utils = render(<ToggleHide click={click} shown={shown} />);

    const button = utils.getByText('Hide');
    expect(click).toHaveBeenCalledTimes(0);
    fireEvent.click(button);

    expect(click).toHaveBeenCalledTimes(1);
  });

  it('should display button with shown: false', () => {
    const click = jest.fn();
    const shown = false;
    const utils = render(<ToggleHide click={click} shown={shown} />);

    const button = utils.getByText('Show');
    expect(click).toHaveBeenCalledTimes(0);
    fireEvent.click(button);

    expect(click).toHaveBeenCalledTimes(1);
  });
});
