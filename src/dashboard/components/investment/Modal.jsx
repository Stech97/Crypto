import React, { Fragment, useState, Component } from "react";
import {
	Field,
	formValueSelector,
	SubmissionError,
	reduxForm,
} from "redux-form";
import { getInvestmentTable } from "../../actions/InvestmentTable";
import { getBalance, getBTCRate, getDETRate } from "../../actions/getBalance";
import { buyInvest } from "../../actions/investForm";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import InputField from "./inputField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import OrangeButton from "../Buttons";

const BlueButton = withStyles({
	root: {
		color: "#fff",
		background: "linear-gradient(77deg, #16428d 0%, #005c9f 100%)",
		border: "none",
		borderRadius: "30px",
		padding: "0.5rem 2rem",
		"&:hover, &:focus": {
			color: "#fff",
			background: "linear-gradient(77deg, #ed7102 0%, #ed7102 100%)",
		},
	},
})(Button);

const renderFromHelper = ({ touched, error }) => {
	if (!(touched && error)) {
		return;
	} else {
		return <FormHelperText>{touched && error}</FormHelperText>;
	}
};

const CustomField = withStyles({
	root: {
		"& .MuiInput-root": {
			color: "#fff",
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

function inputField({ input, placeholder, meta: { touched, error, warning } }) {
	return (
		<Grid item xs={12} justify="center">
			<CustomField
				type="number"
				step="any"
				variant="filled"
				error={touched && error}
				disableUnderline
				placeholder={placeholder}
				InputProps={{ ...input, disableUnderline: true }}
				helperText={touched && error ? error : ""}
			/>
		</Grid>
	);
}

const SelectField = withStyles({
	select: {
		borderRadius: "10px",
		backgroundImage:
			"linear-gradient(254deg, rgba(6, 77, 143, 0.98) 0%, #16428d 67%, #032748 100%)",
		color: "#fff",
		height: "1rem",
		fontSize: "1rem",
		"&:focus": {
			backgroundImage:
				"linear-gradient(254deg, rgba(6, 77, 143, 0.98) 0%, #16428d 67%, #032748 100%)",
			borderRadius: "10px",
		},
		"&:before": {
			border: "none",
		},
	},
})(Select);

const renderSelectField = ({
	input,
	label,
	meta: { touched, error },
	children,
	...custom
}) => (
	<Grid container xs={12}>
		<FormControl
			component={Grid}
			item
			container
			xs={12}
			md={6}
			error={touched && error}
		>
			<InputLabel htmlFor="color-native-simple">{label}</InputLabel>
			<SelectField
				variant="filled"
				native
				{...input}
				{...custom}
				inputProps={{
					name: input.name,
					id: "color-native-simple",
				}}
			>
				{children}
			</SelectField>
			{renderFromHelper({ touched, error })}
		</FormControl>
	</Grid>
);

class InvestModal extends Component {
	componentDidMount = () => {
		this.props.getBalanceAction();
		this.props.getAllRateAction();
	};

	state = {
		open: false,
	};

	handleClose = () => {
		this.setState((state) => ({ open: false }));
	};

	handleClickOpen = () => {
		this.setState((state) => ({ open: true }));
	};

	render() {
		const {
			classes,
			minAmount,
			type,
			balance,
			rate,
			InvestPopup,
			wallet,
			submitting,
			handleSubmit,
			error,
			pristine,
		} = this.props;

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
			this.props.getBalanceAction();
			this.props.getAllRateAction();

			if (!values.wallet) {
				var wallet = "BTC";
			} else {
				var wallet = values.wallet;
			}
			var amount = Number(values.amount);
			if (wallet === "BTC") {
				var rate = this.props.rate.b2u;
			} else if (wallet === "DET") {
				var rate = this.props.rate.d2u;
			} else {
				var rate = 1;
			}
			console.log("wallet.toLowerCase()", rate);
			if (Number(amount) <= balance[wallet.toLowerCase()]) {
				if (Number(amount) * rate >= Number(minAmount)) {
					this.props.buyInvestAction(amount, wallet, typeNum());
					this.props.getInvestmentTableAction();
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
			<Fragment>
				<CardActions className={classes.button}>
					<BlueButton onClick={this.handleClickOpen}>
						Invest
					</BlueButton>
				</CardActions>
				<Dialog
					className={classes.dialog}
					maxWidth="sm"
					open={this.state.open}
					onClose={this.handleClose}
				>
					<DialogTitle id="max-width-dialog-title">
						<Grid justify="space-between" container xs={12}>
							<Grid container item xs={10}>
								<Typography
									variant="h4"
									className={classes.header}
								>
									{"Buy Product " + type}
								</Typography>
							</Grid>
							<Grid container justify="flex-end" item xs={2}>
								<IconButton onClick={this.handleClose}>
									<CloseIcon />
								</IconButton>
							</Grid>
						</Grid>
					</DialogTitle>
					<DialogContent>
						<Grid
							onSubmit={handleSubmit(submit)}
							component="form"
							spacing={2}
							item
							container
							xs={12}
						>
							<Grid component={Box} my={2} item container xs={6}>
								<Typography className={classes.header}>
									Choose Balance
								</Typography>
							</Grid>
							<Field
								name="wallet"
								component={renderSelectField}
								balance={balance}
							>
								<option value={"BTC"}>
									{"BTC " + Number(balance.btc).toFixed(4)}
								</option>
								<option value={"USD"}>
									{"USD " + Number(balance.usd).toFixed(2)}
								</option>
								<option value={"DET"}>
									{"DET " + Number(balance.det).toFixed(2)}
								</option>
							</Field>
							<Grid
								component={Box}
								my={2}
								item
								container
								xs={12}
								md={6}
							>
								<Typography className={classes.header}>
									Choose Amount
								</Typography>
							</Grid>
							<Field name="amount" component={inputField} />
							<Grid component={Box} item container xs={12} md={6}>
								<Typography>
									{"Min. amount for product $" + minAmount}
								</Typography>
							</Grid>
							<Grid
								component={Box}
								justify="flex-start"
								item
								container
								xs={12}
							>
								<OrangeButton type="submit">
									{InvestPopup.isFetching || submitting
										? "Loading..."
										: InvestPopup.error.type === "done"
										? "Success"
										: "Buy Now"}
								</OrangeButton>
							</Grid>
						</Grid>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

const mapStateToProps = (store) => ({
	balance: store.Balance.balance,
	rate: store.Balance.rate,
	InvestPopup: store.InvestPopup,
});

const mapDispatchToProps = (dispatch) => ({
	getBalanceAction: () => dispatch(getBalance()),
	getAllRateAction: () => {
		dispatch(getBTCRate());
		dispatch(getDETRate());
	},
	buyInvestAction: (amount, currency, type) =>
		dispatch(buyInvest(amount, currency, type)),
	getInvestmentTableAction: () => dispatch(getInvestmentTable()),
});

InvestModal = connect(mapStateToProps, mapDispatchToProps)(InvestModal);

InvestModal = reduxForm({
	form: "InvestModal",
	asyncBlurFields: ["amount"],
})(InvestModal);

export default InvestModal;
