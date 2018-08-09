import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ErrorMessage from '../Ui/ErrorMessage/ErrorMessage';

const breedListLinks = props => {
  if (!props.breeds || props.breeds.length === 0) {
    return <ErrorMessage message="No breeds matched the filter" />;
  }

  const breedList = props.breeds.map(val => {
    const split = val.split(' ');
    const sub =
      split.length > 1 ? split.slice(0, split.length - 1).join('-') : null;
    const link = sub
      ? '/breed/' + split[split.length - 1] + '/' + sub
      : '/breed/' + split[split.length - 1];
    return (
      <li key={val}>
        <Link to={link}>{val}</Link>
      </li>
    );
  });

  return <ul className="is-size-5 is-capitalized">{breedList}</ul>;
};

breedListLinks.propTypes = {
  breeds: PropTypes.array,
};

export default breedListLinks;
