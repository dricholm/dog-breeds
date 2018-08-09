import React from 'react';
import PropTypes from 'prop-types';

const section = props => (
  <section className="section">
    <div className="container">{props.children}</div>
  </section>
);

section.propTypes = {
  children: PropTypes.node,
};

export default section;
