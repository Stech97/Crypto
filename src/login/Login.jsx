import React, { Component, Fragment } from "react";
//import '../styles/login.scss'
import { connect } from "react-redux";
import Header from "./Header";
import Content from "./Content";
import { createMuiTheme } from "@material-ui/core/styles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import FluidContainer from "./Content";
import LoginForm from "./components/LoginForm";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const darkBlue = "#123273";
const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
const grayText = "#838383";
const grayBack = "#efefef";
const orange = "#ed7102";
const lightBlue = "#16428d";
const whitebox = "#efefef";
const contentBack = "#f5fbff";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: contentBack,
			contrastText: darkBlue,
		},
		secondary: {
			main: "#fff",
			contrastText: "#ffffff",
		},
		warning: {
			main: "#fff",
			dark: orange,
		},
	},
	typography: {
		fontFamily: ["IBM Plex Sans"],
		h1: {
			margin: 0,
			lineHeight: 1.3,
			letterSpacing: "normal",
			textAlign: "left",
			color: "#ffffff",
			fontSize: "3rem",
			fontWeight: 600,
			fontStyle: "normal",
		},

		h2: {
			margin: 0,
			lineHeight: 1.3,
			letterSpacing: "normal",
			textAlign: "left",
			color: "#005c9f",
			fontSize: "1.75rem",
			fontWeight: 600,
			fontStyle: "normal",
		},

		h3: {
			margin: 0,
			lineHeight: 1.3,
			letterSpacing: "normal",
			textAlign: "left",
			color: "#005c9f",
			fontSize: "1.5rem",
			fontWeight: 400,
			fontStretch: "normal",
			fontStyle: "italic",
		},

		h4: {
			margin: 0,
			lineHeight: 1.3,
			letterSpacing: "normal",
			textAlign: "left",
			color: "#005c9f",
			fontSize: "1.0rem",
			fontWeight: 600,
			fontStretch: "normal",
		},

		body1: {
			fontSize: "1.0rem",
			fontStretch: "normal",
			fontStyle: "normal",
			lineHeight: 1.32,
			letterSpacing: "normal",
			textAlign: "left",
			color: "#838383",
		},
	},
});

const useStyles = makeStyles((theme) => ({
	link: {
		color: "#fff",
		"& a": {
			color: "#fff",
		},
	},
	restore: {
		fontWeight: "700",
	},
	container: {
		alignContent: "space-between",
	},
}));

function LoginPage() {
	const classes = useStyles();
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<FluidContainer>
				<Grid
					xs={12}
					md={4}
					container
					item
					className={classes.container}
				>
					<Grid xs={12} item>
						<Typography variant="h1" align="center">
							Login to defima
						</Typography>
					</Grid>
					<Grid xs={12} item>
						<LoginForm />
					</Grid>
					<Grid xs={12} item>
						<Typography
							align="center"
							className={classes.link}
							variant="body1"
						>
							{"Forgot your password? "}
							<Link to="/forgot">
								<u className={classes.restore}>Restore it</u>
							</Link>
						</Typography>
					</Grid>
					<Grid container direction="row" justifyItems="center">
						<Grid item xs={6}>
							<Link to="/terms&conditions">
								<Typography
									className={classes.link}
									variant="body1"
									align="center"
								>
									Terms of use
								</Typography>
							</Link>
						</Grid>
						<Grid item xs={6}>
							<Link to="/privacy">
								<Typography
									className={classes.link}
									variant="body1"
									align="center"
								>
									Privacy policy
								</Typography>
							</Link>
						</Grid>
					</Grid>
				</Grid>
			</FluidContainer>
		</ThemeProvider>
	);
}

export default LoginPage;
