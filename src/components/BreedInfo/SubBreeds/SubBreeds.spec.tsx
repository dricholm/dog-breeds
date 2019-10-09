import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SubBreeds from './SubBreeds';

describe('<SubBreeds />', () => {
  it('should display sub breed list', () => {
    const main = 'main';
    const subs = ['sub1', 'sub2'];
    const utils = render(<SubBreeds main={main} subs={subs} />, {
      wrapper: MemoryRouter,
    });

    subs.forEach(sub => {
      const link = utils.getByText(`${sub} ${main}`);
      expect(link.getAttribute('href')).toBe(`/breed/${main}/${sub}`);
    });
  });
});
