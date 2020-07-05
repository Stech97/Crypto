import React, { Component, Fragment } from "react";
import AccountInfo from "./AccountInfo";
import AccountVerification from "./AccountVerification";
import AccountSecurity from "./AccountSecurity";
import AccountChange from "./AccountChangePassword";
import AccountReinvest from "./AccountReinvest";

export default class SettingsContent extends Component {
	render() {
		return (
			<div className="settings-box">
				<div className="settings-left">
					<AccountInfo />
					<AccountVerification />
				</div>
				<div className="settings-right">
					<AccountSecurity />
					<AccountChange />
					<AccountReinvest />
				</div>
			</div>
		);
	}
}
