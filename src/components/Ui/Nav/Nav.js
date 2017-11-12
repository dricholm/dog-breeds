import React, { Component } from 'react';

class Nav extends Component {

  state = {
    isMenuActive: false
  }

  toggleMenu = () => {
    this.setState((prevState) => ({ isMenuActive: !prevState.isMenuActive }));
  }

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
          <a className="navbar-item">
            Dog breeds
          </a>

          <button className={burgerClasses.join(' ')} onClick={this.toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={menuClasses.join(' ')}>
          <div className="navbar-start">
            <a className="navbar-item is-active">
              List
            </a>
            <a className="navbar-item">
              Quiz
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
