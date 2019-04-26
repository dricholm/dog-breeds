import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ToggleHide from './ToggleHide';

configure({ adapter: new Adapter() });

describe('<ToggleHide />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ToggleHide />);
  });

  it('should display button with shown: true', () => {
    const props = {
      click: jest.fn(),
      shown: true,
    };
    wrapper.setProps(props);

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.hasClass('is-light')).toBe(true);
    expect(button.hasClass('is-primary')).toBe(false);
    expect(button.text()).toBe('Hide');
    expect(props.click).toHaveBeenCalledTimes(0);
    button.simulate('click');
    expect(props.click).toHaveBeenCalledTimes(1);
  });

  it('should display button with shown: false', () => {
    const props = {
      click: jest.fn(),
      shown: false,
    };
    wrapper.setProps(props);

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.hasClass('is-light')).toBe(false);
    expect(button.hasClass('is-primary')).toBe(true);
    expect(button.text()).toBe('Show');
    expect(props.click).toHaveBeenCalledTimes(0);
    button.simulate('click');
    expect(props.click).toHaveBeenCalledTimes(1);
  });
});
