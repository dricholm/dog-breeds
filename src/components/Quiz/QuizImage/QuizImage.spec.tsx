import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import QuizImage from './QuizImage';

describe('<QuizImage />', () => {
  it('should display loading when no image is set', () => {
    const utils = render(
      <QuizImage nextQuestion={() => null} restart={() => null} />
    );

    expect(utils.getByLabelText('Loading')).toBeDefined();
  });

  it('should display image when set', () => {
    const image = 'test.jpg';
    const utils = render(
      <QuizImage image={image} nextQuestion={() => null} restart={() => null} />
    );

    expect(utils.queryByLabelText('Loading')).toBeNull();
    expect(utils.container.querySelector('figure')).toBeDefined();
  });

  it('should call nextQuestion when next is clicked', () => {
    const nextQuestion = jest.fn();
    const utils = render(
      <QuizImage
        chosen="Test"
        image="test.jpg"
        nextQuestion={nextQuestion}
        restart={() => null}
      />
    );

    expect(utils.queryByLabelText('Loading')).toBeNull();
    expect(utils.container.querySelector('figure')).toBeDefined();
    const nextQuestionButton = utils.getByLabelText('Next');
    expect(nextQuestionButton).toBeDefined();
    fireEvent.click(nextQuestionButton);
    expect(nextQuestion).toHaveBeenCalledTimes(1);
  });

  it('should display results and restart when done', () => {
    const restart = jest.fn();
    const correct = 6;
    const wrong = 4;
    const utils = render(
      <QuizImage
        chosen="Test"
        image="test.jpg"
        correct={correct}
        gameEnd={true}
        wrong={wrong}
        restart={restart}
        nextQuestion={() => null}
      />
    );

    expect(utils.queryByLabelText('Loading')).toBeNull();
    expect(utils.container.querySelector('figure')).toBeDefined();
    expect(utils.getByText(`Correct: ${correct}`)).toBeDefined();
    expect(utils.getByText(`Wrong: ${wrong}`)).toBeDefined();
    expect(utils.queryByLabelText('Next')).toBeNull();
    const restartButton = utils.getByLabelText('Restart');
    expect(restartButton).toBeDefined();
    fireEvent.click(restartButton);
    expect(restart).toHaveBeenCalledTimes(1);
  });
});
