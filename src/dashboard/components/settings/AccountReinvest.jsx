import React, { Component, Fragment } from 'react'

export default class AccountReinvest extends Component {
	render() {	
		return(
			<div className="settings-reinvest settings-whitebox">
				<h5 className="settings-reinvest-header">
					Automatic Re-Invest
				</h5>
				<div className="settings-reinvest-form">
					<label htmlFor="reinvest">Enable Auto Re-Invest</label>
					<input id="reinvest" type="checkbox"/>
					<div className="settings-reinvest-form-text">
						<p>When automatic re-invest ON, 
						Defima will automatically buy new 
						Products once the min. Amount for 
						product buy is reached with profits 
						from running products and commissions.
						<br/>With this on you will profit from the 
						compound interest effect.</p>
					</div>
				</div>
			</div>
		)
	}
}