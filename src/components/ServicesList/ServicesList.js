import React, { Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { deleteAppointmentUrl } from "../../constants/urls";
import * as actions from "../../store/actions";
import ServicesItem from "../ServicesItem/ServicesItem";
import Spinner from "../Spinner/Spinner";
import { Modal } from "antd";
import "./ServiceList.css";

class ServicesList extends React.Component {
  state = { showModal: false, serviceToCancel: {} };

  componentDidMount() {
    const {
      onFetchAppointments,
      token,
      userId,
      isAuthenticated,
    } = this.props;

    isAuthenticated &&
      onFetchAppointments(token, userId);
  }

  get allServices() {
    const { selectedService } = this.props.services;
    const services = Object.keys(selectedService);
    return services.filter((service) => service !== "description");
  }

  get bookedServices() {
    const { appointments } = this.props;

    const allBookedServices = appointments
      ? appointments.map((item) => item.service)
      : [];
    return allBookedServices.filter((service) =>
      this.allServices.includes(service)
    );
  }

  get unbookedServices() {
    return this.allServices.filter(
      (service) => !this.bookedServices.includes(service)
    );
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

  onCancelHandler = (item) => {
    const { appointments } = this.props;

    for(let appointment of appointments){
      if(appointment.service === item) 
      this.setState({ showModal: true, serviceToCancel: appointment });
    }    
  };

  renderServices() {
    const { isAuthenticated } = this.props;
    const { showModal, serviceToCancel } = this.state;

    return (
      <div className="service__list d-flex flex-column">
        {isAuthenticated &&
          this.unbookedServices &&
          this.unbookedServices.map((item) => (
            <ServicesItem item={item} booked={false} renderButtons={true} />
          ))}
        {isAuthenticated &&
          this.bookedServices &&
          this.bookedServices.map((item) => (
            <ServicesItem item={item} booked={true} renderButtons={true} onCancelHandler={this.onCancelHandler}/>
          ))}
        {!isAuthenticated &&
          this.allServices &&
          this.allServices.map((item) => (
            <ServicesItem item={item} renderButtons={false} />
          ))}
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
      </div>
    );
  }

  render() {
    const { loading } = this.props;

    return <Fragment>{loading ? <Spinner /> : this.renderServices()}</Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    services: state.services,
    loading: state.services.loading,
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    userId: state.auth.userId,
    appointments: state.account.appointments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAppointments: (token, userId) =>
      dispatch(actions.fetchAppointments(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList);
