import React from "react";
import UserData from "../../components/UserData/UserData";
import BookedServices from "../../components/BookedServices/BookedServices";
import { Card } from "antd";
import "./Account.css";

class Account extends React.Component {
  render() {
    return <div className="wrapper">
      <div className="account__card-wrapper d-flex justify-center">
        <Card
          title="Booked services"
          bordered
          className="account__card"
        >
          <BookedServices/>
        </Card>
        <Card
          title="Personal information"
          bordered
          className="account__card"
        >
          <UserData/>
        </Card>
      </div>
    </div>;
  }
}

export default Account;
