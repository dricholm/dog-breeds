import { render } from '@testing-library/react';
import React from 'react';
import QuizProgress from './QuizProgress';

describe('<QuizProgress />', () => {
  it('should display information', () => {
    const correct = 1;
    const questionCount = 5;
    const wasCorrect = null;
    const wrong = 2;
    const utils = render(
      <QuizProgress
        correct={correct}
        questionCount={questionCount}
        wasCorrect={wasCorrect}
        wrong={wrong}
      />
    );

    const texts = utils.container.querySelectorAll('.title');
    expect(texts.length).toBe(3);
    expect(texts[0]).toHaveClass('has-text-success');
    expect(texts[0].textContent).toBe('1');
    expect(texts[1].textContent).toBe('3/5');
    expect(texts[2]).toHaveClass('has-text-danger');
    expect(texts[2].textContent).toBe('2');
  });

  it('should pop correct', () => {
    const correct = 1;
    const questionCount = 5;
    const wasCorrect = true;
    const wrong = 2;
    const utils = render(
      <QuizProgress
        correct={correct}
        questionCount={questionCount}
        wasCorrect={wasCorrect}
        wrong={wrong}
      />
    );

    const texts = utils.container.querySelectorAll('.title');
    expect(texts.length).toBe(3);
    expect(texts[0]).toHaveClass('has-text-success');
    expect(texts[0]).toHaveClass('answer-pop');
    expect(texts[2]).toHaveClass('has-text-danger');
    expect(texts[2]).not.toHaveClass('answer-pop');
  });

  it('should pop wrong', () => {
    const correct = 1;
    const questionCount = 5;
    const wasCorrect = false;
    const wrong = 2;
    const utils = render(
      <QuizProgress
        correct={correct}
        questionCount={questionCount}
        wasCorrect={wasCorrect}
        wrong={wrong}
      />
    );

    const texts = utils.container.querySelectorAll('.title');
    expect(texts.length).toBe(3);
    expect(texts[0]).toHaveClass('has-text-success');
    expect(texts[0]).not.toHaveClass('answer-pop');
    expect(texts[2]).toHaveClass('has-text-danger');
    expect(texts[2]).toHaveClass('answer-pop');
  });
});
