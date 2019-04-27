import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Section from './Section';

configure({ adapter: new Adapter() });

describe('<Section />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Section />);
  });

  it('should display section with children', () => {
    const children: JSX.Element = <div id="child">Child</div>;
    wrapper.setProps({ children });
    expect(wrapper.find('section').exists()).toBe(true);
    expect(wrapper.find('#child').exists()).toBe(true);
  });
});
