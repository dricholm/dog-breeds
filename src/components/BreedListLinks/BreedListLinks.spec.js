import React from 'react';
import { Link } from 'react-router-dom';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BreedListLinks from './BreedListLinks';
import ErrorMessage from '../Ui/ErrorMessage/ErrorMessage';

configure({ adapter: new Adapter() });

describe('<BreedListLinks />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BreedListLinks />);
  });

  it('should display error message when no breeds passed', () => {
    expect(wrapper.find(ErrorMessage)).toHaveLength(1);
  });

  it('should display error message when no breeds found', () => {
    wrapper.setProps({ breeds: [] });
    expect(wrapper.find(ErrorMessage)).toHaveLength(1);
  });

  it('should display breeds when passed', () => {
    const breedNames = [
      'main',
      'has sub breed'
    ];
    wrapper.setProps({ breeds: breedNames });
    expect(wrapper.find(ErrorMessage)).toHaveLength(0);
    const sub = breedNames[1].split(' ');
    expect(wrapper.contains([
      <li>
        <Link to={`/breed/${breedNames[0]}`}>
          {breedNames[0]}
        </Link>
      </li>,
      <li>
        <Link to={`/breed/${sub[sub.length - 1]}/${sub.slice(0, sub.length - 1).join('-')}`}>
          {breedNames[1]}
        </Link>
      </li>
    ])).toEqual(true);
  });

});
