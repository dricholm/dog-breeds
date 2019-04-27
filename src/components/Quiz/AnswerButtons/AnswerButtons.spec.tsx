import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import AnswerButtons, { AnswerButtonsProps } from './AnswerButtons';

describe('<AnswerButtons />', () => {
  let wrapper: ShallowWrapper<AnswerButtonsProps>;

  beforeEach(() => {
    wrapper = shallow(<AnswerButtons />);
  });

  it('should display choices', () => {
    const props: AnswerButtonsProps = {
      choices: ['First', 'Second'],
      chosenAnswer: null,
      click: jest.fn(),
      correctAnswer: null,
    };
    wrapper.setProps(props);
    const buttons = wrapper.find('button');
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).text()).toBe(props.choices[0]);
    expect(buttons.at(1).text()).toBe(props.choices[1]);
    expect(buttons.at(0).hasClass('is-info')).toBe(true);
    expect(buttons.at(1).hasClass('is-info')).toBe(true);
    expect(buttons.at(0).hasClass('is-outlined')).toBe(false);
    expect(buttons.at(1).hasClass('is-outlined')).toBe(false);
  });

  it('should call props.click on click', () => {
    const props: AnswerButtonsProps = {
      choices: ['Test click'],
      chosenAnswer: null,
      click: jest.fn(),
      correctAnswer: null,
    };
    wrapper.setProps(props);
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(props.click).toHaveBeenCalledWith('Test click');
  });

  it('should display correct choice', () => {
    const props: AnswerButtonsProps = {
      choices: ['First', 'Second'],
      chosenAnswer: 'First',
      click: jest.fn(),
      correctAnswer: 'First',
    };
    wrapper.setProps(props);
    const buttons = wrapper.find('button');
    expect(buttons.at(0).text()).toBe(props.choices[0]);
    expect(buttons.at(1).text()).toBe(props.choices[1]);
    expect(buttons.at(0).hasClass('is-success')).toBe(true);
    expect(buttons.at(1).hasClass('is-info')).toBe(true);
    expect(buttons.at(1).hasClass('is-outlined')).toBe(true);
  });

  it('should display wrong choice', () => {
    const props: AnswerButtonsProps = {
      choices: ['First', 'Second'],
      chosenAnswer: 'First',
      click: jest.fn(),
      correctAnswer: 'Second',
    };
    wrapper.setProps(props);
    const buttons = wrapper.find('button');
    expect(buttons.at(0).text()).toBe(props.choices[0]);
    expect(buttons.at(1).text()).toBe(props.choices[1]);
    expect(buttons.at(0).hasClass('is-danger')).toBe(true);
    expect(buttons.at(1).hasClass('is-success')).toBe(true);
  });
});
