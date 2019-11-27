import React from "react";
import * as actions from "../../actions/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};
export default connect(null, mapDispatchToProps)(Logout);
