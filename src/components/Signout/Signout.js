import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Routes } from "../../constants/routes";

class Signout extends React.Component {
  componentDidMount() {
    const { onLogout, clearUserData, clearAppointments } = this.props;
    onLogout();
    clearUserData();
    clearAppointments();
  }

  render() {
    return <Redirect to={Routes.MAIN} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
    clearUserData: () => dispatch(actions.clearUserData()),
    clearAppointments: () => dispatch(actions.clearAppointments()),
  };
};
export default connect(null, mapDispatchToProps)(Signout);
