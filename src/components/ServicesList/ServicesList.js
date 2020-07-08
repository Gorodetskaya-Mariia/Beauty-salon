import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import ServicesItem from "../ServicesItem/ServicesItem";
import Spinner from "../Spinner/Spinner";
import "./ServiceList.css";

class ServicesList extends React.Component {
  componentDidMount() {
    const {
      onFetchAppointments,
      token,
      userId,
      isAuthenticated,
      appointments,
    } = this.props;

    isAuthenticated &&
      !appointments.length &&
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

  renderServices() {
    const { isAuthenticated } = this.props;

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
            <ServicesItem item={item} booked={true} renderButtons={true} />
          ))}
        {!isAuthenticated &&
          this.allServices &&
          this.allServices.map((item) => (
            <ServicesItem item={item} renderButtons={false} />
          ))}
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
