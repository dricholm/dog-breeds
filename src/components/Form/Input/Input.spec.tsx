import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Input from './Input';

describe('<Input />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Input />);
  });

  it('should work with checkbox', () => {
    const onChange = jest.fn();
    wrapper.setProps({
      elementConfig: { onChange },
      elementType: 'checkbox',
      label: 'LabelTest',
    });
    const label = wrapper.find('label');
    const input = wrapper.find('input');

    expect(label.exists()).toBe(true);
    expect(label.props().htmlFor).toBe('LabelTest');
    expect(label.text().trim()).toBe('LabelTest');

    expect(input.exists()).toBe(true);
    expect(input.props().id).toBe('LabelTest');
    expect(input.props().title).toBe('LabelTest');
    expect(input.props().type).toBe('checkbox');

    expect(onChange).toHaveBeenCalledTimes(0);
    input.simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should work with input text', () => {
    const onChange = jest.fn();
    wrapper.setProps({
      elementConfig: {
        onChange,
        placeholder: 'Placeholder test',
        type: 'text',
      },
      elementType: 'input',
    });
    const input = wrapper.find('input[type="text"]');

    expect(input.exists()).toBe(true);
    expect(input.props().placeholder).toBe('Placeholder test');

    expect(onChange).toHaveBeenCalledTimes(0);
    input.simulate('change', { target: { value: 'Entering' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({
      target: { value: 'Entering' },
    });
  });
});
