import React, { useState, useEffect } from "react";
import "../styles/utils/normalize.scss";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import { RouteWithSubRoutes } from "../Routes";
import Header from "./newdash/Header";
import Sidebar from "./newdash/Sidebar";
import { CssBaseline, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { connect } from "react-redux";
import { relogUser } from "./actions/logout";

export const darkBlue = "#123273";
export const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
export const grayText = "#838383";
export const grayBack = "#efefef";
export const orange = "#ed7102";
export const lightBlue = "#16428d";
export const whitebox = "#efefef";
export const contentBack = "#f5fbff";

export const sidebarWidth = 400;

const theme = createMuiTheme({
	palette: {
		primary: {
			main: contentBack,
			contrastText: darkBlue,
		},
		secondary: {
			main: whitebox,
			contrastText: lightBlue,
		},
	},
	typography: {
		fontFamily: ["IBM Plex Sans"],
	},
});

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexGrow: 1,
		maxWidth: "100%",
		overflowX: "hidden",
		minHeight: "100%",
		overflowY: "hidden",
		background: contentBack,
	},
	wrapper: {
		minHeight: "100%",
	},
}));

function NewDash(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			props.relogAction();
		}, 300000);
		return () => clearInterval(interval);
	}, [useState]);

	const handleDrawerToggle = (open) => {
		setOpen(!open);
	};

	return (
		<Container
			maxWidth={false}
			disableGutters={true}
			className={classes.root}
		>
			<Grid container className={classes.wrapper} xs={12}>
				<CssBaseline />
				<Header open={open} handleDrawerToggle={handleDrawerToggle} />
				<Sidebar
					routes={props.routes}
					open={open}
					handleDrawerToggle={handleDrawerToggle}
				/>
			</Grid>
		</Container>
	);
}

const mapStateToProps = (state) => ({
	relog: state.login,
});

const mapDispatchToProps = (dispatch) => ({
	relogAction: () => dispatch(relogUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDash);
