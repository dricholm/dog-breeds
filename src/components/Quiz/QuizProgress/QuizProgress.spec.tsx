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
    expect(texts[0].classList.contains('has-text-success')).toBe(true);
    expect(texts[0].textContent).toBe('1');
    expect(texts[1].textContent).toBe('3/5');
    expect(texts[2].classList.contains('has-text-danger')).toBe(true);
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
    expect(texts[0].classList.contains('has-text-success')).toBe(true);
    expect(texts[0].classList.contains('answer-pop')).toBe(true);
    expect(texts[2].classList.contains('has-text-danger')).toBe(true);
    expect(texts[2].classList.contains('answer-pop')).toBe(false);
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
    expect(texts[0].classList.contains('has-text-success')).toBe(true);
    expect(texts[0].classList.contains('answer-pop')).toBe(false);
    expect(texts[2].classList.contains('has-text-danger')).toBe(true);
    expect(texts[2].classList.contains('answer-pop')).toBe(true);
  });
});
