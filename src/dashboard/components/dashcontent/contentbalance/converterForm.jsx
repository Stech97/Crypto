import React, { Component, Fragment } from "react";
import { SubmissionError, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Exchange } from "../../../actions/exchange";
import { getBalance } from "../../../actions/getBalance";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import OrangeButton from "../../Buttons";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const validateFloat = (value) => (value ? parseFloat(value).toString() : "0");

const CustomField = withStyles({
	root: {
		"& .MuiInput-root": {
			color: "#fff",
			height: "1rem",
			"&:before": {
				borderBottomColor: "#fff",
			},
			"&:hover:not(.Mui-disabled):before": {
				borderBottom: "none",
			},
			"&>input:-webkit-autofill": {
				WebkitTextFillColor: "#838383",
			},
		},
		"& input": {
			padding: "10px 12px",
		},
		width: "60%",
	},
})(TextField);

const renderField = ({
	input,
	placeholder,
	meta: { touched, error, warning },
}) => {
	return (
		<Grid item xs={12} justify="center">
			<CustomField
				type="text"
				min="0"
				variant="filled"
				error={touched && error}
				placeholder={placeholder}
				InputProps={{ ...input, disableUnderline: true }}
				helperText={touched && error ? error : ""}
			/>
		</Grid>
	);
};

class ExchangeForm extends Component {
	handleChange = (currentCurrency, targetCurrency, amount) => {
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
			balance,
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
			if (values[cur1.cur] || values[cur2.cur]) {
				if (
					values[cur1.cur] <=
					balance[curUpperCase(cur1.cur).toLowerCase()]
				) {
					this.props.ExchangeAction(
						Number(values[cur1.cur]),
						curUpperCase(cur1.cur),
						curUpperCase(cur2.cur)
					);
				} else {
					throw new SubmissionError({
						_error: "Not enough cash!!!",
					});
				}
			} else {
				throw new SubmissionError({
					_error: "At least one field is required!!!",
				});
			}
			handleClose();
		};

		return (
			<Grid
				onSubmit={handleSubmit(submit)}
				component="form"
				spacing={2}
				item
				container
				xs={12}
			>
				<Grid component={Box} item container xs={12}>
					<Typography>
						{"Insert " + curToString(cur1.cur) + " Amount"}
					</Typography>
				</Grid>
				<Field
					component={renderField}
					name={cur1.cur}
					placeholder={curToString(cur1.cur)}
					onChange={(e) =>
						this.handleChange(cur2, cur1, e.target.value)
					}
					normalize={validateFloat}
				/>
				<Grid component={Box} item container xs={12}>
					<img src="/img/exchange-icon.png" />
				</Grid>
				<Grid component={Box} item container xs={12}>
					{curToString(cur2.cur) + " Amount"}
				</Grid>
				<Field
					component={renderField}
					name={cur2.cur}
					placeholder={curToString(cur2.cur)}
					onChange={(e) =>
						this.handleChange(cur1, cur2, e.target.value)
					}
					normalize={validateFloat}
				/>
				<Grid
					component={Box}
					justify="flex-start"
					item
					container
					xs={12}
				>
					<OrangeButton
						className="popup-exchange-form-button"
						type="submit"
						disabled={pristine || submitting}
					>
						Exchange
					</OrangeButton>
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = (store) => {
	return {
		balance: store.Balance.balance,
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
