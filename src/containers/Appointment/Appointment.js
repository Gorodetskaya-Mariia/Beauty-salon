import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions/";
import Spinner from "../../components/Spinner/Spinner";

const services = ["Color", "Haircutting", "Makeup", "Waxing"];
const time = [
  "10AM to 11AM",
  "11AM to 12PM",
  "12PM to 13PM",
  "13PM to 14PM",
  "15PM to 16PM",
  "16PM to 17PM",
  "17PM to 18PM"
];
const required = value =>
  value || typeof value === "number" ? undefined : "Required";
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

class Appointment extends React.Component {
  state = {
    services: [],
  }

  componentDidMount() {
    this.setServices();
  }

  setServices = () => {
    const { services,  firstService} = this.props;
    const unfilteredServices = Object.keys(services).filter(service => service !== "description");
    const filteredServices = unfilteredServices.sort(service => service === firstService ? -1: 0);
    this.setState({ services: filteredServices });
  }

  onSubmit = formValues => {
    const { onCreateAppointment, userId, token } = this.props;
    onCreateAppointment(formValues, userId, token);
    this.props.history.push("/account");
  };

  renderSelect = ({ input, label, options, meta: { touched, error } }) => {
    return (
      <div className="form__field">
        <label>{label}</label>
        <div className="form__field-select">
          <select {...input}>
            <option value={options[0]}>{options[0]}</option>
            {options.map((option, index) => (
              index !== 0 && <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          {touched && error && <div className="error">{error}</div>}
        </div>
      </div>
    );
  };

  render() {
    const { handleSubmit, loading } = this.props;
    const { services } = this.state;
    let form = (
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

    if (loading) {
      form = <Spinner />;
    }

    return <div className="container--form">{form}</div>;
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.service) errors.service = "You have to select a service";
  if (!formValues.time) errors.time = "You have to select time";
  if (!formValues.name) errors.name = "You have to type your name";
  return errors;
};

const mapStateToProps = state => {
  return {
    loading: state.account.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    services: state.services.selectedService,
    firstService: state.services.setServiceForBooking,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateAppointment: (formValues, userId, token) =>
      dispatch(actions.createAppointment(formValues, userId, token))
  };
};

Appointment = connect(mapStateToProps, mapDispatchToProps)(Appointment);

export default reduxForm({
  form: "createAppointment",
  validate
})(Appointment);
