import React, { Component } from "react";

class WithdrawForm extends Component {
	render() {
		return (
			<form action="" className="popup-withdraw-form">
				<div className="popup-withdraw-form-header">
					<img src="" alt="" />
					<h2>Min. withdraw </h2>
				</div>
				<div className="popup-withdraw-form-input">
					<label htmlFor="">Your bitcoin address</label>
					<input type="text" />
					<p className="error popup-withdraw-form-error"></p>
				</div>
				<div className="popup-withdraw-form-input">
					<label htmlFor="">Insert Withdraw amount </label>
					<input type="number" step="any" min="10" />
					<p className="error popup-withdraw-form-error"></p>
				</div>
				<div className="popup-withdraw-form-button">
					<button>Withdraw now</button>
				</div>
			</form>
		);
	}
}

class Withdraw extends Component {
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
					<div className="popup-wrapper-content popup-withdraw">
						<div className="popup-withdraw-text">
							<p>
								To withdraw bitcoin, please let us know your
								bitcoin address below and your exact amount you
								want to withdraw. Withdraw requests will be
								executed every Monday and credited on your
								wallet within 72hours.
							</p>
						</div>
						<div className="popup-withdraw-min">
							<img
								src="/img/add-funds-icon.png"
								alt="add-funds"
							/>
							<p>Min. amount for product $100</p>
						</div>
						<WithdrawForm closeForm={handleClick} />
					</div>
				</div>
			</div>
		);
	}
}

export default Withdraw;
