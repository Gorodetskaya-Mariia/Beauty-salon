import React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "antd";
import "./ServiceDetail.css";

class ServiceDetail extends React.Component {
  onBookHandler = () => {
    this.props.history.push("/appointment");
  };

  onCancelHandler = () => {
    this.props.history.push("/account");
  };

  onSignupHandler = () => {
    this.props.history.push("/login");
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
      <div className="service__item d-flex align-items-center" key={item}>
        <p className="service__name">{item}</p>
        <p className="service__price">{`from $${selectedService[item].price}`}</p>
        <div className="service__buttons d-flex">
          <Button
            type="primary"
            disabled={!isAuthenticated}
            className="service__buttons--book"
            onClick={this.onBookHandler}
          >
            Book
          </Button>
          <Button
            type="danger"
            disabled={!isAuthenticated}
            onClick={this.onCancelHandler}
          >
            Cancel
          </Button>
        </div>
      </div>
    ));
  }

  render() {
    const { services, isAuthenticated } = this.props;
    return (
      <div className="wrapper">
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
            <span onClick={this.onSignupHandler}> click for sign up.</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    services: state.services,
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(ServiceDetail);
