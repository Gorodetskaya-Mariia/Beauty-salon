import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Routes } from "../../constants/routes";

class Signout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to={Routes.MAIN} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};
export default connect(null, mapDispatchToProps)(Signout);
