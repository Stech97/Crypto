import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { restorePassword } from "../actions/restorepassword";
import { SubmissionError, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import inputField from "../inputField";
import {
	required,
	maxLength25,
	minLength6,
	validatePassword,
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

function RestorePasswordForm(props) {
	const classes = useStyles();
	const {
		handleSubmit,
		reset,
		pristine,
		submitting,
		hash,
		forgot,
		error,
		invalid,
		hasErrors,
	} = props;

	const submit = (values) => {
		if (values.password !== values.password2) {
			throw new SubmissionError({
				password2: "Passwords must match",
			});
		}

		props.restorePasswordAction({
			hash: hash,
			password: values.password,
			password2: values.password2,
		});
	};

	if (forgot.error.type === "done") {
		return <Redirect to="/account/dashboard" />;
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
					name="password"
					type="password"
					classes={classes}
					placeholder="New Password"
					validate={[
						required,
						maxLength25,
						minLength6,
						validatePassword,
					]}
				/>
				<Field
					component={inputField}
					name="password2"
					type="password"
					classes={classes}
					placeholder="Repeat New Password"
					validate={[
						required,
						maxLength25,
						minLength6,
						validatePassword,
					]}
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
	restorePasswordAction: (data) => dispatch(restorePassword(data)),
});

RestorePasswordForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(RestorePasswordForm);

export default reduxForm({
	form: "RestorePassword", // a unique identifier for form
})(RestorePasswordForm);
