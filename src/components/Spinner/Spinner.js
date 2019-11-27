import React from "react";
import { Spin } from "antd";
import "./Spinner.css";

const spinner = () => (
  <div className="spinner-wrapper">
    <Spin size="large" />
  </div>
);

export default spinner;
