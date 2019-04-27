import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import QuizCheckboxes from './QuizCheckboxes';
import Input from '../../Form/Input/Input';

describe('<QuizCheckboxes />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<QuizCheckboxes />);
  });

  it('should display checkboxes', () => {
    const props = {
      checkboxes: { a: true, aa: false, b: false, f: true },
      changeValue: jest.fn(),
    };
    wrapper.setProps(props);
    const checkboxes = wrapper.find(Input);
    expect(checkboxes.length).toBe(4);
    expect(checkboxes.at(0).props().label).toBe('a');
    expect(checkboxes.at(1).props().label).toBe('aa');
    expect(checkboxes.at(2).props().label).toBe('b');
    expect(checkboxes.at(3).props().label).toBe('f');

    const initials = wrapper.find('.label.is-capitalized');
    expect(initials.length).toBe(3);
    expect(initials.at(0).text()).toBe('a');
    expect(initials.at(1).text()).toBe('b');
    expect(initials.at(2).text()).toBe('f');
  });
});
