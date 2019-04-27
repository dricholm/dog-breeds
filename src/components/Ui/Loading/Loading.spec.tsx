import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Loading from './Loading';

configure({ adapter: new Adapter() });

describe('<Loading />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Loading />);
  });

  it('should display loading', () => {
    expect(wrapper.find('.dog-loader').exists()).toBe(true);
  });
});
