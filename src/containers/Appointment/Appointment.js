import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../store/actions/";
import { Routes } from "../../constants/routes";
import Spinner from "../../components/Spinner/Spinner";
import { defaultServices, time } from "../../constants/constants";
import { required, alphaNumeric } from "../../utilities/validation";

class Appointment extends React.Component {
  state = {
    services: [],
  };

  componentDidMount() {
    this.setServices();
  }

  setServices = () => {
    const { services, firstService } = this.props;
    if (services && firstService) {
      const unfilteredServices = Object.keys(services).filter(
        (service) => service !== "description"
      );
      const filteredServices = unfilteredServices.sort((service) =>
        service === firstService ? -1 : 0
      );
      this.setState({ services: filteredServices });
    } else {
      this.setState({ services: defaultServices });
    }
  };

  onSubmit = (formValues) => {
    const { onCreateAppointment, userId, token } = this.props;
    onCreateAppointment(formValues, userId, token);
    this.props.history.push(Routes.ACCOUNT);
  };

  renderSelect = ({ input, label, options, meta: { touched, error } }) => {
    return (
      <div className="form__field">
        <label>{label}</label>
        <div className="form__field-select">
          <select {...input}>
            <option value="">...</option>
            {options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          {touched && error && <div className="error">{error}</div>}
        </div>
      </div>
    );
  };

  renderForm = () => {
    const { handleSubmit, loading } = this.props;
    const { services } = this.state;
    return loading ? (
      <Spinner />
    ) : (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="service"
          component={this.renderSelect}
          label="Select a service"
          options={services}
          validate={[required]}
        ></Field>
        <Field
          name="time"
          component={this.renderSelect}
          label="Choose time"
          options={time}
          validate={[required]}
        ></Field>
        <div className="form__field">
          <label>Your message</label>
          <div>
            <Field
              name="message"
              component="textarea"
              type="text"
              className="form__field--text"
              placeholder=""
              validate={[alphaNumeric]}
            />
          </div>
        </div>
        <button className="form__button">Submit</button>
      </form>
    );
  };

  render() {
    return <div className="container--form">{this.renderForm()}</div>;
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.service) errors.service = "You have to select a service";
  if (!formValues.time) errors.time = "You have to select time";
  if (!formValues.name) errors.name = "You have to type your name";
  return errors;
};

const mapStateToProps = (state) => {
  return {
    loading: state.account.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    services: state.services.selectedService,
    firstService: state.services.setServiceForBooking,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAppointment: (formValues, userId, token) =>
      dispatch(actions.createAppointment(formValues, userId, token)),
  };
};

Appointment = connect(mapStateToProps, mapDispatchToProps)(Appointment);

export default reduxForm({
  form: "createAppointment",
  validate,
})(Appointment);
