import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
  render() {
    return (
    <div id="navContainer">

      <div className="navBox"></div>

      <div className="navBox">
        <Link to={'./'} className="navLink">
          Home
        </Link>
        <Link to={'./message'} className="navLink">
          Messages
        </Link>
      </div>

      <div className="navBox"></div>

    </div>
    );
  }
}

export default Nav;
