import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ServicesCard from "../../components/Card/ServicesCard";
import Spinner from "../../components/Spinner/Spinner";
import { Routes } from "../../constants/routes";
import "./Services.css";

class Services extends React.Component {
  state = {
    filteredServices: [],
    forWhom: "",
  };

  componentDidMount() {
    const { onInitServices } = this.props;
    onInitServices();
    this.setState({ forWhom: window.location.pathname });
  }

  componentDidUpdate(prevProps) {
    const { services } = this.props;
    if (prevProps.services !== services) {
      this.afterSetStateFinished(services);
    }
  }

  selectHandler = (item) => {
    const { forWhom } = this.state;
    const { services, onInitSelectedServices } = this.props;

    forWhom === Routes.SERVICES_FOR_WOMEN
      ? onInitSelectedServices(services.women[item], forWhom)
      : onInitSelectedServices(services.men[item], forWhom);
  };

  afterSetStateFinished = (arr) => {
    const { forWhom } = this.state;

    forWhom === Routes.SERVICES_FOR_WOMEN
      ? this.setState({ filteredServices: Object.keys(arr.women) })
      : this.setState({ filteredServices: Object.keys(arr.men) });
  };

  renderServicesList = () => {
    const { filteredServices, forWhom } = this.state;

    return filteredServices ? (
      filteredServices.map((item) => (
        <Link
          to={`${forWhom}/${item.toLowerCase()}`}
          className="services__card"
          key={item}
          onClick={() => this.selectHandler(item)}
        >
          <ServicesCard service={item} forWhom={forWhom} />
        </Link>
      ))
    ) : (
      <p>No Services</p>
    );
  };

  renderContent = () => {
    const { loading } = this.props;

    return loading ? (
      <Spinner />
    ) : (
      <div className="d-flex space-between fadeIn services__list">
        {this.renderServicesList()}
      </div>
    );
  };

  render() {
    const { forWhom } = this.state;
    let src = "";
    let classAdd = "";
    if (forWhom === Routes.SERVICES_FOR_WOMEN) {
      src = "images/services-women.png";
      classAdd = "";
    } else {
      classAdd = "services__image--men";
      src = "images/services-men.png";
    }

    return (
      <div className="wrapper d-flex flex-column h-100">
        <div className="w-100 d-flex justify-center">
          <img
            className={`services__image ${classAdd}`}
            alt="services"
            src={src}
          ></img>
        </div>
        <div className="services__container">{this.renderContent()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    services: state.services.services,
    error: state.services.error,
    loading: state.services.loading,
    isAuthenticated: state.auth.token !== null,
    selectedService: state.selectedService,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitServices: () => dispatch(actions.initServices()),
    onInitSelectedServices: (service, forWhom) =>
      dispatch(actions.setSelectedService(service, forWhom)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
