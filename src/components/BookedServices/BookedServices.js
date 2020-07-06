import React, { Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../../store/actions";
import Spinner from "../../components/Spinner/Spinner";
import { Button } from "antd";

class BookedServices extends React.Component {
  componentDidMount() {
    const { onFetchAppointments, token, userId } = this.props;
    onFetchAppointments(token, userId);
  }

  onDeleteHandler = (e) => {
    const { onFetchAppointments, token, userId } = this.props;
    const id = e.target.getAttribute("data-id");

    axios
      .delete(
        `https://react-beauty-salon-cacbe.firebaseio.com/appointments/${id}.json?auth=${token}`
      )
      .then((res) => {
        onFetchAppointments(token, userId);
      })
      .catch((err) => console.warn(err));
  };

  renderAppointmentsList = () => {
    const { appointments } = this.props;

    return appointments && appointments.length ? (
      appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="account__card-row d-flex space-between align-items-center"
        >
          <p>{appointment.service}</p>
          <p>{appointment.time}</p>
          <Button
            type="danger"
            data-id={appointment.id}
            onClick={this.onDeleteHandler}
          >
            Delete
          </Button>
        </div>
      ))
    ) : (
      <p>You haven't booked any services</p>
    );
  };

  render() {
    const { loading } = this.props;

    return (
      <Fragment>
        {loading ? <Spinner /> : this.renderAppointmentsList()}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.account.loading,
    appointments: state.account.appointments,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAppointments: (token, userId) =>
      dispatch(actions.fetchAppointments(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookedServices);
