import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import NavigationItem from "../NavigationItem/NavigationItem";
import "./Header.css";

export class Header extends React.Component {
  state = {
    link: "/services-for-men",
  };

  handlerClick = (e) => {
    e.persist();
    this.setState({ link: e.target.attributes[0].value });
  };

  render() {
    const { link } = this.state;
    return (
      <header className="container">
        <nav className="nav">
          <ul className="nav__items d-flex">
            <NavigationItem link="/" exact>
              Home
            </NavigationItem>
            <li className="nav__item nav__item--submenu">
              <NavLink to={link} activeClassName="active">
                Services
              </NavLink>
              <ul className="nav__submenu">
                <NavigationItem
                  link="/services-for-men"
                  submenu
                  clickHandler={(e) => this.handlerClick(e)}
                >
                  for men
                </NavigationItem>
                <NavigationItem
                  link="/services-for-women"
                  submenu
                  clickHandler={(e) => this.handlerClick(e)}
                >
                  for women
                </NavigationItem>
              </ul>
            </li>
            {this.props.isAuthenticated ? (
              <NavigationItem link="/account">My account</NavigationItem>
            ) : null}
            {this.props.isAuthenticated ? (
              <NavigationItem link="/signout">Sign out</NavigationItem>
            ) : (
              <NavigationItem link="/signin">Sign in</NavigationItem>
            )}
            {!this.props.isAuthenticated && (
              <NavigationItem link="/signup">Sign up</NavigationItem>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Header);
