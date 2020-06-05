import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import * as actions from "../../actions";
import Spinner from "../../components/Spinner/Spinner";
import { formatServerMessage } from "../../utilities/formatServerMessage";
import { Modal } from "antd";

const required = (value) =>
  value || typeof value === "number" ? undefined : "Required";

export const minLength = (min) => (value) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength6 = minLength(6);

const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

class Signin extends React.Component {
  state = {
    isSignup: false,
    isError: false,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (prevProps.error !== error) {
      error && this.setState({ isError: true });
    }
  }

  onSignupHandler = () => {
    this.props.history.push("/signup");
  };

  onSubmit = (formValues) => {
    const { onAuth } = this.props;
    const { isSignup } = this.state;
    onAuth(formValues.email, formValues.password, isSignup);
  };

  OkHandle = () => {
    const { onClearErrors } = this.props;
    onClearErrors();
    this.setState({ isError: false });
  };

  CancelHandle = () => {
    const { onClearErrors } = this.props;
    onClearErrors();
    this.setState({ isError: false });
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

  renderError = () => {
    const { error } = this.props;
    return (
      <Modal
        title=""
        visible={true}
        onOk={this.OkHandle}
        onCancel={this.CancelHandle}
      >
        <p>{formatServerMessage(error.message)}</p>
      </Modal>
    );
  };

  renderForm = () => {
    const { handleSubmit, submitting, loading } = this.props;
    return loading ? (
      <Spinner />
    ) : (
      <Fragment>
        <div className="form__info">Login to your account</div>
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
        <div className="form__info">
          Don't have an account yet?
          <span className="form__link" onClick={this.onSignupHandler}>
            {" "}
            Sign up.
          </span>
        </div>
      </Fragment>
    );
  };

  render() {
    const { isAuthenticated } = this.props;
    const { isSignup, isError } = this.state;

    let authRedirect = null;
    if (isAuthenticated && !isSignup) {
      authRedirect = <Redirect to="/" />;
    }

    return (
      <div className="container--form">
        {authRedirect}
        {isError && this.renderError()}
        {this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onClearErrors: () => dispatch(actions.clearError()),
  };
};

Signin = withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));

export default reduxForm({
  form: "auth",
})(Signin);
