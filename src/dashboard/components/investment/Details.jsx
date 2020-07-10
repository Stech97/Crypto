import React from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const lightBlue = "#16428d";

const useStyles = makeStyles((theme) => ({
	accordion: {
		width: "100%",
		"& h6": {
			color: lightBlue,
		},
	},
	whitebox: {
		boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
		border: "1px solid #efefef",
		backgroundColor: "#ffffff",
		borderRadius: "2vw!important",
		[theme.breakpoints.down("sm")]: {
			display: "none",
			borderRadius: "1rem",
		},
	},
}));

function Details() {
	const classes = useStyles();
	return (
		<Grid item container xs={12} spacing={2} justify="space-around">
			<Accordion className={clsx(classes.accordion, classes.whitebox)}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography variant="h6" className={classes.heading}>
						Investment Details
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Suspendisse malesuada lacus ex, sit amet blandit leo
						lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</Grid>
	);
}

export default Details;
