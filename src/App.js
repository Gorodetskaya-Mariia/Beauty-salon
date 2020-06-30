import React from "react";
import { BrowserRouter, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions";
import { Routes } from "./constants/routes";
import Account from "./containers/Account/Account";
import Appointment from "./containers/Appointment/Appointment";
import Auth from "./containers/Auth/Auth";
import Home from "./containers/Home/Home";
import Services from "./containers/Services/Services";
import Signin from "./containers/Signin/Signin";
import Signup from "./containers/Signup/Signup";
import Header from "./components/Header/Header";
import ServiceDetail from "./components/ServiceDetail/ServiceDetail";
import Signout from "./components/Signout/Signout";

class App extends React.Component {
  componentDidMount() {
    const { onTryAutoSignup } = this.props;
    onTryAutoSignup();
  }

  renderRoutes = () => {
    const { isAuthenticated } = this.props;

    return isAuthenticated ? (
      <BrowserRouter>
        <Header></Header>
        <main className="container">
          <Route path={Routes.ACCOUNT} component={Account} />
          <Route path={Routes.APPOINTMENT} component={Appointment} />
          <Route path={Routes.MAIN} exact component={Home} />

          <Route path={Routes.SERVICES_FOR_MEN} exact component={Services} />
          <Route
            path={Routes.SERVICES_FOR_MEN_COLOR}
            component={ServiceDetail}
          />
          <Route
            path={Routes.SERVICES_FOR_MEN_HAIRCUTTING}
            component={ServiceDetail}
          />
          <Route
            path={Routes.SERVICES_FOR_MEN_WAXING}
            component={ServiceDetail}
          />

          <Route path={Routes.SERVICES_FOR_WOMEN} exact component={Services} />
          <Route
            path={Routes.SERVICES_FOR_WOMEN_COLOR}
            component={ServiceDetail}
          />
          <Route
            path={Routes.SERVICES_FOR_WOMEN_HAIRCUTTING}
            component={ServiceDetail}
          />
          <Route
            path={Routes.SERVICES_FOR_WOMEN_MAKEUP}
            component={ServiceDetail}
          />
          <Route
            path={Routes.SERVICES_FOR_WOMEN_WAXING}
            component={ServiceDetail}
          />

          <Route path={Routes.SIGNIN} component={Signin} />
          <Route path={Routes.SIGNUP} component={Signup} />
          <Route path={Routes.SIGNOUT} component={Signout} />
          {/* <Route path="/login" component={Auth} /> */}
        </main>
        <Redirect to={Routes.MAIN} />
      </BrowserRouter>
    ) : (
      <BrowserRouter>
        <Header></Header>
        <main className="container">
          <Route path={Routes.MAIN} exact component={Home} />

          <Route path={Routes.SERVICES_FOR_MEN} exact component={Services} />
          <Route
            path={Routes.SERVICES_FOR_MEN_COLOR}
            component={ServiceDetail}
          />
          <Route
            path={Routes.SERVICES_FOR_MEN_HAIRCUTTING}
            component={ServiceDetail}
          />
          <Route
            path={Routes.SERVICES_FOR_MEN_WAXING}
            component={ServiceDetail}
          />

          <Route path={Routes.SERVICES_FOR_WOMEN} exact component={Services} />
          <Route
            path={Routes.SERVICES_FOR_WOMEN_COLOR}
            component={ServiceDetail}
          />
          <Route
            path={Routes.SERVICES_FOR_WOMEN_HAIRCUTTING}
            component={ServiceDetail}
          />
          <Route
            path={Routes.SERVICES_FOR_WOMEN_MAKEUP}
            component={ServiceDetail}
          />
          <Route
            path={Routes.SERVICES_FOR_WOMEN_WAXING}
            component={ServiceDetail}
          />

          {/* <Route path="/login" component={Auth} /> */}
          <Route path={Routes.SIGNIN} component={Signin} />
          <Route path={Routes.SIGNUP} component={Signup} />
        </main>
        <Redirect to={Routes.MAIN} />
      </BrowserRouter>
    );
  };

  render() {
    return <div>{this.renderRoutes()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
