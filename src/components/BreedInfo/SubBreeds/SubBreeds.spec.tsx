import React from 'react';
import { Link } from 'react-router-dom';
import { shallow, ShallowWrapper } from 'enzyme';

import SubBreeds from './SubBreeds';

describe('<SubBreeds />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<SubBreeds main="" subs={[]} />);
  });

  it('should display sub breed list', () => {
    wrapper.setProps({ main: 'main', subs: ['sub1', 'sub2'] });
    const links = wrapper.find(Link);
    expect(links.length).toBe(2);
    expect(links.at(0).props().to).toBe('/breed/main/sub1');
    expect(links.at(0).text()).toBe('sub1 main');
    expect(links.at(1).props().to).toBe('/breed/main/sub2');
    expect(links.at(1).text()).toBe('sub2 main');
  });
});
