import React, { memo } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
		justifyContent: "center",
		height: "100px",
		width: "100%",
		"&>h6": {
			color: lightBlue,
		},
		"&>p": {
			color: grayText,
		},
	},
}));

export default memo(function WhiteBox({
	header,
	contentBlue,
	contentGray = "",
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
				{header}
			</Typography>
			<Card className={classes.whitebox}>
				<CardContent className={classes.boxContent}>
					<Typography variant="h6" align="center">
						{contentBlue}
					</Typography>
					{contentGray &&
						contentGray.map((row, i) => (
							<Typography
								key={i}
								variant="subtitle1"
								component="p"
								align="center"
							>
								{row}
							</Typography>
						))}
				</CardContent>
			</Card>
		</Grid>
	);
});
