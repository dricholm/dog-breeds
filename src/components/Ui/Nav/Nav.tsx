import React, { FunctionComponent, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Nav: FunctionComponent = () => {
  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    setActive(!active);
  };

  const menuClasses = ['navbar-menu'];
  const burgerClasses = ['navbar-burger', 'burger'];

  if (active) {
    menuClasses.push('is-active');
    burgerClasses.push('is-active');
  }

  return (
    <nav className="navbar is-link" aria-label="main navigation">
      <div className="navbar-brand has-text-weight-semibold is-uppercase">
        <NavLink
          activeClassName="is-active"
          className="navbar-item"
          exact
          to="/"
        >
          Dog breeds
        </NavLink>

        <div className={burgerClasses.join(' ')} onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className={menuClasses.join(' ')}>
        <div className="navbar-start">
          <NavLink
            activeClassName="is-active"
            className="navbar-item"
            onClick={toggleMenu}
            to="/quiz"
          >
            Quiz
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
