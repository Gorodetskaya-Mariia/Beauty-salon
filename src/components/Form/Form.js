import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import {
  required,
  minLength3,
  maxLength15,
  alpha,
  phoneNumber,
} from "../../utilities/validation";
import "./Form.css";

class Form extends React.Component {
  onSubmit = (formValues) => {
    const {
      onForm,
      onFormUpdate,
      userId,
      token,
      newUser,
      id,
      changeInfoHandler,
    } = this.props;
    if (newUser) {
      onForm(formValues, userId, token);
      changeInfoHandler();
    } else {
      onFormUpdate(formValues, id, userId, token);
      if (changeInfoHandler) {
        changeInfoHandler();
      }
    }
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div className="form__field">
        <label>{label}</label>
        <div>
          <input {...input} type={type} placeholder={label} />
          {touched && error && <div className="error">{error}</div>}
        </div>
      </div>
    );
  };

  renderForm = () => {
    const { handleSubmit, submitting, loading } = this.props;
    return loading ? null : (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="username"
          type="text"
          component={this.renderField}
          label="Your name"
          validate={[required, minLength3, maxLength15, alpha]}
        />
        <Field
          name="phone"
          type="phone"
          component={this.renderField}
          label="Phone number"
          validate={[required, phoneNumber]}
        />
        <div>
          <button type="submit" disabled={submitting} className="form__button">
            Save
          </button>
        </div>
      </form>
    );
  };

  renderErrorMessage = () => {
    const { error } = this.props;

    return error ? <p>{error.message}</p> : null;
  };

  render() {
    return (
      <div>
        {this.renderErrorMessage()}
        {this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.userData.error,
    loading: state.userData.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    userData: state.userData.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onForm: (formValues, userId, token) =>
      dispatch(actions.addUserData(formValues, userId, token)),
    onFormUpdate: (formValues, id, userId, token) =>
      dispatch(actions.updateUserData(formValues, id, userId, token)),
  };
};

Form = connect(mapStateToProps, mapDispatchToProps)(Form);

export default reduxForm({
  form: "form",
})(Form);
