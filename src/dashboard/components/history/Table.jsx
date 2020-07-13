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
	profit: {
		display: "none",
		[theme.breakpoints.down("sm")]: {
			marginTop: "20px",
			display: "flex",
		},
	},
	header: {
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

function HistoryTable(props) {
	const classes = useStyles();
	const { headers, content } = props;
	return (
		<Grid
			className={classes.profit}
			item
			container
			xs={12}
			spacing={2}
			justify="stretch"
		>
			<TableContainer component="div" className={classes.container}>
				<Table
					component="div"
					className={classes.table}
					aria-label="customized table"
				>
					<TableHead component="div" className={classes.header}>
						<TableRow component="div">
							<TableCell component="div" align="center">
								<Typography variant="subtitle1">
									Time <br /> Type
								</Typography>
							</TableCell>
							<TableCell component="div" align="center">
								<Typography variant="subtitle1">
									Amount (USD) <br /> Balance (USD)
								</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody component="div" className={classes.body}>
						{content.map((row, i) => (
							<TableRow
								component="div"
								key={i}
								className={classes.row}
							>
								<TableCell align="center" component="div">
									<Typography variant="body1">
										{row.time}
										<br />
										{row.type}
									</Typography>
								</TableCell>
								<TableCell align="center" component="div">
									<Typography variant="body1">
										{row.amount.toFixed(0)}
										<br />
										{row.balance.toFixed(0)}
									</Typography>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
}

export default HistoryTable;
