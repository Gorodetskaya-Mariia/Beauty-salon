import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";

class Signup extends React.Component {
  render() {
    return (
      <div className="container--form">
        <AuthForm isSignup={true} />
      </div>
    );
  }
}

export default Signup;
