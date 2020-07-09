import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions";
import { Routes } from "../../constants/routes";
import { Button } from "antd";
import "./ServiceItem.css";

class ServicesItem extends React.Component {
  onBookHandler = (service) => {
    const { setServiceForBooking } = this.props;
    setServiceForBooking(service);
    this.props.history.push(Routes.APPOINTMENT);
  };

  render() {
    const { item, booked, renderButtons, onCancelHandler } = this.props;
    const { selectedService } = this.props.services;

    return (
      <div className="service__item d-flex align-items-center" key={item}>
        <p className="service__name">{item}</p>
        <p className="service__price">{`from $${selectedService[item].price}`}</p>
        {renderButtons &&
          (booked ? (
            <Button type="danger" onClick={() => onCancelHandler(item)}>
              Cancel
            </Button>
          ) : (
            <Button
              type="primary"
              className="service__buttons--book"
              onClick={() => this.onBookHandler(item)}
            >
              Book
            </Button>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    services: state.services,
    isAuthenticated: state.auth.token !== null,
    appointments: state.account.appointments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setServiceForBooking: (service) =>
      dispatch(actions.setServiceForBooking(service)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ServicesItem)
);
