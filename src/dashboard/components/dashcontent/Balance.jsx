import React, { Component, Fragment } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ArrowLeft, ArrowRight } from "../../svg/iconComponents";

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
	whitebox: {
		boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
		border: "1 solid #efefef",
		backgroundColor: "#ffffff",
		borderRadius: "3.125rem",
	},
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
		},
	},
	header: {
		color: darkBlue,
		fontWeight: "500",
	},
	balanceBox: {
		height: 235,
	},
}));

function Balance() {
	const classes = useStyles();
	return (
		<Fragment>
			<Grid
				item
				container
				xs={12}
				spacing={2}
				justify="space-around"
				alignContent="center"
			>
				<Grid
					component={Typography}
					align="center"
					variant="h5"
					justify="center"
					item
					xs={12}
					md={2}
					className={classes.header}
				>
					Bitcoin Balance
				</Grid>
				<Grid justify="center" item xs={6} md={1} />
				<Grid justify="center" item xs={6} md={1} />
				<Grid
					component={Typography}
					align="center"
					variant="h5"
					justify="center"
					item
					xs={12}
					md={2}
					className={classes.header}
				>
					USD Balance
				</Grid>
				<Grid justify="center" item xs={6} md={1} />
				<Grid justify="center" item xs={6} md={1} />
				<Grid
					component={Typography}
					align="center"
					variant="h5"
					justify="center"
					item
					xs={12}
					md={2}
					className={classes.header}
				>
					DEFIMA Token
				</Grid>
			</Grid>
			<Grid
				item
				container
				xs={12}
				spacing={2}
				justify="space-around"
				alignContent="center"
			>
				<Grid
					className={clsx(classes.whitebox, classes.balanceBox)}
					justify="center"
					item
					xs={12}
					md={2}
				></Grid>
				<Grid className={classes.arrow} item xs={6} md={1}>
					<ArrowLeft />
				</Grid>
				<Grid className={classes.arrow} item xs={6} md={1}>
					<ArrowRight />
				</Grid>
				<Grid
					className={clsx(classes.whitebox, classes.balanceBox)}
					justify="center"
					item
					xs={12}
					md={2}
				></Grid>
				<Grid className={classes.arrow} item xs={6} md={1}>
					<ArrowLeft />
				</Grid>
				<Grid className={classes.arrow} item xs={6} md={1}>
					<ArrowRight />
				</Grid>
				<Grid
					className={clsx(classes.whitebox, classes.balanceBox)}
					justify="center"
					item
					xs={12}
					md={2}
				></Grid>
			</Grid>
		</Fragment>
	);
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
