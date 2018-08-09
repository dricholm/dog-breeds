import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
  state = {
    isMenuActive: false,
  };

  toggleMenu = () => {
    this.setState(prevState => ({ isMenuActive: !prevState.isMenuActive }));
  };

  render() {
    const menuClasses = ['navbar-menu'];
    const burgerClasses = ['button', 'navbar-burger'];

    if (this.state.isMenuActive) {
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

          <button className={burgerClasses.join(' ')} onClick={this.toggleMenu}>
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={menuClasses.join(' ')}>
          <div className="navbar-start">
            <NavLink
              activeClassName="is-active"
              className="navbar-item"
              onClick={this.toggleMenu}
              to="/quiz"
            >
              Quiz
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
