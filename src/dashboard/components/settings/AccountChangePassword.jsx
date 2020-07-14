import React, { Component, Fragment } from "react";
import { SubmissionError, reduxForm, Field } from "redux-form";
import {
	required,
	maxLength25,
	minLength6,
	validatePassword,
} from "../../../signup/components/SignupForm";
import { connect } from "react-redux";
import { changePassword } from "../../actions/changePassword";
import SettingsBox from "../SettingsBox";
import TextField from "@material-ui/core/TextField";
import Button from "../Buttons";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	header: {
		color: "#123273",
		marginBottom: "20px",
	},
	input: {
		witdh: "80%",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	button: {
		marginTop: "20px",
	},
}));

function AccountChange(props) {
	const classes = useStyles();

	const submit = (values) => {
		if (values.password !== values.password2) {
			throw new SubmissionError({
				password2: "Passwords must match",
			});
		}
		props.changePasswordAction({
			username: props.user.username,
			password: values.password,
			confirmPassword: values.password2,
		});
		reset();
	};

	const passField = ({
		input,
		id,
		type,
		placeholder,
		meta: { touched, error, warning },
	}) => {
		return (
			<TextField
				autoComplete="off"
				inputProps={input}
				type={type}
				placeholder={placeholder}
				error={error && touched}
				helperText={error}
			/>
		);
	};

	const {
		handleSubmit,
		reset,
		pristine,
		submitting,
		hash,
		changePassword,
		error,
		invalid,
		hasErrors,
	} = props;

	return (
		<SettingsBox>
			<Typography align="center" className={classes.header}>
				Change Password
			</Typography>
			<form onSubmit={handleSubmit(submit)} className={classes.form}>
				<Field
					component={passField}
					name="password"
					type="password"
					placeholder="New Password"
					validate={[
						required,
						maxLength25,
						minLength6,
						validatePassword,
					]}
				/>
				<Field
					component={passField}
					name="password2"
					type="password"
					placeholder="Repeat New Password"
					validate={[
						required,
						maxLength25,
						minLength6,
						validatePassword,
					]}
				/>
				<Button
					type="submit"
					className={classes.button}
					disabled={invalid || hasErrors || pristine || submitting}
				>
					{submitting || changePassword.isFetching
						? "Wait..."
						: pristine && changePassword.error.type === "done"
						? "Success"
						: "Change Password"}
				</Button>
			</form>
		</SettingsBox>
	);
}

const mapStateToProps = (store) => {
	return {
		changePassword: store.changePassword,
		user: store.user.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changePasswordAction: (values) => dispatch(changePassword(values)),
	};
};

AccountChange = connect(mapStateToProps, mapDispatchToProps)(AccountChange);

export default reduxForm({
	form: "AccountChange",
})(AccountChange);
