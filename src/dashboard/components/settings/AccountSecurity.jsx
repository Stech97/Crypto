import React, { Component, Fragment } from 'react'
import { getFormValues, reduxForm, Field } from 'redux-form'

export default class AccountSecurity extends Component {
	render() {
		return(
			<div className="settings-security">
				<h3 className="settings-security-header">Security</h3>
				<div className="settings-security-box settings-whitebox">
					<div className="settings-security-box-text">
						<p>Scan the QR–code with your Google Authenticator app and enter the confirmation code in the field below.</p>
					</div>
					<div className="settings-security-box-qr">
						<img src="/img/security-qr.png" alt="security-qr"/>
					</div>
					<form className="settings-security-box-form">
						<input type="text" className="settings-security-box-form-input"/>
						<button className="settings-orange-button settings-security-box-form-button">Submit</button>
					</form>
				</div>
			</div>
		)
	}
}