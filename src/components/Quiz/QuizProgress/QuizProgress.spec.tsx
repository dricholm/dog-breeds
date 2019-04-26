import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import QuizProgress from './QuizProgress';

configure({ adapter: new Adapter() });

describe('<QuizProgress />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<QuizProgress />);
  });

  it('should display information', () => {
    wrapper.setProps({
      correct: 1,
      questionCount: 5,
      wasCorrect: null,
      wrong: 2,
    });
    const texts = wrapper.find('.title');
    expect(texts.length).toBe(3);
    expect(texts.at(0).hasClass('has-text-success')).toBe(true);
    expect(texts.at(0).text()).toBe('1');
    expect(texts.at(1).text()).toBe('3/5');
    expect(texts.at(2).hasClass('has-text-danger')).toBe(true);
    expect(texts.at(2).text()).toBe('2');
  });

  it('should pop correct', () => {
    wrapper.setProps({
      correct: 1,
      questionCount: 5,
      wasCorrect: true,
      wrong: 2,
    });
    const texts = wrapper.find('.title');
    expect(texts.length).toBe(3);
    expect(texts.at(0).hasClass('has-text-success')).toBe(true);
    expect(texts.at(0).hasClass('answer-pop')).toBe(true);
    expect(texts.at(2).hasClass('has-text-danger')).toBe(true);
    expect(texts.at(2).hasClass('answer-pop')).toBe(false);
  });

  it('should pop correct', () => {
    wrapper.setProps({
      correct: 1,
      questionCount: 5,
      wasCorrect: false,
      wrong: 2,
    });
    const texts = wrapper.find('.title');
    expect(texts.length).toBe(3);
    expect(texts.at(0).hasClass('has-text-success')).toBe(true);
    expect(texts.at(0).hasClass('answer-pop')).toBe(false);
    expect(texts.at(2).hasClass('has-text-danger')).toBe(true);
    expect(texts.at(2).hasClass('answer-pop')).toBe(true);
  });
});
