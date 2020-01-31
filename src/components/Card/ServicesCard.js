import React from "react";
import { Card } from "antd";
import "./ServicesCard.css";

const { Meta } = Card;
class ServicesCard extends React.Component {
  render() {
    const { service, forWhom } = this.props;
    return (
      <Card
        hoverable
        className="services__card"
        cover={
          <img
            alt="example"
            src={`images${forWhom}-${service.toLowerCase()}.png`}
          />
        }
      >
        <Meta title={service} description="" />
      </Card>
    );
  }
}

export default ServicesCard;
