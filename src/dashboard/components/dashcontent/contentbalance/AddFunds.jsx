import React, { Fragment, useState } from "react";
import {
	Field,
	formValueSelector,
	SubmissionError,
	reduxForm,
} from "redux-form";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
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
import OrangeButton from "../../Buttons";
import { MinusIcon, PlusIcon } from "../../../svg/iconComponents";
import { SendCash } from "../../../actions/CashBTC";

const orange = "#ed7102";

const useStyles = makeStyles((theme) => ({
	dialog: {
		"&>div>.MuiPaper-root": {
			borderRadius: "40px",
			padding: "20px",
		},
	},
	btcPlus: {
		borderRight: "1px solid #ffffff",
		width: "50%",
		height: "100%",
		padding: 0,
		"& svg": {
			fill: "#ffffff",
			stroke: "#ffffff",
			width: "60%",
			height: "auto",
			fontSize: "3rem",
		},
		borderRadius: 0,
		"&:hover": {
			backgroundColor: orange,
		},
		[theme.breakpoints.down("sm")]: {
			"& svg": {
				height: "auto",
				width: "2rem",
			},
			borderRadius: "1rem 0 0 1rem",
		},
	},
	header: {
		color: "#123273",
	},
}));

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

function inputField({ input, placeholder, meta: { touched, error, warning } }) {
	return (
		<Grid item container xs={12} justify="center">
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

function getSteps() {
	return ["Enter amount", "Send funds"];
}

function getStepContent(stepIndex) {
	switch (stepIndex) {
		case 0:
			return "Select campaign settings...";
		case 1:
			return "What is an ad group anyways?";
		default:
			return "Unknown stepIndex";
	}
}

function AddFunds(props) {
	const { submitting, addfunds, handleSubmit } = props;
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const submit = (values) => {
		props.CashAction(values.amount);
		handleNext();
	};

	return (
		<Fragment>
			<Button onClick={handleClickOpen} className={classes.btcPlus}>
				<PlusIcon />
			</Button>
			<Dialog
				className={classes.dialog}
				maxWidth="sm"
				open={open}
				onClose={handleClose}
			>
				<DialogTitle id="max-width-dialog-title">
					<Grid justify="space-between" container xs={12}>
						<Grid container item xs={10}>
							<Typography variant="h4" className={classes.header}>
								AddFunds
							</Typography>
						</Grid>
						<Grid container justify="flex-end" item xs={2}>
							<IconButton onClick={handleClose}>
								<CloseIcon />
							</IconButton>
						</Grid>
					</Grid>
				</DialogTitle>
				<DialogContent>
					<div>
						<style
							type="text/css"
							dangerouslySetInnerHTML={{
								__html:
									" .btcpay-form { display: inline-flex; align-items: center; justify-content: center; } .btcpay-form--inline { flex-direction: row; } .btcpay-form--block { flex-direction: column; } .btcpay-form--inline .submit { margin-left: 15px; } .btcpay-form--block select { margin-bottom: 10px; } .btcpay-form .btcpay-custom-container{ text-align: center; }.btcpay-custom { display: flex; align-items: center; justify-content: center; } .btcpay-form .plus-minus { cursor:pointer; font-size:25px; line-height: 25px; background: #DFE0E1; height: 30px; width: 45px; border:none; border-radius: 60px; margin: auto 5px; display: inline-flex; justify-content: center; } .btcpay-form select { -moz-appearance: none; -webkit-appearance: none; appearance: none; color: currentColor; background: transparent; border:1px solid transparent; display: block; padding: 1px; margin-left: auto; margin-right: auto; font-size: 11px; cursor: pointer; } .btcpay-form select:hover { border-color: #ccc; } #btcpay-input-price { -moz-appearance: none; -webkit-appearance: none; border: none; box-shadow: none; text-align: center; font-size: 25px; margin: auto; border-radius: 5px; line-height: 35px; background: #fff; } ",
							}}
						/>
						<form
							method="POST"
							action="https://payment.defima.io/api/v1/invoices"
							className="btcpay-form btcpay-form--inline"
						>
							<input
								type="hidden"
								name="storeId"
								defaultValue="7jgseRYR7n6X6bEUkEdoWgby3BP6HfoMB2VVT9C1g2tz"
							/>
							<input
								type="hidden"
								name="browserRedirect"
								defaultValue="https://defima.io/login"
							/>
							<input
								type="hidden"
								name="buyerEmail"
								defaultValue={props.user.id}
							/>
							<div className="btcpay-custom-container">
								<div className="btcpay-custom">
									<input
										id="btcpay-input-price"
										name="price"
										type="number"
										min={10}
										max={200000}
										step={1}
										defaultValue={10}
										style={{ width: "2em" }}
										oninput="event.preventDefault();isNaN(event.target.value) || event.target.value <= 0 ? document.querySelector('#btcpay-input-price').value = 10 : event.target.value"
									/>
								</div>
								<select name="currency">
									<option value="USD" selected>
										USD
									</option>
									<option value="GBP">GBP</option>
									<option value="EUR">EUR</option>
									<option value="BTC">BTC</option>
								</select>
							</div>
							<input
								type="image"
								className="submit"
								name="submit"
								src="https://payment.defima.io/img/paybutton/pay.svg"
								style={{ width: 146 }}
								alt="Pay with BtcPay, Self-Hosted Bitcoin Payment Processor"
							/>
						</form>
					</div>
				</DialogContent>
			</Dialog>
		</Fragment>
	);
}

const mapStateToProps = (state) => ({
	addfunds: state.addfunds,
	user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
	CashAction: (amount) => dispatch(SendCash(amount)),
});

AddFunds = connect(mapStateToProps, mapDispatchToProps)(AddFunds);

export default reduxForm({
	form: "AddFunds",
})(AddFunds);

/*

<Grid contaimer xs={12} spacing={2} justify="center">
						<Stepper activeStep={activeStep} alternativeLabel>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel className={classes.header}>
										{label}
									</StepLabel>
								</Step>
							))}
						</Stepper>
						{activeStep === 0 ? (
							<Grid contaimer item xs={12} justify="center">
								<Grid contaimer item xs={12} justify="center">
									<Typography align="center" variant="body1">
										Enter amount of funds you want to add
									</Typography>
								</Grid>
								<Grid
									onSubmit={handleSubmit(submit)}
									component="form"
									spacing={2}
									justify="center"
									item
									container
									xs={12}
								>
									<Field
										name="amount"
										component={inputField}
									/>
									<Grid
										component={Box}
										justify="space-between"
										item
										container
										xs={12}
									>
										<OrangeButton
											disabled={activeStep === 0}
											onClick={handleBack}
										>
											Back
										</OrangeButton>
										<OrangeButton type="submit">
											Next
										</OrangeButton>
									</Grid>
								</Grid>
							</Grid>
						) : (
							<Grid
								contaimer
								item
								xs={12}
								spacing={2}
								justify="flex-start"
							>
								<Grid contaimer item xs={12} justify="center">
									<Typography>
										To deposit bitcoin to this wallet,
										please send any amount to the wallet
										below. the money will appear in Bitcoin
										balance after 1 confirmation.
									</Typography>
								</Grid>
								<Grid spacing={2} item container xs={12}>
									<Typography>{addfunds.adress}</Typography>
								</Grid>
								<Grid
									justify="space-between"
									item
									container
									xs={12}
								>
									<OrangeButton
										disabled={activeStep === 0}
										onClick={handleBack}
									>
										Back
									</OrangeButton>
									<OrangeButton onClick={handleClose}>
										Close
									</OrangeButton>
								</Grid>
							</Grid>
						)}
					</Grid>
				*/
