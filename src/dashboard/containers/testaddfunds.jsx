import React, { Component } from 'react'
import TestAddFundsForm from '../components/testaddfundform.jsx'

class TestAddFunds extends Component {
	
	render() {
		const { handleClick, isOpened } = this.props

		return(
			<div className={isOpened ? "test-add-funds" : "none"}>
				<div className="test-add-funds-wrapper">
					<div className="test-add-funds-header">
						<h2>Add Funds</h2>
					</div>
					<div className="test-add-funds-close">
						<img onClick={() => handleClick() } src="img/close-icon.png" />
					</div>
					<div className="test-add-funds-text">
						<p>To deposit bitcoin to this wallet, please
						send any amount to the wallet below.
						the money will appear in Bitcoin
						balance after 1 confirmation.</p>
					</div>
					<div className="test-add-funds-min">
						<img src="img/add-funds-icon.png" alt="add-funds" />
						<p>Min. amount for product $100</p>
					</div>
					<TestAddFundsForm
						closeForm = { handleClick }
					/>
				</div>
			</div>
		)
	}
}

export default TestAddFunds