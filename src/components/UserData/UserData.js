import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Form from "../../components/Form/Form";
import Spinner from "../../components/Spinner/Spinner";
import { Button } from "antd";

class UserData extends React.Component {
  state = { onChange: false, id: null };

  componentDidMount() {
    const { onFetchUserData, token, userId } = this.props;
    onFetchUserData(token, userId);
  }

  onChangeDataHandler = (e) => {
    const id = e.target.getAttribute("data-id");
    this.setState({ onChange: true });
    this.setState({ id: id });
  };

  changeInfoHandler = () => {
    this.setState({ onChange: false });
  };

  renderForm = () => {
    const { onChange, id } = this.state;

    return onChange ? (
      <Form
        newUser={false}
        id={id}
        changeInfoHandler={this.changeInfoHandler}
      />
    ) : null;
  };

  renderUserDataList = () => {
    const { userData } = this.props;

    return userData.length ? (
      userData.map((item) => (
        <div
          key={item.id ? item.id : null}
          className="account__card-row d-flex flex-column"
        >
          <div className="account__card-item">
            <strong>Your name: </strong>
            <span>{item.username ? item.username : "Please"}</span>
          </div>
          <div className="account__card-item">
            <strong>Phone number: </strong>
            <span>{item.username ? item.phone : "Please"}</span>
          </div>
          <Button
            type="primary"
            onClick={this.onChangeDataHandler}
            data-id={item.id}
          >
            Change data
          </Button>
          {this.renderForm()}
        </div>
      ))
    ) : (
      <div>
        <div>
          Please fill the form bellow. The information requires for booking an
          appointment.
        </div>
        <Form newUser={false} />
      </div>
    );
  };

  render() {
    const { loading } = this.props;

    return (
      <Fragment>{loading ? <Spinner /> : this.renderUserDataList()}</Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.userData.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    userData: state.userData.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUserData: (token, userId) =>
      dispatch(actions.fetchUserData(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserData);
