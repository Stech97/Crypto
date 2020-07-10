import React, { Fragment } from "react";
import Balance from "./Balance";
import Earnings from "./Earnings";
import Links from "./Links";
import News from "./News";
import Login from "./Login";
import Grid from "@material-ui/core/Grid";
import { Helmet } from "react-helmet";

import { createMuiTheme } from "@material-ui/core/styles";

const darkBlue = "#123273";
const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
const grayText = "#838383";
const grayBack = "#efefef";
const orange = "#ed7102";
const lightBlue = "#16428d";
const whitebox = "#efefef";
const contentBack = "#f5fbff";

function NewsAndLogin() {
	return (
		<Grid item container justify="space-between" spacing={2} xs={12}>
			<Grid item container justify="center" spacing={2} xs={12} md={6}>
				<News />
			</Grid>
			<Grid item container justify="center" spacing={2} xs={12} md={6}>
				<Login />
			</Grid>
		</Grid>
	);
}

export default function DashContent() {
	return (
		<Fragment>
			<Helmet>
				<title>Investment</title>
			</Helmet>
			<Balance />
			<Earnings />
			<Links />
			<NewsAndLogin />
		</Fragment>
	);
}
/*<ContentEarnings />
			<ContentLinks />
			<ContentNewslog />*/
