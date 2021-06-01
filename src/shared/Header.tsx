import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../assets/logo/FedEx Logo.png';

function Header(props: any) {
  return (
    <div className="bigContainerWrapper">
      <div className="headerContainer">
        <div className="logoContainer">
          <Link to="/"><img src={logo} alt="FedEx" /></Link>
        </div>
        <div className="navContainer">
          <NavLink className="navElement" activeClassName='is-active' to="/dashboard">Dashboard</NavLink>
          <NavLink className="navElement" activeClassName='is-active' to="/package">Packages</NavLink>
          <NavLink className="navElement" activeClassName='is-active' to="/shipping_control">Shipping Control</NavLink>
          <NavLink className="navElement" activeClassName='is-active' to="/shipping_service">Shipping Service</NavLink>
          <NavLink className="navElement" activeClassName='is-active' to="/tracking_progress">Tracking Progress</NavLink>
          <NavLink className="navElement" activeClassName='is-active' to="/user">User</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;