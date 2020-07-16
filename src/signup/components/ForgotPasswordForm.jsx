import React, { Component, Fragment } from "react";
import { getFormValues, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { forgotPassword } from "../actions/forgotpassword";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import inputField from "../inputField";

import {
	aol,
	required,
	minLength3,
	maxLength25,
	email,
	validateUsername,
} from "./SignupForm";

const orange = "#ed7102";

const OrangeButton = withStyles({
	root: {
		color: orange,
		backgroundColor: "#fff",
		border: "3px solid " + orange,
		borderRadius: "30px",
		paddingLeft: "1rem",
		paddingRight: "1rem",
		"&:hover": {
			color: "#fff",
			backgroundColor: orange,
		},
		"&[disabled]": {
			borderColor: "#838383",
		},
	},
})(Button);

const useStyles = makeStyles((theme) => ({
	input: {
		background: "transparent",
		height: "4rem",
		alignContent: "center",
	},
}));

function ForgotPasswordForm(props) {
	const classes = useStyles();
	const {
		handleSubmit,
		reset,
		pristine,
		submitting,
		forgot,
		error,
		invalid,
		hasErrors,
	} = props;

	const submit = (values) => {
		props.forgotPasswordAction({
			username: values.username,
			email: values.email,
		});
	};

	if (props.forgot.error.type === "done") {
		return (
			<Typography align="center" variant="h1">
				Request has been sent succesfully
			</Typography>
		);
	} else {
		return (
			<Grid
				component="form"
				xs={12}
				item
				container
				justify="center"
				onSubmit={handleSubmit(submit)}
			>
				<Field
					component={inputField}
					name="username"
					type="text"
					classes={classes}
					placeholder="Username"
					validate={[
						required,
						maxLength25,
						minLength3,
						validateUsername,
					]}
				/>
				<Field
					component={inputField}
					name="email"
					type="email"
					classes={classes}
					placeholder="Email"
					validate={[required, email]}
					warn={aol}
				/>
				<OrangeButton
					type="submit"
					disabled={(invalid, hasErrors || pristine || submitting)}
				>
					{submitting || forgot.isFetching ? "Loading..." : "Restore"}
				</OrangeButton>
				{forgot.error.type && (
					<Alert variant="filled" severity="error">
						{forgot.error.message}
					</Alert>
				)}
				{error && (
					<Alert variant="filled" severity="error">
						{error}
					</Alert>
				)}
			</Grid>
		);
	}
}

const mapStateToProps = (store) => {
	return {
		forgot: store.forgot,
	};
};

const mapDispatchToProps = (dispatch) => ({
	forgotPasswordAction: (data) => dispatch(forgotPassword(data)),
});

ForgotPasswordForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(ForgotPasswordForm);

export default reduxForm({
	form: "ForgotPassword", // a unique identifier for form
})(ForgotPasswordForm);
