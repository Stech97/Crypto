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

const selector = formValueSelector("InvestPopupForm");

const required = (value) =>
	value || typeof value === "number" ? undefined : "Required";

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
				type="number"
				step="any"
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
		rateBTC: 0,
		rateUSD: 1,
	};

	componentDidMount = () => {
		this.props.getBalanceAction();
		this.getRate("BTC");
		this.getRateDET();
		this.getRateBTC();
	};

	getRateDET = async () => {
		RateRequest("DET", "USD").then((res) => {
			if (res.ok) {
				this.setState({
					...this.state,
					rateDET: res.data.rate,
				});
			} else if (res.error.status === 400) {
				this.setState({
					...this.state,
					rateDET: 0,
				});
			} else {
				this.setState({
					...this.state,
					rateDET: 0,
				});
			}
		});
	};

	getRateBTC = async () => {
		RateRequest("BTC", "USD").then((res) => {
			if (res.ok) {
				this.setState({
					...this.state,
					rateBTC: res.data.rate,
				});
			} else if (res.error.status === 400) {
				this.setState({
					...this.state,
					rateBTC: 0,
				});
			} else {
				this.setState({
					...this.state,
					rateBTC: 0,
				});
			}
		});
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
		if (wallet === "USD") {
			this.setState({
				...this.state,
				rate: 1,
			});
		} else {
			this.getRate(wallet);
		}
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
			InvestPopup,
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
				var wallet = "BTC";
			} else {
				var wallet = values.wallet;
			}
			var amount = Number(values.amount);
			if (wallet === "BTC") {
				var rate = this.state.rateBTC;
			} else if (wallet === "DET") {
				var rate = this.state.rateDET;
			} else {
				var rate = 1;
			}

			if (amount <= balance[wallet.toLowerCase()]) {
				if (amount * rate >= Number(minamount)) {
					this.props.buyInvestAction(amount, wallet, typeNum());
					this.props.reset();
				} else {
					throw new SubmissionError({
						amount: "Insufficient funds for this investment",
					});
				}
			} else {
				throw new SubmissionError({
					amount: "Not enough funds on balance",
				});
			}
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
					name="amount"
					type={type}
					onChange={(e) => this.handleAmount(e.target.value)}
					defaultValue="BTC"
					validate={[required]}
				/>
				<h6 className="popup-invest-usd">
					{wallet === "USD" ? "" : " => $" + amountUSD}
				</h6>
				<h6 className="popup-invest-minamount">
					{"Min. amount for product $" + minamount}
				</h6>
				<div className="popup-invest-button">
					<button>
						{InvestPopup.isFetching || submitting
							? "Loading..."
							: InvestPopup.error.type === "done"
							? "Success"
							: "Buy Now"}
					</button>
				</div>
			</form>
		);
	}
}

const mapStateToProps = (store) => ({
	balance: store.ContentBalanceContainer,
	InvestPopup: store.InvestPopup,
});

const mapDispatchToProps = (dispatch) => ({
	getBalanceAction: () => dispatch(getBalance()),
	buyInvestAction: (amount, currency, type) =>
		dispatch(buyInvest(amount, currency, type)),
});

InvestPopupForm = connect(mapStateToProps, mapDispatchToProps)(InvestPopupForm);

InvestPopupForm = reduxForm({
	form: "InvestPopupForm",
	asyncBlurFields: ["amount"],
})(InvestPopupForm);

InvestPopupForm = connect((state) => {
	const wallet = selector(state, "wallet");
	return {
		wallet,
	};
})(InvestPopupForm);

export default InvestPopupForm;
