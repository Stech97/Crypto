import React, { useEffect } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import { getLoginHistory } from "../../actions/loginhistory";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
const darkBlue = "#123273";

const useStyle = makeStyles((theme) => ({
	table: {
		background: "linear-gradient(40deg, #123273 0%, #005c9f 100%)",
		boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
		"& p": {
			color: "#fff",
		},
		borderRadius: "2vw",
		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem",
		},
	},
	header: {
		color: darkBlue,
		fontWeight: "500",
		marginBottom: "1rem",
	},
	tableHead: {
		background: "transparent",

		"& p": {
			fontWeight: "500",
		},
	},
	tableRow: {
		background: "transparent",
		border: "none",
	},
	tableCell: {
		background: "transparent",
		border: "none",
	},
	tableCellNone: {
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
}));

function Login(props) {
	useEffect(() => {
		props.getLogins();
	}, []);
	const classes = useStyle();
	return (
		<TableContainer component={Grid} spacing={2} xs={12} item>
			<Typography className={classes.header} align="left" variant="h5">
				Login history
			</Typography>
			<Table
				className={classes.table}
				component={Grid}
				spacing={2}
				container
				item
				xs={12}
				aria-label="login history"
			>
				<TableHead className={classes.tableHead} component={Box}>
					<TableRow className={classes.tableRow} component={Box}>
						<TableCell
							className={classes.tableCell}
							component={Box}
							align="left"
						>
							<Typography variant="body1">Date/Time</Typography>
						</TableCell>
						<TableCell
							className={classes.tableCell}
							component={Box}
							align="left"
						>
							<Typography variant="body1">IP</Typography>
						</TableCell>
						<TableCell
							className={clsx(
								classes.tableCell,
								classes.tableCellNone
							)}
							component={Box}
							align="left"
						>
							<Typography variant="body1">Country</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody component={Box} className={classes.tableBody}>
					{props.logins.map((row, id) => (
						<TableRow className={classes.tableRow} component={Box}>
							<TableCell
								className={classes.tableCell}
								component={Box}
								align="left"
							>
								<Typography variant="body1">
									{row.loginTime}
								</Typography>
							</TableCell>
							<TableCell
								className={classes.tableCell}
								component={Box}
								align="left"
							>
								<Typography variant="body1">
									{row.ip}
								</Typography>
							</TableCell>
							<TableCell
								className={clsx(
									classes.tableCell,
									classes.tableCellNone
								)}
								component={Box}
								align="left"
							>
								<Typography variant="body1">
									{row.country}
								</Typography>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

const mapStateToProps = (state) => ({
	logins: state.loginHistory.logins,
});

const mapDispatchToProps = (dispatch) => ({
	getLogins: () => dispatch(getLoginHistory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
