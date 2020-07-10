import React, { Fragment } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import WhiteBox from "../Whitebox";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import SvgIcon from "@material-ui/core/SvgIcon";

const darkBlue = "#123273";
const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
const grayText = "#838383";
const grayBack = "#efefef";
const orange = "#ed7102";
const lightBlue = "#16428d";
const whitebox = "#efefef";
const contentBack = "#f5fbff";

const WhiteboxStyles = makeStyles((theme) => ({
	whitebox: {
		boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
		border: "1px solid #efefef",
		backgroundColor: "#ffffff",
		borderRadius: "2vw",
		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem",
		},
	},
	header: {
		color: darkBlue,
		fontWeight: "500",
		whiteSpace: "nowrap",
		height: "3rem",
	},
	boxContent: {
		display: "flex",
		flexDirection: "column",
		alignContent: "center",
		justifyContent: "space-around",
		height: "270px",
		width: "100%",
		"& h6": {
			color: lightBlue,
		},
		"& p": {
			color: grayText,
		},
	},
	svgGraph: {
		display: "flex",
		boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
		border: "1px solid #efefef",
		borderRadius: "2vw",
		width: "100%",
		height: "270px",
		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem",
		},
		"&>svg": {
			alignSelf: "flex-end",
			width: "100%",
			borderRadius: "0 0 2vw 2vw",
			[theme.breakpoints.down("sm")]: {
				borderRadius: "0 0 1rem 1rem",
			},
		},
	},
}));

function Graph({ height, ...rest }) {
	const classes = WhiteboxStyles();
	return (
		<Grid container item {...rest} direction="column">
			<Typography
				align="center"
				variant="h5"
				justify="flex-start"
				align="center"
				className={classes.header}
			>
				300 %
			</Typography>
			<div className={classes.svgGraph}>
				<SvgIcon
					viewBox="0 0 170 106"
					preserveAspectRatio="xMidYMin slice"
					style={{ height: 30 + 0.8 * height + "%" }}
				>
					<defs>
						<linearGradient
							id="p70ca"
							x1="160"
							x2="9.1"
							y1="0.69"
							y2="106"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" stopColor="#005c9f"></stop>
							<stop offset="1" stopColor="#253771"></stop>
						</linearGradient>
					</defs>
					<path
						fill="url(#p70ca)"
						d="M.599 12.286s34.548 8.572 50.288-5.695c15.74-14.267 30.663 1.252 46.416 5.695 15.751 4.443 24.343.508 32.248-5.695 7.904-6.202 29.621 4.272 39.495 5.695l.052.008v77.36c0 .606-.033 1.204-.098 1.792V106H0V16h.599z"
					/>
				</SvgIcon>
			</div>
		</Grid>
	);
}

function TotalProfits({
	totalProfitBlue,
	totalProfitGray,
	last24Blue,
	last24Gray,
	...rest
}) {
	const classes = WhiteboxStyles();
	return (
		<Grid container item {...rest} direction="column">
			<Typography
				align="center"
				variant="h5"
				justify="flex-start"
				align="center"
				className={classes.header}
			>
				Total Profits
			</Typography>
			<Card className={classes.whitebox}>
				<CardContent className={classes.boxContent}>
					<div>
						<Typography variant="h6" align="center">
							{totalProfitBlue}
						</Typography>
						<Typography
							variant="subtitle1"
							component="p"
							align="center"
						>
							{totalProfitGray}
						</Typography>
					</div>
					<Typography variant="h6" align="center">
						Last 24h
					</Typography>
					<div>
						<Typography variant="h6" align="center">
							{last24Blue}
						</Typography>
						<Typography
							variant="subtitle1"
							component="p"
							align="center"
						>
							{last24Gray}
						</Typography>
					</div>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default function Earnings() {
	return (
		<Grid item container justify="space-between" spacing={2} xs={12}>
			<Grid
				xs={12}
				md={6}
				item
				container
				justify="space-between"
				spacing={2}
			>
				<WhiteBox
					direction="column"
					xs={12}
					sm={6}
					header="Total Investments"
					contentBlue="BTC 1.023"
					contentGray={["USD 7,012"]}
				/>
				<WhiteBox
					direction="column"
					xs={12}
					sm={6}
					justify="space-between"
					header="Profit from Invest"
					contentBlue="DET 423"
					contentGray={["USD 423"]}
				/>
				<WhiteBox
					direction="column"
					xs={12}
					sm={6}
					justify="space-between"
					header="Total Team Members"
					contentBlue="300 Members"
				/>
				<WhiteBox
					direction="column"
					xs={12}
					sm={6}
					justify="space-between"
					header="Total Team Earnings"
					contentBlue="DET 423"
					contentGray={["USD 423"]}
				/>
			</Grid>
			<Grid
				xs={12}
				md={6}
				item
				container
				justify="space-between"
				spacing={2}
			>
				<TotalProfits
					totalProfitBlue="BTC 1.023"
					totalProfitGray="USD 7012"
					last24Blue="BTC 1.023"
					last24Gray="USD 7012"
					xs={12}
					sm={6}
				/>
				<Graph xs={12} sm={6} height={50} />
			</Grid>
		</Grid>
	);
}
