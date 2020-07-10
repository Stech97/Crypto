import React from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";

import BalanceBox from "./BalanceBox";
import BitcoinBox from "./BitcoinBox";

import { connect } from "react-redux";
import {
	ArrowLeft,
	ArrowRight,
	MinusIcon,
	PlusIcon,
} from "../../svg/iconComponents";

import { makeStyles } from "@material-ui/core/styles";

const darkBlue = "#123273";
const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
const grayText = "#838383";
const grayBack = "#efefef";
const orange = "#ed7102";
const lightBlue = "#16428d";
const whitebox = "#efefef";
const contentBack = "#f5fbff";

const useStyles = makeStyles((theme) => ({
	arrow: {
		alignSelf: "center",
		display: "grid",
		"&>svg": {
			justifySelf: "center",
			fill: orange,
			stroke: orange,
			height: "1em",
			width: "auto",
			fontSize: "3.5rem",
			"&:hover": {
				padding: "0.3125rem",
			},
			[theme.breakpoints.down("sm")]: {
				transform: "rotate(90deg)",
			},
		},
	},
	balance: {
		flexWrap: "nowrap",
		[theme.breakpoints.down("sm")]: {
			flexWrap: "wrap",
		},
	},
}));

function Balance() {
	const classes = useStyles();
	return (
		<Grid
			item
			container
			justify="space-between"
			spacing={2}
			xs={12}
			className={classes.balance}
		>
			<BitcoinBox contentBlue="BTC 0.658" contentGray="USD 2985" />
			<Grid className={classes.arrow} item xs={6} md="auto">
				<ArrowLeft />
			</Grid>
			<Grid className={classes.arrow} item xs={6} md="auto">
				<ArrowRight />
			</Grid>
			<BalanceBox
				header="USD Balance"
				contentBlue="USD 2000"
				contentGray={["BTC 0.256", "DET 2000"]}
				justify="center"
			/>
			<Grid className={classes.arrow} item xs={6} md="auto">
				<ArrowLeft />
			</Grid>
			<Grid className={classes.arrow} item xs={6} md="auto">
				<ArrowRight />
			</Grid>
			<BalanceBox
				header="DEFIMA Token Balance"
				contentBlue="DET 2000"
				contentGray={["DET/USD 1.0"]}
				justify="flex-end"
			/>
		</Grid>
	);
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
