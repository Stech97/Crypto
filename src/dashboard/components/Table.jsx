import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	header: {
		background: "linear-gradient(83deg, #123273 0%, #005c9f 100%)",
		color: "#fff",
		boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
		borderRadius: "2vw",
		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem",
		},
	},
	table: {},
}));

function CustomTable(props) {
	const classes = useStyles();
	const { headers, content } = props;
	return (
		<Grid item container xs={12} spacing={2} justify="flex-start">
			<TableContainer component="div">
				<Table
					component="div"
					className={classes.table}
					aria-label="customized table"
				>
					<TableHead component="div" className={classes.header}>
						<TableRow component="div">
							{headers.map((header, index) => (
								<TableCell
									component="div"
									key={index}
									align="center"
								>
									<Typography>{header}</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody component="div">
						{content.map((row, i) => (
							<TableRow component="div" key={i}>
								{Object.keys(row).map((key, i) => (
									<TableCell
										key={key}
										align="center"
										component="div"
									>
										<Typography>{row[key]}</Typography>
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
