import React, { Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../../store/actions";
import { deleteAppointmentUrl } from "../../constants/urls";
import Spinner from "../../components/Spinner/Spinner";
import { Button, Modal } from "antd";

class BookedServices extends React.Component {
  state = { showModal: false, serviceToCancel: {} };

  componentDidMount() {
    const { onFetchAppointments, token, userId } = this.props;
    onFetchAppointments(token, userId);
  }

  OkHandle = (id) => {
    const { onFetchAppointments, token, userId } = this.props;

    axios
      .delete(
        `${deleteAppointmentUrl}${id}.json?auth=${token}`
      )
      .then(() => {
        onFetchAppointments(token, userId);
        this.setState({ showModal: false, serviceToCancel: {} });
      })
      .catch((err) => console.warn(err));
  };

  CancelHandle = () => {
    this.setState({ showModal: false, serviceToCancel: {} });
  };

  onDeleteHandler = (appointment) => {
    this.setState({ showModal: true, serviceToCancel: appointment });
  };

  renderAppointmentsList = () => {
    const { appointments } = this.props;
    const { showModal, serviceToCancel } = this.state;

    return (
      <Fragment>
        {appointments && appointments.length ? (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="account__card-row d-flex space-between align-items-center"
            >
              <p>{appointment.service}</p>
              <p>{appointment.time}</p>
              <Button
                type="danger"
                onClick={() => this.onDeleteHandler(appointment)}
              >
                Cancel
              </Button>
            </div>
          ))
        ) : (
          <p>You haven't booked any services</p>
        )}
        {showModal && (
          <Modal
            title=""
            visible={true}
            onOk={() => this.OkHandle(serviceToCancel.id)}
            onCancel={this.CancelHandle}
          >
            <p>{`Are you sure to cancel "${serviceToCancel.service}" at ${serviceToCancel.time}`}</p>
          </Modal>
        )}
      </Fragment>
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
