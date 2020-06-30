import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import * as actions from "../../store/actions";
import Spinner from "../../components/Spinner/Spinner";
import { formatServerMessage } from "../../utilities/formatServerMessage";
import { required, minLength6, email } from "../../utilities/validation";
import { Modal } from "antd";

class AuthForm extends React.Component {
  state = {
    isError: false,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (prevProps.error !== error) {
      error && this.setState({ isError: true });
    }
  }

  onRedirectHandler = () => {
    const { isSignup } = this.props;
    isSignup
      ? this.props.history.push("/signin")
      : this.props.history.push("/signup");
  };

  onSubmit = (formValues) => {
    const { onAuth, isSignup } = this.props;
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
    const { handleSubmit, submitting, loading, isSignup } = this.props;
    return loading ? (
      <Spinner />
    ) : (
      <Fragment>
        <div className="form__info">
          {isSignup ? "Create your account" : "Sign in to your account"}
        </div>
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
          {isSignup ? "Already have an account?" : "Don't have an account yet?"}
          <span className="form__link" onClick={this.onRedirectHandler}>
            {" "}
            {isSignup ? "Sign in." : "Sign up."}
          </span>
        </div>
      </Fragment>
    );
  };

  render() {
    const { isAuthenticated } = this.props;
    const { isError } = this.state;

    let authRedirect = null;
    if (isAuthenticated) {
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
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onClearErrors: () => dispatch(actions.clearError()),
  };
};

AuthForm = withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthForm));

export default reduxForm({
  form: "auth",
})(AuthForm);
