import React from 'react';

const section = props => (
  <section className="section">
    <div className="container">
      {props.children}
    </div>
  </section>
);

export default section;
