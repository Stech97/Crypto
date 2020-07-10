import React, { memo } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { MinusIcon, PlusIcon } from "../../svg/iconComponents";
import { makeStyles } from "@material-ui/core/styles";

const darkBlue = "#123273";
const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
const grayText = "#838383";
const grayBack = "#efefef";
const orange = "#ed7102";
const lightBlue = "#16428d";
const whitebox = "#efefef";
const contentBack = "#f5fbff";

const BitcoinBoxStyles = makeStyles((theme) => ({
	whitebox: {
		boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
		border: "1px solid #efefef",
		backgroundColor: "#ffffff",
		borderRadius: "3vw",
		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem",
		},
	},
	header: {
		color: darkBlue,
		fontWeight: "500",
		whiteSpace: "nowrap",
		height: "3rem",
		width: "15vw",
		[theme.breakpoints.down("sm")]: {
			whiteSpace: "wrap",
		},
	},
	balanceBox: {
		display: "flex",
		flexDirection: "column",
		width: "15vw",
		height: "15vw",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "row",
			height: "auto",
			width: "100%",
		},
	},
	boxContent: {
		display: "flex",
		flexDirection: "column",
		alignContent: "center",
		justifyContent: "center",
		height: "100%",
		width: "100%",
		"&>h6": {
			color: lightBlue,
		},
		"&>p": {
			color: grayText,
		},
	},
	btcContent: {
		alignSelf: "flex-start",
		justifyContent: "center",
		width: "100%",
		height: "50%",

		[theme.breakpoints.down("sm")]: {
			height: "100%",
			width: "50%",
		},
	},
	btcButtons: {
		backgroundImage: "linear-gradient(232deg, #005c9f 0%, #123273 100%)",
		alignSelf: "flex-end",
		width: "100%",
		height: "50%",
		padding: 0,
		[theme.breakpoints.down("sm")]: {
			height: "100%",
			width: "50%",
			borderRadius: "1rem",
		},
	},
	btcPlus: {
		borderRight: "1px solid #ffffff",
		width: "50%",
		height: "100%",
		padding: 0,
		"& svg": {
			fill: "#ffffff",
			stroke: "#ffffff",
			width: "60%",
			height: "auto",
			fontSize: "3rem",
		},
		borderRadius: 0,
		"&:hover": {
			backgroundColor: orange,
		},
		[theme.breakpoints.down("sm")]: {
			"& svg": {
				height: "auto",
				width: "2rem",
			},
			borderRadius: "1rem 0 0 1rem",
		},
	},
	btcMinus: {
		borderLeft: "1px solid #ffffff",
		width: "50%",
		height: "100%",
		padding: 0,
		margin: "0!important",
		"& svg": {
			fill: "#ffffff",
			stroke: "#ffffff",
			width: "60%",
			height: "auto",
		},
		borderRadius: 0,
		"&:hover": {
			backgroundColor: orange,
		},
		[theme.breakpoints.down("sm")]: {
			"& svg": {
				height: "auto",
				width: "2rem",
			},
		},
	},
}));

export default memo(function BitcoinBox({ contentBlue, contentGray }) {
	const classes = BitcoinBoxStyles();
	return (
		<Grid justify="flex-start" container item xs={12} md={3}>
			<Typography
				align="center"
				variant="h5"
				justify="center"
				className={classes.header}
			>
				Bitcoin Balance
			</Typography>
			<Card className={clsx(classes.whitebox, classes.balanceBox)}>
				<CardContent
					className={clsx(classes.btcContent, classes.boxContent)}
				>
					<Typography variant="h6" align="center">
						{contentBlue}
					</Typography>
					<Typography
						variant="subtitle1"
						component="p"
						align="center"
					>
						{contentGray}
					</Typography>
				</CardContent>
				<CardActions className={classes.btcButtons}>
					<Button className={classes.btcPlus}>
						<PlusIcon />
					</Button>
					<Button className={classes.btcMinus}>
						<MinusIcon />
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
});
