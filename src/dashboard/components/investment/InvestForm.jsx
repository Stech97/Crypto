import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, SubmissionError, reduxForm } from "redux-form";
import { getBalance } from "../../actions/getBalance";
import { RateRequest } from "../../actions/getRate";

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

const selectField = ({
	input,
	balance,
	type,
	meta: { touched, error, warning },
}) => {
	return (
		<div className="popup-invest-field popup-invest-balance">
			<label htmlFor="invest-wallet" className="popup-invest-field-label">
				Choose Balance
			</label>
			<select
				id={"invest-wallet" + type}
				type="text"
				className="popup-invest-field-input"
			>
				<option value="BTC">{"BTC " + balance.btc}</option>
				<option value="USD">{"$" + balance.usd}</option>
				<option value="DET">{"DET " + balance.det}}</option>
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
	state = {
		wallet: "BTC",
		amount: 0,
		rateBTC: 0,
		rateDET: 0,
		amountUSD: 0,
	};

	changeWallet = (wallet) => {
		this.setState({
			...this.state,
			wallet,
		});
	};

	componentDidMount = () => {
		this.props.getBalanceAction();
	};

	getRate = () => {};

	convertToUSD = (rate) => rate * this.props.wallet;

	render() {
		const {
			minamount,
			type,
			balance,

			submitting,
			handleSubmit,
			error,
			pristine,
		} = this.props;

		const { wallet, amount, rateBTC, rateDET, amountUSD } = this.state;

		return (
			<form className="popup-invest">
				<Field
					component={selectField}
					name="wallet"
					balance={balance}
					type={type}
					onChange={(e) => this.changeWallet(e.target.value)}
				/>
				<Field
					component={textField}
					name="amount"
					normalize={validateFloat}
					type={type}
				/>
				<h6 className="popup-invest-usd">{"$" + amountUSD}</h6>
				<h6 className="popup-invest-minamount">
					{"Min. amount for product $" + minamount}
				</h6>
				<div className="popup-invest-button">
					<button>Buy Now</button>
				</div>
			</form>
		);
	}
}

const mapStateToProps = (store) => ({
	balance: store.ContentBalanceContainer,
});

const mapDispatchToProps = (dispatch) => ({
	getBalanceAction: () => dispatch(getBalance()),
});

InvestPopupForm = connect(mapStateToProps, mapDispatchToProps)(InvestPopupForm);

export default reduxForm({
	form: "InvestPopupForm",
})(InvestPopupForm);
