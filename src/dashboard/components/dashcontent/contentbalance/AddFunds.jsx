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
				</DialogContent>
			</Dialog>
		</Fragment>
	);
}

const mapStateToProps = (state) => ({
	addfunds: state.addfunds,
});

const mapDispatchToProps = (dispatch) => ({
	CashAction: (amount) => dispatch(SendCash(amount)),
});

AddFunds = connect(mapStateToProps, mapDispatchToProps)(AddFunds);

export default reduxForm({
	form: "AddFunds",
})(AddFunds);
