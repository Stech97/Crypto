import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const lightBlue = "#16428d";

const WhiteboxStyles = makeStyles((theme) => ({
	whitebox: {
		boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
		border: "1px solid #efefef",
		backgroundColor: "#ffffff",
		borderRadius: "2vw",
		margin: "8px",
		color: lightBlue,
		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem",
		},
		[theme.breakpoints.down("xs")]: {
			"& h6": {
				fontSize: "10px",
			},
		},
	},
	linkbox: {
		padding: "16px",
	},
	row: {
		[theme.breakpoints.down("sm")]: {
			borderBottom: "1px solid #efefef",
			"&:last-child": {
				borderBottom: "none",
			},
		},
	},
}));

function Links() {
	const classes = WhiteboxStyles();
	return (
		<Grid
			xs={12}
			item
			container
			justify="flex-start"
			spacing={2}
			direction="row"
			className={classes.linkbox}
		>
			<Grid
				xs={12}
				item
				container
				justify="center"
				spacing={2}
				direction="row"
				className={classes.whitebox}
			>
				<Grid item xs={12} md={6} className={classes.row}>
					<Typography variant="h6" align="center">
						REF Link https://defima.io/referal/blabla
					</Typography>
				</Grid>
				<Grid item xs={12} md={6} className={classes.row}>
					<Typography variant="h6" align="center">
						REF Link https://defima.io/referal/blabla
					</Typography>
				</Grid>
			</Grid>
			<Grid
				xs={12}
				item
				container
				justify="center"
				spacing={2}
				direction="row"
				className={classes.whitebox}
			>
				<Grid item xs={12} md={4} className={classes.row}>
					<Typography variant="h6" align="center">
						Business Presentation PDF
					</Typography>
				</Grid>
				<Grid item xs={12} md={4} className={classes.row}>
					<Typography variant="h6" align="center">
						Image Video
					</Typography>
				</Grid>
				<Grid item xs={12} md={4} className={classes.row}>
					<Typography variant="h6" align="center">
						Tutorial PDF
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Links;
