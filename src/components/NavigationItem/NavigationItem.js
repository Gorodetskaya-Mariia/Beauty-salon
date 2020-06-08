import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationItem.css";

export class navigationItem extends React.Component {
  render() {
    const { exact, link, children, submenu, clickHandler } = this.props;
    return (
      <li className={`nav__item ${submenu ? "nav__item--submenu" : ""}`}>
        <NavLink
          to={link}
          exact={exact}
          activeClassName="active"
          onClick={clickHandler}
        >
          {children}
        </NavLink>
      </li>
    );
  }
}

export default navigationItem;
