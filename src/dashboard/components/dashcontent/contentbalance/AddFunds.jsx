import React, { Fragment, useState } from "react";
import Helmet from "react-helmet";
import axios from "axios";
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
			height: "50vh",
			width: "50vw",
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
				borderBottomColor: "#123273",
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
		<Grid item container xs={12} justify="start">
			<CustomField
				type="number"
				step="any"
				variant="filled"
				error={touched && error}
				disableUnderline
				placeholder={placeholder}
				InputProps={{ ...input, disableUnderline: true }}
				helperText={touched && error ? error : ""}
				oninput="event.preventDefault();isNaN(event.target.value) || event.target.value <= 0 ? document.querySelector('#btcpay-input-price').value = 10 : event.target.value"
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
	const axiosInvoice = axios.create({
		baseURL: "https://payment.defima.io/api/v1",
		timeout: 5000,
		responseType: "json",
		headers: {
			"Content-Type": "application/json",
			//			Authorization: "781ebc3eff657922fed2604a82da5bfc68856696",
		},
	});

	const InvoiceFetch = async (price) => {
		const invoiceCreation = {
			price: Number(price),
			currency: "BTC",
			storeID: "7jgseRYR7n6X6bEUkEdoWgby3BP6HfoMB2VVT9C1g2tz",
			redirectURL: "https://defima.io/account/dashboard",
			jsonResponse: true,
		};
		let response = await axiosInvoice.post("/invoices", invoiceCreation);
		return response;
	};
	const submit = async (values) => {
		props.CashAction(values.amount);
		InvoiceFetch(values.amount).then((res) => {
			if (res.ok) {
				window.btcpay.showInvoice(res.data.data.id);
			}
		});
	};

	return (
		<Fragment>
			<Helmet
				script={[{ src: "https://payment.defima.io/modal/btcpay.js" }]}
				// Helmet doesn't support `onload` in script objects so we have to hack in our own
			/>
			<Button onClick={handleClickOpen} className={classes.btcPlus}>
				<PlusIcon />
			</Button>
			<Dialog
				className={classes.dialog}
				open={open}
				onClose={handleClose}
			>
				<DialogTitle id="max-width-dialog-title">
					<Grid justify="space-between" container xs={12}>
						<Grid container item xs={10}>
							<Typography variant="h4" className={classes.header}>
								Add Funds
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
					<Grid justify="center" container xs={12}>
						<Grid container xs={12} spacing={2} justify="center">
							<Grid container item xs={12} justify="center">
								<Grid
									component="form"
									spacing={2}
									justify="center"
									item
									container
									xs={12}
									method="POST"
									onSubmit="onBTCPayFormSubmit(event);return false"
									action="https://payment.defima.io/api/v1/invoices"
								>
									<input
										type="hidden"
										name="storeId"
										defaultValue="7jgseRYR7n6X6bEUkEdoWgby3BP6HfoMB2VVT9C1g2tz"
									/>
									<input
										type="hidden"
										name="jsonResponse"
										defaultValue="false"
									/>
									<input
										type="hidden"
										name="browserRedirect"
										defaultValue="https://defima.io/account/dashboard"
									/>
									<input
										type="hidden"
										name="currency"
										defaultValue="BTC"
									/>
									<Grid
										container
										item
										xs={12}
										justify="start"
									>
										<Typography
											align="center"
											variant="body1"
										>
											Enter amount of funds you want to
											add
										</Typography>
									</Grid>
									<Field
										id="btcpay-input-price"
										name="price"
										component={inputField}
									/>
									<Grid
										component={Box}
										justify="space-between"
										item
										container
										xs={12}
									>
										<OrangeButton type="submit">
											Confirm
										</OrangeButton>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
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
<Grid
							component="form"
							xs={12}
							container
							justify="center"
							alignContent="space-around"
							item
							spacing={3}
							method="POST"
							onsubmit="onBTCPayFormSubmit(event);return false"
							action="https://payment.defima.io/api/v1/invoices"
						>
							<input
								type="hidden"
								name="storeId"
								defaultValue="7jgseRYR7n6X6bEUkEdoWgby3BP6HfoMB2VVT9C1g2tz"
							/>
							<input
								type="hidden"
								name="jsonResponse"
								defaultValue="true"
							/>
							<input
								type="hidden"
								name="browserRedirect"
								defaultValue="https://defima.io/account/dashboard"
							/>
							<Grid item container xs={12} md={4}>
								<TextField
									id="btcpay-input-price"
									name="price"
									type="number"
									min="0"
									max={10}
									step="any"
									defaultValue={10}
									style={{ width: "7em" }}
									oninput="event.preventDefault();isNaN(event.target.value) || event.target.value <= 0 ? document.querySelector('#btcpay-input-price').value = 10 : event.target.value"
								/>
							</Grid>
							<input
								type="hidden"
								name="currency"
								defaultValue="BTC"
							/>
							<Grid item container xs={12} md={4}>
								<Button
									type="submit"
									className="submit"
									name="submit"
									style={{
										minWidth: 209,
										minHeight: 57,
										borderRadius: 4,
										borderStyle: "none",
										backgroundColor: "#F9A732",
									}}
									alt="Buy BTC"
								>
									<span
										style={{
											color: "#000000",
											padding: "15px 0 5% 1px",
										}}
									>
										Confirm
									</span>
								</Button>
							</Grid>
						</Grid>
*/
/*


				*/
