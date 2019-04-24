import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const Footer: FunctionComponent = () => (
  <footer className="footer">
    <div className="container">
      <div className="content has-text-centered">
        <p>
          Open source project on{' '}
          <a href="https://github.com/dricholm/dog-breeds">GitHub</a>
        </p>
        <p>
          <Link to="/about">About</Link>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
