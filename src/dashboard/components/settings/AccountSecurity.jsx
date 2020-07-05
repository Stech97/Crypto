import React, { Component, Fragment } from "react";
import { getFormValues, reduxForm, Field } from "redux-form";

export default class AccountSecurity extends Component {
	render() {
		return (
			<div className="settings-security">
				<h3 className="settings-security-header">Security</h3>
				<div className="settings-security-box settings-whitebox">
					<div className="settings-security-box-text">
						<p>
							Two-Factor-Authentification
							<br />
							Please insert your phone number with area code and
							verify your number.
						</p>
					</div>
					<form className="settings-security-box-form">
						<div className="settings-security-box-form-input">
							<input type="phone" placeholder="+44 1111 22222" />
							<p className="error">error</p>
						</div>
						<div className="settings-security-box-form-input">
							<input
								type="text"
								placeholder="Insert the code you got"
							/>
							<p className="error">error</p>
						</div>
						<button className="settings-orange-button settings-security-box-form-button">
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	}
}
