import React, { Component } from "react";
import { connect } from "react-redux";
import {
	Field,
	formValueSelector,
	SubmissionError,
	reduxForm,
} from "redux-form";
import { getBalance } from "../../actions/getBalance";
import { RateRequest } from "../../actions/getRate";
import { buyInvest } from "../../actions/investForm";

const validateFloat = (value) => (value ? Number(value).toString() : "0");

const selector = formValueSelector("InvestPopupForm");

const textField = ({ input, type, meta: { touched, error, warning } }) => {
	return (
		<div className="popup-invest-field popup-invest-amount">
			<label
				htmlFor={"invest-amount-" + type}
				className="popup-invest-field-label"
			>
				Choose Amount
			</label>
			<input
				{...input}
				id={"invest-amount-" + type}
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
			<label
				htmlFor={"invest-wallet" + type}
				className="popup-invest-field-label"
			>
				Choose Balance
			</label>
			<select
				id={"invest-wallet" + type}
				type="text"
				className="popup-invest-field-input"
				{...input}
			>
				<option selected value="BTC">
					{"BTC " + balance.btc}
				</option>
				<option value="USD">{"USD " + balance.usd}</option>
				<option value="DET">{"DET " + balance.det}</option>
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
		amount: 0,
		rate: 0,
		amountUSD: 0,
	};

	componentDidMount = () => {
		this.props.getBalanceAction();
		this.getRate("BTC");
	};

	getRate = async (wallet) => {
		if (wallet !== "USD") {
			RateRequest(wallet, "USD").then((res) => {
				if (res.ok) {
					this.setState({
						...this.state,
						rate: res.data.rate,
					});
				} else if (res.error.status === 400) {
					this.setState({
						...this.state,
						rate: 0,
					});
				} else {
					this.setState({
						...this.state,
						rate: 0,
					});
				}
			});
		} else {
			this.setState({
				...this.state,
				rate: 1,
			});
		}
	};

	changeWallet = (e) => {
		var wallet = e.target.value;
		console.log("wallet", wallet);

		this.getRate(wallet);
		this.handleAmount(this.state.amount);
	};

	handleAmount = (amount) => {
		this.setState({
			...this.state,
			amount: amount,
			amountUSD: this.state.rate * amount,
		});
	};

	render() {
		const {
			minamount,
			type,
			balance,

			wallet,
			submitting,
			handleSubmit,
			error,
			pristine,
		} = this.props;

		let { rateBTC, rateDET, amountUSD } = this.state;

		const typeNum = () => {
			switch (type) {
				case "Small":
					return 1;
				case "Medium":
					return 2;
				case "Large":
					return 3;
				default:
					return undefined;
			}
		};

		const submit = (values) => {
			if (!values.wallet) {
				var wal = "BTC";
			} else {
				var wal = values.wallet;
			}
			var amount = Number(values["amount-" + type]);

			RateRequest(wal, "USD").then((res) => {
				if (res.ok) {
					var rate = res.data.rate;
					if (amount <= Number(balance[wal.toLowerCase()])) {
						if (amount * rate >= Number(minamount)) {
							this.props.buyInvestAction(amount, wal, typeNum());
						} else {
							throw new SubmissionError({
								_error:
									"Insufficient funds for this investment",
							});
						}
					} else {
						throw new SubmissionError({
							wallet: "Not enough cash",
						});
					}
				} else if (rate.error.status === 400) {
					var rate = 0;
					if (amount <= Number(balance[wal.toLowerCase()])) {
						if (amount * rate >= Number(minamount)) {
							this.props.buyInvestAction(amount, wal, typeNum());
						} else {
							throw new SubmissionError({
								_error:
									"Insufficient funds for this investment",
							});
						}
					} else {
						throw new SubmissionError({
							wallet: "Not enough cash",
						});
					}
				}
			});
		};

		return (
			<form onSubmit={handleSubmit(submit)} className="popup-invest">
				<Field
					component={selectField}
					name="wallet"
					type={type}
					balance={balance}
					onChange={(e) => this.changeWallet(e)}
				/>
				<Field
					component={textField}
					name={"amount-" + type}
					normalize={validateFloat}
					type={type}
					onChange={(e) => this.handleAmount(e.target.value)}
					defaultValue="BTC"
				/>
				<h6 className="popup-invest-usd">
					{wallet === "USD" ? "" : " => $" + amountUSD}
				</h6>
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
	buyInvestAction: (amount, currency, type) =>
		dispatch(buyInvest(amount, currency, type)),
});

InvestPopupForm = connect(mapStateToProps, mapDispatchToProps)(InvestPopupForm);

InvestPopupForm = reduxForm({
	form: "InvestPopupForm",
})(InvestPopupForm);

InvestPopupForm = connect((state) => {
	const wallet = selector(state, "wallet");
	return {
		wallet,
	};
})(InvestPopupForm);

export default InvestPopupForm;
