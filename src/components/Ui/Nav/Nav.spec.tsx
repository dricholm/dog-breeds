import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavLink } from 'react-router-dom';

import Nav from './Nav';

configure({ adapter: new Adapter() });

describe('<Nav />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Nav />);
  });

  it('should display nav', () => {
    expect(wrapper.find('nav').exists()).toBe(true);
    const navLinks = wrapper.find(NavLink);
    expect(navLinks.length).toBe(2);
    expect(navLinks.at(0).prop('to')).toBe('/');
    expect(navLinks.at(1).prop('to')).toBe('/quiz');
  });
});
