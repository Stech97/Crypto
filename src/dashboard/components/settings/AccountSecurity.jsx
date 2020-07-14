import React, { Component, Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import SettingsBox from "../SettingsBox";
import Button from "../Buttons";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
	header: {
		color: "#123273",
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

export default function AccountSecurity(props) {
	const classes = useStyles();
	return (
		<SettingsBox header="Security">
			<Typography align="center">
				Two-Factor-Authentification
				<br />
				Please insert your phone number with area code and verify your
				number.
			</Typography>
			<form className={classes.form}>
				<TextField
					className={classes.input}
					type="phone"
					label="+44 1111 22222"
				/>
				<TextField
					className={classes.input}
					type="text"
					label="Insert the code you got"
				/>
				<Button className={classes.button}>Submit</Button>
			</form>
		</SettingsBox>
	);
}
