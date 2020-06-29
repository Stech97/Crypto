import React, { Component, Fragment } from "react";
import { SubmissionError, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Exchange } from "../../../actions/exchange";
import { getBalance } from "../../../actions/getBalance";

const validateFloat = (value) => (value ? parseFloat(value).toString() : "0");

const renderField = ({
	input,
	className,
	placeholder,
	meta: { touched, error, warning },
}) => {
	return (
		<div className="exchange-form-input">
			<input
				{...input}
				type="text"
				min="0"
				className={className + " exchange-form-input"}
				placeholder={placeholder}
			/>
			{touched &&
				((error && (
					<p className="error">
						<i class="fas fa-exclamation-circle"></i>
						{" " + error}
					</p>
				)) ||
					(warning && (
						<p className="error">
							<i class="fas fa-exclamation-circle"></i>
							{" " + warning}
						</p>
					)))}
		</div>
	);
};

class ExchangeForm extends Component {
	handleChange = async (currentCurrency, targetCurrency, amount) => {
		amount = Number(validateFloat(amount));
		this.props.change(currentCurrency.cur, amount * currentCurrency.rate);
	};

	render() {
		const {
			cur1,
			cur2,
			submitting,
			handleSubmit,
			isOpened,
			closeModal,
			exchange,
			error,
			pristine,
		} = this.props;

		const curToString = (cur) => {
			if (cur === "btc") {
				return "Bitcoin";
			} else if (cur === "dol") {
				return "USD";
			} else {
				return "DET";
			}
		};

		const curUpperCase = (cur) => {
			if (cur === "btc") {
				return "BTC";
			} else if (cur === "dol") {
				return "USD";
			} else {
				return "DET";
			}
		};

		const handleClose = () => {
			closeModal();
			this.props.reset();
		};

		const submit = (values) => {
			if (values[this.props.cur1] && values[this.props.cur2]) {
				this.props.ExchangeAction(
					Number(values[this.props.cur1]),
					curUpperCase(this.props.cur1.cur),
					curUpperCase(this.props.cur2.cur)
				);
			} else {
				throw new SubmissionError({
					_error: "At least one field is required!!!",
				});
			}
			handleClose();
		};

		return (
			<form className="exchange-form" onSubmit={handleSubmit(submit)}>
				<h5 className="exchange-form-label1">
					{"Insert " + curToString(cur1.cur) + " Amount"}
				</h5>
				<Field
					component={renderField}
					name={cur1.cur}
					className="exchange-form-cur1"
					placeholder={curToString(cur1.cur)}
					onChange={(e) =>
						this.handleChange(cur2, cur1, e.target.value)
					}
					normalize={validateFloat}
				/>
				<div className="exchange-form-img">
					<img src="/img/exchange-icon.png" />
				</div>
				<h5 className="exchange-form-label2">
					{curToString(cur2.cur) + " Amount"}
				</h5>
				<Field
					component={renderField}
					name={cur2.cur}
					className="exchange-form-cur2"
					placeholder={curToString(cur2.cur)}
					onChange={(e) =>
						this.handleChange(cur1, cur2, e.target.value)
					}
					normalize={validateFloat}
				/>
				<button
					className="exchange-form-button"
					type="submit"
					disabled={pristine || submitting}
				>
					Exchange
				</button>
				{error && (
					<p className="exchange-form-error error">
						<i class="fas fa-exclamation-circle"></i>
						{" " + error}
					</p>
				)}
			</form>
		);
	}
}

const mapStateToProps = (store) => {
	return {
		balance: store.ContentBalanceContainer,
		exchange: store.Exchange,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getBalanceAction: (ID) => dispatch(getBalance(ID)),
		ExchangeAction: (amount, cur1, cur2) =>
			dispatch(Exchange(amount, cur1, cur2)),
	};
};

ExchangeForm = connect(mapStateToProps, mapDispatchToProps)(ExchangeForm);

export default reduxForm({
	form: "ExchangeForm",
})(ExchangeForm);
