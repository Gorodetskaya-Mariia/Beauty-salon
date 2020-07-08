import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Routes } from "../../constants/routes";
import ServicesList from "../ServicesList/ServicesList";
import { Icon } from "antd";
import "./ServiceDetail.css";

class ServiceDetail extends React.Component {
  onSignupHandler = () => {
    this.props.history.push(Routes.SIGNIN);
  };

  render() {
    const { services, isAuthenticated, forWhom } = this.props;
    return (
      <div className="wrapper">
        <Link to={forWhom} key={forWhom} className="service__info">
          <span>Back to services</span>
        </Link>
        <div className="service__wrapper d-flex flex-column">
          <div className="service__description">
            {services.selectedService.description}
          </div>
          {services.selectedService && <ServicesList />}
        </div>
        {!isAuthenticated && (
          <div className="service__info">
            <Icon type="exclamation-circle" className="service__icon" />
            Booking is available only for authenticated customers. If you want
            to book an appointment
            <span onClick={this.onSignupHandler}> click for sign in.</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    services: state.services,
    isAuthenticated: state.auth.token !== null,
    forWhom: state.services.forWhom,
  };
};

export default connect(mapStateToProps, null)(ServiceDetail);
