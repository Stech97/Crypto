import React, { Component, Fragment } from 'react'

export default class AccountVerification extends Component {
	render() {
		return(
			<div className="settings-verification">
				<h3 className="settings-verification-header">
					Account Verification (KYC)
				</h3>
				<div className="settings-verification-box settings-whitebox">
					<h5 className="settings-verification-box-upload">
						Upload Passport 
						or National ID
					</h5>
					<button className="settings-verification-box-upload-gray-button">
						Select file
					</button>
					<h5 className="settings-verification-box-proof">
						Proof of address
						e.g. phone or utilities bill
					</h5>
					<button className="settings-verification-box-proof-gray-button">
						Select file
					</button>
					<h5 className="settings-verification-box-selfie">
						Selfie with passport
						or National ID						
					</h5>
					<button className="settings-verification-box-selfie-gray-button">
						Select file
					</button>
					<button className="settings-verification-box-button settings-orange-button">Save</button>
				</div>
			</div>
		)
	}
}