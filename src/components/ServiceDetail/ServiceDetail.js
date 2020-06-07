import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions";
import { Button, Icon } from "antd";
import "./ServiceDetail.css";

class ServiceDetail extends React.Component {
  onBookHandler = (service) => {
    const { setServiceForBooking } = this.props;
    setServiceForBooking(service);
    this.props.history.push("/appointment");
  };

  onCancelHandler = () => {
    this.props.history.push("/account");
  };

  onSignupHandler = () => {
    this.props.history.push("/signin");
  };

  renderList() {
    const { selectedService } = this.props.services;
    const { isAuthenticated } = this.props;
    let filteredArray = Object.keys(selectedService);
    let result = [];
    for (let item in filteredArray) {
      if (filteredArray[item] !== "description") {
        result.push(filteredArray[item]);
      }
    }

    return result.map(item => (
      <div className="service__item d-flex align-items-center justify-center" key={item}>
        <p className="service__name">{item}</p>
        <p className="service__price">{`from $${selectedService[item].price}`}</p>
        {isAuthenticated && <div className="service__buttons d-flex">
          <Button
            type="primary"
            className="service__buttons--book"
            onClick={()=> this.onBookHandler(item)}
          >
            Book
          </Button>
          {/* <Button
            type="danger"
            onClick={this.onCancelHandler}
          >
            Cancel
          </Button> */}
        </div>}
      </div>
    ));
  }

  render() {
    const { services, isAuthenticated, forWhom } = this.props;
    return (
      <div className="wrapper">
      <Link
        to={forWhom}
        key={forWhom}
        className="service__info"
      >
        <span>Back to services</span>
      </Link>
        <div className="service__wrapper d-flex flex-column">
          <div className="service__description">
            {services.selectedService.description}
          </div>
          <div className="service__list d-flex flex-column">
            {services.selectedService && this.renderList()}
          </div>
        </div>
        {!isAuthenticated && (
          <div className="service__info">
            <Icon type="exclamation-circle" className="service__icon" />
            Booking is available only for authenticated customers. If you want
            to book an appointment please
            <span onClick={this.onSignupHandler}> click for sign in.</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    services: state.services,
    isAuthenticated: state.auth.token !== null,
    forWhom: state.services.forWhom,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setServiceForBooking: service => dispatch(actions.setServiceForBooking(service))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetail);
