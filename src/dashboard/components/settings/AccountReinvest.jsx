import React, { Component, Fragment } from "react";

export default class AccountReinvest extends Component {
	render() {
		return (
			<div className="settings-reinvest">
				<h5 className="settings-reinvest-header">
					Automatic Re-Invest
				</h5>
				<div className="settings-reinvest-form settings-whitebox">
					<label
						className="settings-reinvest-form-checkbox"
						htmlFor="reinvest"
					>
						<input id="reinvest" type="checkbox" />
						<span className="slider round"></span>
						<span className="settings-reinvest-form-checkbox-span">
							Enable Auto Re-Invest
						</span>
					</label>
					<div className="settings-reinvest-form-text">
						<p>
							When automatic re-invest ON, Defima will
							automatically buy new products (product category the
							last you selected) once the minimum amount for
							product buy is reached on Defima Token Balance from
							profits from running products and commissions.
							<br />
							With this on you will profit from the compound
							interest effect.
						</p>
					</div>
				</div>
			</div>
		);
	}
}
