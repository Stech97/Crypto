import React, { Fragment } from "react";
import Header from "./Header";
import FluidContainer from "./Content";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme } from "@material-ui/core/styles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
	container: {
		alignContent: "center",
		justifyContent: "center",
	},
}));

function Checkmail(props) {
	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<Header />
			<FluidContainer>
				<Grid xs={12} container item className={classes.container}>
					<Typography>
						We have sent you confirmation email.
						<br />
						Please check your mail box.
					</Typography>
				</Grid>
			</FluidContainer>
		</ThemeProvider>
	);
}

export default Checkmail;
