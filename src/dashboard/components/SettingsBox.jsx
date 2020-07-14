import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	whitebox: {
		boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
		border: "1px solid #efefef",
		backgroundColor: "#ffffff",
		borderRadius: "2vw",
		padding: "1rem",
		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem",
		},
	},
	header: {
		color: "#123273",
		height: "2rem",
	},
}));

export default function SettingsBox(props) {
	const classes = useStyles();
	const { children, header, ...rest } = props;
	return (
		<Grid xs={12} item container {...rest}>
			{header && (
				<Grid
					className={classes.header}
					item
					xs={12}
					component={Typography}
				>
					{header}
				</Grid>
			)}
			<Grid className={classes.whitebox} item xs={12}>
				{children}
			</Grid>
		</Grid>
	);
}
