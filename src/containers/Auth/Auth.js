import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import * as actions from "../../store/actions";
import Spinner from "../../components/Spinner/Spinner";
import Form from "../../components/Form/Form";
import { Modal } from "antd";

const required = value =>
  value || typeof value === "number" ? undefined : "Required";

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength6 = minLength(6);

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

let FormInfo = null;
class Auth extends React.Component {
  state = { isSignup: true, flag: false, visible: true };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  changeInfoHandler = () => {
    this.props.history.push("/");
  };

  onSubmit = formValues => {
    const { onAuth } = this.props;
    const { isSignup } = this.state;
    onAuth(formValues.email, formValues.password, isSignup);

    if (isSignup) {
      FormInfo = (
        <div>
          <div className="form__info">
            Please provide us information about you.
          </div>
          <div className="form__info">
            The information requires for booking an appointment.
          </div>
          <Form newUser={true} changeInfoHandler={this.changeInfoHandler} />
        </div>
      );
      this.setState({ flag: true });
    }
    this.setState({ visible: true });
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div className="form__field">
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched && error && <div className="error">{error}</div>}
        </div>
      </div>
    );
  };

  OkHandle = () => {
    this.setState({ visible: false });
    this.setState({ flag: false });
  };

  CancelHandle = () => {
    this.setState({ visible: false });
    this.setState({ flag: false });
  };

  render() {
    const {
      handleSubmit,
      submitting,
      loading,
      error,
      isAuthenticated
    } = this.props;
    const { flag, isSignup, visible } = this.state;
    let errorMessage = null;
    let form = null;

    if (!flag) {
      form = (
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="email"
            type="email"
            component={this.renderField}
            label="Email"
            validate={[email, required]}
          />
          <Field
            name="password"
            type="password"
            component={this.renderField}
            label="Password"
            validate={[minLength6, required]}
          />
          <div>
            <button
              type="submit"
              disabled={submitting}
              className="form__button"
            >
              Submit
            </button>
          </div>
        </form>
      );
    }

    if (loading) {
      form = <Spinner />;
    }

    if (error) {
      errorMessage = (
        <Modal
          title=""
          visible={visible}
          onOk={this.OkHandle}
          onCancel={this.CancelHandle}
        >
          <p>{error.message}</p>
        </Modal>
      );
      FormInfo = null;
    }

    let authRedirect = null;
    if (isAuthenticated && !isSignup) {
      authRedirect = <Redirect to="/" />;
    }

    let buttonSwitch = null;
    if (!isAuthenticated) {
      buttonSwitch = (
        <button onClick={this.switchAuthModeHandler} className="form__button">
          Switch to {isSignup ? "Sign in" : "Sign Up"}
        </button>
      );
    }

    let message = null;
    if (!isAuthenticated) {
      message = (
        <div className="form__info">
          Please {isSignup ? "Sign up" : "Sign in"}
        </div>
      );
    }

    let messageToSwitch = null;
    if (!isAuthenticated) {
      messageToSwitch = (
        <div className="form__info">
          If you{" "}
          {isSignup
            ? "already HAVE an account please press button bellow "
            : "DO NOT have an account please press button bellow "}
          and enter email and password.
        </div>
      );
    }

    return (
      <div className="container--form">
        {authRedirect}
        {errorMessage}
        {message}
        {form}
        {FormInfo}
        {messageToSwitch}
        {buttonSwitch}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  };
};

Auth = withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));

export default reduxForm({
  form: "auth"
})(Auth);
