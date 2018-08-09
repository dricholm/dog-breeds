import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const subBreeds = props => {
  const subs = props.subs
    .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
    .map(val => (
      <li key={val}>
        <Link to={`/breed/${props.main}/${val}`}>
          {val} {props.main}
        </Link>
      </li>
    ));

  return (
    <React.Fragment>
      <h2 className="title is-size-4">Sub breeds</h2>
      <ul className="is-size-5 is-capitalized">{subs}</ul>
    </React.Fragment>
  );
};

subBreeds.propTypes = {
  main: PropTypes.string,
  subs: PropTypes.array,
};

export default subBreeds;
