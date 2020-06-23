import React, { Component, Fragment } from 'react'

export default class AccountVerification extends Component {
	render() {
		return(
			<div className="settings-verification">
				<h5 className="settings-verification-header">
					Account Verification (KYC)
				</h5>
				<div className="settings-verification-box settings-whitebox">
					<h5 className="settings-verification-box-upload"></h5>
					<button className="settings-verification-box-upload-gray-button"></button>
					<h5 className="settings-verification-box-proof"></h5>
					<button className="settings-verification-box-proof-gray-button"></button>
					<h5 className="settings-verification-box-selfie"></h5>
					<button className="settings-verification-box-selfie-gray-button"></button>
					<button className="settings-verification-box-button settings-orange-button">Save</button>
				</div>
			</div>
		)
	}
}