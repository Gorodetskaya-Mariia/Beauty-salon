import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Menu } from "antd";
import "./Header.css";

const { SubMenu } = Menu;

export class Header extends React.Component {
  state = {
    currentPath: ""
  };

  componentDidMount() {
    this.setState({ currentPath: "home" });
  }

  handleClick = e => {
    this.setState({
      currentPath: e.key
    });
  };

  render() {
    const { currentPath } = this.state;

    return (
      <header className="container">
        <Menu
          onClick={this.handleClick}
          selectedKeys={currentPath}
          defaultSelectedKeys={currentPath}
          mode="horizontal"
        >
          <Menu.Item key="home">
            <Link to="/">
              Home
            </Link>
          </Menu.Item>
          <SubMenu
            title={<span className="submenu-title-wrapper">Services</span>}
          >
            <Menu.ItemGroup title="">
              <Menu.Item key="for men">
                <Link to="/services-for-men">
                  for men
                </Link>
              </Menu.Item>
              <Menu.Item key="for women">
                <Link to="/services-for-women">
                  for women
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          {this.props.isAuthenticated && (
            <Menu.Item key="account">
              <Link to="/account">
                My account
              </Link>
            </Menu.Item>
          )}

          <Menu.Item key="login">
            {!this.props.isAuthenticated ? (
              <Link to="/login">
                Login
              </Link>
            ) : (
              <Link to="/logout">
                Logout
              </Link>
            )}
          </Menu.Item>
        </Menu>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Header);
