import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import DefaultTableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import DefaultTableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import {
	getWithdraw,
	WithdrawAcceptAll,
	WithdrawAccept,
	WithdrawDiscard,
} from "../../actions/withdraw";

const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 650,
		marginTop: "20px",
		maxHeight: 400,
	},
	discard: {
		color: "#fff",
		border: "2px solid #b71c1c",
		backgroundColor: "#b71c1c",
		"&:hover": {
			color: "#b71c1c",
			backgroundColor: "#fff",
		},
	},
}));

const TableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.black,
	},
}))(DefaultTableCell);

const TableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(DefaultTableRow);

function Withdraw(props) {
	const classes = useStyles();
	const { Accept, AcceptAll, Discard } = props;
	useEffect(() => {
		props.getWithdrawAction();
	}, []);

	return (
		<Grid
			container
			component={Box}
			my={2}
			direction="row"
			justify="space-between"
			alignItems="center"
		>
			<Grid my={2} component={Box} item xs={3}>
				<Typography
					align="center"
					variant="h5"
					component="p"
					gutterBottom
				>
					Withdraw requests
				</Typography>
			</Grid>
			<Grid
				my={2}
				component={Box}
				item
				container
				justify="center"
				xs={12}
			>
				<TableContainer
					component={Box}
					className={classes.table}
					component={Paper}
				>
					<Table
						stickyHeader
						component={Box}
						size="small"
						aria-label="a dense table"
					>
						<TableHead component={Box}>
							<TableRow component={Box}>
								<TableCell component={Box} align="center">
									<Typography variant="h5">ID</Typography>
								</TableCell>
								<TableCell component={Box} align="center">
									<Typography variant="h5">User</Typography>
								</TableCell>
								<TableCell component={Box} align="center">
									<Typography variant="h5">Amount</Typography>
								</TableCell>
								<TableCell component={Box} align="center">
									<Typography variant="h5">
										Decision
									</Typography>
								</TableCell>
								<TableCell component={Box} align="center">
									<Typography variant="h5">Status</Typography>
								</TableCell>
								<TableCell component={Box} align="center">
									<Typography variant="h5">Wallet</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody component={Box}>
							{props.withdraw.data.map((rows, id) => (
								<TableRow component={Box} key={id}>
									<TableCell component={Box} align="center">
										{props.withdraw.isFetching.data ? (
											<Loader
												type="Rings"
												color="#F9A732"
												height={80}
												width={80}
											/>
										) : (
											<Typography
												align="center"
												variant="h6"
											>
												{rows.userId}
											</Typography>
										)}
									</TableCell>
									<TableCell component={Box} align="center">
										{props.withdraw.isFetching.data ? (
											<Loader
												type="Rings"
												color="#F9A732"
												height={80}
												width={80}
											/>
										) : (
											<Typography
												align="center"
												variant="h6"
											>
												{rows.username}
											</Typography>
										)}
									</TableCell>
									<TableCell component={Box} align="center">
										{props.withdraw.isFetching.data ? (
											<Loader
												type="Rings"
												color="#F9A732"
												height={80}
												width={80}
											/>
										) : (
											<Typography
												align="center"
												variant="h6"
											>
												{rows.amount}
											</Typography>
										)}
									</TableCell>
									<TableCell component={Box} align="center">
										<Button
											component={Box}
											mx={2}
											variant="contained"
											color="primary"
											onClick={() => Accept(rows.userId)}
										>
											Accept
										</Button>
										<Button
											component={Box}
											mx={2}
											variant="contained"
											className={classes.discard}
											onClick={() => Discard(rows.userId)}
										>
											Discard
										</Button>
									</TableCell>
									<TableCell component={Box} align="center">
										{props.withdraw.isFetching.withdraw ? (
											<Loader
												type="Rings"
												color="#F9A732"
												height={80}
												width={80}
											/>
										) : (
											<Typography
												align="center"
												variant="h6"
											>
												{rows.status === undefined
													? "Unknown"
													: rows.status
													? "Accepted"
													: "Discarded"}
											</Typography>
										)}
									</TableCell>
									<TableCell component={Box} align="center">
										{props.withdraw.isFetching.withdraw ? (
											<Loader
												type="Rings"
												color="#F9A732"
												height={80}
												width={80}
											/>
										) : (
											<Typography
												align="center"
												variant="h6"
											>
												{rows.wallet ? rows.wallet : ""}
											</Typography>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</Grid>
	);
}

const mapStateToProps = (state) => ({
	withdraw: state.Withdraw,
});

const mapDispatchToProps = (dispatch) => ({
	getWithdrawAction: () => dispatch(getWithdraw()),
	Accept: (id) => dispatch(WithdrawAccept(id)),
	Discard: (id) => dispatch(WithdrawDiscard(id)),
	AcceptAll: () => dispatch(WithdrawAcceptAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Withdraw);
