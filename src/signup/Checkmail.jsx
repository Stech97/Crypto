import React, { Component, Fragment } from "react";
import Header from "./Header";
//import "../styles/login.scss";

class Checkmail extends Component {
	render() {
		return (
			<Fragment>
				<Header />
				<section className="login">
					<div className="login-wrapper wrapper">
						<div className="login-header">
							<h1>
								We have sent you confirmation email. Please
								check your mail box.
							</h1>
						</div>
					</div>
				</section>
			</Fragment>
		);
	}
}

export default Checkmail;
