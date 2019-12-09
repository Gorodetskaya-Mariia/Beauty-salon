import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";
import ServicesCard from "../../Card/ServicesCard";
import Spinner from "../../Spinner/Spinner";
import "./Services.css";

class Services extends React.Component {
  state = {
    filteredServices: [],
    forWhom: ""
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

  selectHandler(item) {
		const { forWhom } = this.state;
		const { services, onInitSelectedServices } = this.props;
		
		forWhom === "/services-for-women"
		? onInitSelectedServices(services.women[item])
		: onInitSelectedServices(services.men[item]);
  }

  afterSetStateFinished(arr) {
    const { forWhom } = this.state;

    forWhom === "/services-for-women"
      ? this.setState({ filteredServices: Object.keys(arr.women) })
      : this.setState({ filteredServices: Object.keys(arr.men) });
  }

  renderList() {
		const { filteredServices, forWhom } = this.state;
		const { loading } = this.props;
		let servicesList = (	
				filteredServices.map(item => (
				<Link
					to={`${forWhom}/${item.toLowerCase()}`}
					className="services__card"
					key={item}
					onClick={() => this.selectHandler(item)}
				>
					<ServicesCard service={item} forWhom={forWhom}/>
				</Link>
			))
		);

		let content = (
			<div className="d-flex space-between fadeIn">
				{servicesList}
				</div>
		);
	
		if (loading) {
      content = <Spinner />;
    }
    return (
			content
		)
  }

  render() {
    const { forWhom, filteredServices } = this.state;
		let src = "";
		let classAdd = "";
		if(forWhom === "/services-for-women"){
			src="images/services-women.png";
			classAdd = "";
		} else {
			classAdd = "services__image--men";
			src="images/services-men.png";
		}

    return (			
      <div className="wrapper">
				<div className="w-100 d-flex justify-center">
					<img
						className={`services__image ${classAdd}`}
						alt="services"
						src={ src }
					></img>
					</div>
				<div className="services__container">
					{filteredServices && this.renderList()}
				</div>        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    services: state.services.services,
		error: state.services.error,
		loading: state.services.loading,
		isAuthenticated: state.auth.token !== null,
		selectedService: state.selectedService,
  };
};

const mapDispatchToProps = dispatch => {
  return {
		onInitServices: () => dispatch(actions.initServices()),
		onInitSelectedServices: (state) => dispatch(actions.setSelectedService(state))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
