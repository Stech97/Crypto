import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
	profit: {
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
		marginTop: "20px",
	},
	header: {
		position: "sticky",
		background: "linear-gradient(83deg, #123273 0%, #005c9f 100%)",
		"&>div": {
			color: "#fff",
		},
		"& h6": {
			color: "#fff",
		},
	},
	table: {
		boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
	},
	container: {
		borderRadius: "2vw",
		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem 1rem 0 0",
		},
	},
	body: {
		maxHeight: "300px",
		overflow: "scroll",
	},
	row: {
		background: "#fff",
		"&>div": {
			border: "none",
		},
		"& p": {
			color: "#838383",
		},
	},
}));

function CustomTable(props) {
	const classes = useStyles();
	const { headers, content } = props;
	return (
		<Grid
			className={classes.profit}
			item
			container
			xs={12}
			spacing={2}
			justify="center"
		>
			<TableContainer component={Box} className={classes.container}>
				<Table
					component={Box}
					className={classes.table}
					aria-label="customized table"
				>
					<TableHead component={Box} className={classes.header}>
						<TableRow component={Box}>
							{headers.map((header, index) => (
								<TableCell
									component={Box}
									key={index}
									align="center"
								>
									<Typography variant="subtitle1">
										{header}
									</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody component={Box} className={classes.body}>
						{content.map((row, i) => (
							<TableRow
								component={Box}
								key={i}
								className={classes.row}
							>
								{Object.keys(row).map((key, i) => (
									<TableCell
										key={key}
										align="center"
										component={Box}
									>
										<Typography variant="body1">
											{typeof row[key] === "string"
												? key === "time" ||
												  key === "day"
													? moment(row[key]).format(
															"YYYY-MM-DD"
													  )
													: row[key]
												: row[key].toFixed(2)}
										</Typography>
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
}

export default CustomTable;
