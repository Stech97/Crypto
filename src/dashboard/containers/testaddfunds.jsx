import React, { Component } from "react";
import TestAddFundsForm from "../components/testaddfundform.jsx";

class TestAddFunds extends Component {
	render() {
		const { handleClick, isOpened } = this.props;

		return (
			<div className={isOpened ? "popup" : "none"}>
				<div
					className="popup-layer"
					onClick={() => handleClick()}
				></div>
				<div className="popup-wrapper">
					<div className="popup-wrapper-header">
						<h1>Add Funds</h1>
					</div>
					<div className="popup-wrapper-cross">
						<img
							onClick={() => handleClick()}
							src="/img/close-icon.png"
						/>
					</div>
					<div className="popup-wrapper-content popup-testadd">
						<div className="popup-testadd-text">
							<p>
								To deposit bitcoin to this wallet, please send
								any amount to the wallet below. the money will
								appear in Bitcoin balance after 1 confirmation.
							</p>
						</div>
						<div className="popup-testadd-min">
							<img
								src="/img/add-funds-icon.png"
								alt="add-funds"
							/>
							<p>Min. amount for product $100</p>
						</div>
						<TestAddFundsForm closeForm={handleClick} />
					</div>
				</div>
			</div>
		);
	}
}

export default TestAddFunds;
