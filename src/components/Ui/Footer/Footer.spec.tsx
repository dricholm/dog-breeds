import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';

import Footer from './Footer';

configure({ adapter: new Adapter() });

describe('<Footer />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  it('should display footer', () => {
    expect(wrapper.find('footer').exists()).toBe(true);
    expect(
      wrapper.find('a[href="https://github.com/dricholm/dog-breeds"]').exists()
    ).toBe(true);
    expect(wrapper.find(Link).exists()).toBe(true);
    expect(wrapper.find(Link).prop('to')).toBe('/about');
  });
});
