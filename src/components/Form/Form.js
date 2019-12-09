import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./Form.css";

const required = value =>
  value || typeof value === "number" ? undefined : "Required";

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength3 = minLength(3);

const alpha = value =>
  value && /[^a-zA-Z]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{10})$/i.test(value)
    ? "Invalid phone number, must be 11 digits"
    : undefined;
class Form extends React.Component {
	
  onSubmit = formValues => {
		const {
      onForm,
      onFormUpdate,
      userId,
      token,
      newUser,
			id,
			changeInfoHandler,
    } = this.props;
		if(newUser) {
			onForm(formValues, userId, token);
			changeInfoHandler();
		} else {
			onFormUpdate(formValues, id, userId, token);
			if(changeInfoHandler){
				changeInfoHandler();
			}			
		}    
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div className="form__field">
        <label>{label}</label>
        <div>
          <input
						{...input}
						type={type}
						placeholder={label}
					/>
          {touched && error && <div className="error">{error}</div>}
        </div>
      </div>
    );
  };

  render() {
		const { handleSubmit, submitting, loading, error } = this.props;
		let errorMessage = null;
    let form = (
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
          <button
						type="submit"
						disabled={submitting}
						className="form__button"
					>
            Save
          </button>
        </div>
      </form>
    );

    if (loading) {
			form = null;			
    }

    if (error) {
      errorMessage = <p>{error.message}</p>;
    }

    return (
      <div>
        {errorMessage}
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.userData.error,
    loading: state.userData.loading,
    token: state.auth.token,
		userId: state.auth.userId,
		userData: state.userData.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onForm: (formValues, userId, token) =>
			dispatch(actions.addUserData(formValues, userId, token)),
		onFormUpdate: (formValues, id, userId, token) =>
      dispatch(actions.updateUserData(formValues, id, userId, token))
  };
};

Form = connect(mapStateToProps, mapDispatchToProps)(Form);

export default reduxForm({
  form: "form"
})(Form);
