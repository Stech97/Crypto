import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const orange = "#ed7102";

const OrangeButton = withStyles({
	root: {
		color: "#fff",
		backgroundColor: orange,

		border: "3px solid " + orange,
		borderRadius: "30px",
		paddingLeft: "1rem",
		paddingRight: "1rem",
		textTransform: "none",
		"&:hover": {
			color: orange,
			backgroundColor: "transparent",
		},
		"&[disabled]": {
			borderColor: "#838383",
		},
	},
})(Button);

const EmailField = withStyles({
	root: {
		"& .MuiInput-underline": {
			color: "#fff",
			"&:before": {
				borderBottomColor: "#fff",
			},
			"&:hover:not(.Mui-disabled):before": {
				borderBottomColor: orange,
			},
		},
	},
})(TextField);

const renderField = ({
	input,
	placeholder,
	type,
	meta: { touched, error },
}) => {
	return (
		<EmailField
			{...input}
			error={touched && error}
			helperText={touched && error}
			placeholder={placeholder}
			type={type}
		/>
	);
};

function FooterForm(props) {
	const { handleSubmit, submitting, reset, visibility, data } = props;

	const email = (value) =>
		value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
			? "Invalid email address"
			: undefined;

	const required = (value) =>
		value || typeof value === "number" ? undefined : "Required";

	const submit = (values) => {
		props.sendAction(values.email);
		props.reset();
	};

	return (
		<Grid
			xs={12}
			item
			container
			component="form"
			direction="column"
			alignContent="flex-start"
			onSubmit={handleSubmit(submit)}
		>
			<Field
				component={renderField}
				name="email"
				type="email"
				placeholder={
					data.error.message
						? data.error.message
						: "maxmutter@hotmail.com"
				}
			/>
			<Box my={2}>
				<OrangeButton type="submit" disabled={submitting}>
					Notify Me
				</OrangeButton>
			</Box>
		</Grid>
	);
}

export default reduxForm({
	form: "FooterFrom", // a unique identifier for form
})(FooterForm);
