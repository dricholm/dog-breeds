import React from 'react';
import { shallow } from 'enzyme';

import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ErrorMessage />);
  });

  it('should display error message when error is passed', () => {
    wrapper.setProps({ message: 'Test error message' });
    expect(wrapper.text()).toBe('Test error message');
  });
});
