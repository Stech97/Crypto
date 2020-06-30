import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, SubmissionError, reduxForm } from "redux-form";

const validateFloat = (value) => (value ? parseFloat(value).toString() : "0");

const textField = ({ input, meta: { touched, error, warning } }) => {
	return (
		<div className="popup-invest-field popup-invest-amount">
			<label htmlFor="invest-amount" className="popup-invest-field-label">
				Choose Amount
			</label>
			<input
				{...input}
				id="invest-amount"
				type="text"
				className="popup-invest-field-input"
			/>
			{touched &&
				((error && (
					<p className="error popup-invest-field-error">
						<i class="fas fa-exclamation-circle"></i>
						{" " + error}
					</p>
				)) ||
					(warning && (
						<p className="error popup-invest-field-error">
							<i class="fas fa-exclamation-circle"></i>
							{" " + warning}
						</p>
					)))}
		</div>
	);
};

const selectField = ({ input, meta: { touched, error, warning } }) => {
	return (
		<div className="popup-invest-field popup-invest-balance">
			<label htmlFor="invest-wallet" className="popup-invest-field-label">
				Choose Balance
			</label>
			<select
				id="invest-wallet"
				type="text"
				className="popup-invest-field-input"
			>
				<option value="BTC">BTC 0.232</option>
				<option value="USD">$6000 </option>
				<option value="DET">DET 6000</option>
			</select>
			{touched &&
				((error && (
					<p className="error popup-invest-field-error">
						<i class="fas fa-exclamation-circle"></i>
						{" " + error}
					</p>
				)) ||
					(warning && (
						<p className="error popup-invest-field-error">
							<i class="fas fa-exclamation-circle"></i>
							{" " + warning}
						</p>
					)))}
		</div>
	);
};

class InvestPopupForm extends Component {
	render() {
		return (
			<form className="popup-invest">
				<Field component={selectField} name="wallet" />
				<Field
					component={textField}
					name="amount"
					normalize={validateFloat}
				/>
				<h6 className="popup-invest-usd">$200</h6>
				<h6 className="popup-invest-minamount">
					{"Min. amount for product $" + this.props.minamount}
				</h6>
				<div className="popup-invest-button">
					<button>Buy Now</button>
				</div>
			</form>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

connect(mapStateToProps, mapDispatchToProps)(InvestPopupForm);

export default reduxForm({
	form: "InvestPopupForm",
})(InvestPopupForm);
