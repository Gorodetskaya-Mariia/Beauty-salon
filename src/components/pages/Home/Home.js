import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Carousel } from "antd";
import "./Home.css";

class Home extends React.Component {
  render() {
		const { isAuthenticated } = this.props;
    return (
      <div className="wrapper wrapper--home d-flex space-between align-items-center">
				<div className="">
					<h2 className="title">Cuts, Colour Specialists, Hair, Waxing for Men & Women</h2>
					{isAuthenticated
					? (<Link to="/appointment">
								<Button
									type="primary"
									size={"large"}
								>
									Book an appointment
								</Button>
							</Link>)
					: (<Link to="/login">
								<Button
									type="primary"
									size={"large"}
								>
									Sign up for booking
								</Button>
						</Link>)
					}
				</div>
				<Carousel dotPosition="bottom" autoplay="true">
          <div className="slide">
					<img src="/images/stylist-1.jpg"></img>
            <h3>Anna</h3>
						<div>Cutting Specialist</div>
          </div>
          <div>
					<img src="/images/stylist-2.png"></img>
            <h3>Whitney</h3>
						<div>Makeup Artist,<br/> Facial Waxing Specialist</div>
          </div>
          <div>
					<img src="/images/stylist-3.jpg"></img>
            <h3>Karla</h3>
						<div>Master Colorist</div>
          </div>         
        </Carousel>   
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Home);
