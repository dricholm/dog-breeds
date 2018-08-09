import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import QuizImage from './QuizImage';
import Loading from '../../Ui/Loading/Loading';

configure({ adapter: new Adapter() });

describe('<QuizImage />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<QuizImage />);
  });

  it('should display loading when no image is set', () => {
    expect(wrapper.find(Loading)).toHaveLength(1);
  });

  it('should display image when set', () => {
    wrapper.setProps({ image: 'test.jpg' });
    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find('.quiz-image')).toHaveLength(1);
  });

  it('should display next button when answered', () => {
    wrapper.setProps({
      chosen: true,
      image: 'test.jpg',
    });
    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find('.quiz-image')).toHaveLength(1);
    expect(wrapper.find('.quiz-next')).toHaveLength(1);
    expect(wrapper.find('[aria-label="next"]')).toHaveLength(1);
  });

  it('should display results and restart when done', () => {
    wrapper.setProps({
      chosen: true,
      correct: 6,
      gameEnd: true,
      image: 'test.jpg',
      wrong: 4,
    });
    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find('.quiz-image')).toHaveLength(1);
    expect(wrapper.find('.message')).toHaveLength(1);
    expect(wrapper.find('[aria-label="restart"]')).toHaveLength(1);
  });
});
