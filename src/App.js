import React from "react";
import { BrowserRouter, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./containers/Home/Home";
import Services from "./containers/Services/Services";
import ServiceDetail from "./components/ServiceDetail/ServiceDetail";
import Account from "./containers/Account/Account";
import Appointment from "./containers/Appointment/Appointment";
import Auth from "./containers/Auth/Auth";
import Signin from "./containers/Signin/Signin";
import Logout from "./components/Logout/Logout";
import Header from "./components/Header/Header";
import * as actions from "./actions";

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <BrowserRouter>
        <Header></Header>
        <main className="container">
          <Route path="/" exact component={Home} />
          <Route path="/services-for-men" exact component={Services} />
          <Route path="/services-for-women" exact component={Services} />
          <Route path="/services-for-women/color" component={ServiceDetail} />
          <Route
            path="/services-for-women/haircutting"
            component={ServiceDetail}
          />
          <Route path="/services-for-women/makeup" component={ServiceDetail} />
          <Route path="/services-for-women/waxing" component={ServiceDetail} />
          <Route path="/services-for-men/color" component={ServiceDetail} />
          <Route
            path="/services-for-men/haircutting"
            component={ServiceDetail}
          />
          <Route path="/services-for-men/waxing" component={ServiceDetail} />
          {/* <Route path="/login" component={Auth} /> */}
          <Route path="/login" component={Signin} />
        </main>
        <Redirect to="/" />
      </BrowserRouter>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <BrowserRouter>
          <Header></Header>
          <main className="container">
            <Route path="/" exact component={Home} />
            <Route path="/services-for-men" exact component={Services} />
            <Route path="/services-for-women" exact component={Services} />
            <Route path="/services-for-women/color" component={ServiceDetail} />
            <Route
              path="/services-for-women/haircutting"
              component={ServiceDetail}
            />
            <Route
              path="/services-for-women/makeup"
              component={ServiceDetail}
            />
            <Route
              path="/services-for-women/waxing"
              component={ServiceDetail}
            />
            <Route path="/services-for-men/color" component={ServiceDetail} />
            <Route
              path="/services-for-men/haircutting"
              component={ServiceDetail}
            />
            <Route path="/services-for-men/waxing" component={ServiceDetail} />
            {/* <Route path="/login" component={Auth} /> */}
            <Route path="/login" component={Signin} />
            <Route path="/logout" component={Logout} />
            <Route path="/account" component={Account} />
            <Route path="/appointment" component={Appointment} />
          </main>
          <Redirect to="/" />
        </BrowserRouter>
      );
    }
    return <div>{routes}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
