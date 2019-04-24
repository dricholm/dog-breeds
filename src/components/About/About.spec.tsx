import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import About from './About';

describe('<About />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<About />);
  });

  it('should display about', () => {
    expect(wrapper.find('.title').exists()).toBe(true);
    expect(wrapper.find('.content').exists()).toBe(true);
  });
});
