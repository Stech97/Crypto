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
import { getKYC, acceptKYC, acceptAllKYC } from "../../actions/kyc";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

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

function KYC(props) {
	const classes = useStyles();

	useEffect(() => {
		props.getKYC();
	}, [props.kyc.accepted]);

	const handleAccept = (id) => {
		props.acceptKYCAction(id);
		props.getKYC();
	};

	const handleAllAccept = () => {
		props.acceptAllKYCAction();
		props.getKYC();
	};

	return (
		<Grid
			container
			component={Box}
			my={2}
			direction="row"
			justify="space-between"
			alignItems="center"
		>
			<Box my={2} component={Grid} item xs={3}>
				<Typography
					align="center"
					variant="h5"
					component="p"
					gutterBottom
				>
					KYC requests
				</Typography>
			</Box>
			<Box
				my={2}
				component={Grid}
				item
				container
				justify="center"
				alignContent="center"
				xs={3}
			>
				<Button
					onClick={handleAllAccept}
					variant="contained"
					color="secondary"
				>
					Bulk accept
				</Button>
			</Box>
			<Box
				my={2}
				component={Grid}
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
						size="medium"
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
									<Typography variant="h5">
										View KYC
									</Typography>
								</TableCell>
								<TableCell component={Box} align="center">
									<Typography variant="h5">
										Decision
									</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody component={Box}>
							{props.kyc.data.map((rows_KYC, id) => (
								<TableRow component={Box} key={id}>
									<TableCell component={Box} align="center">
										{props.kyc.isFetching ? (
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
												{rows_KYC.id}
											</Typography>
										)}
									</TableCell>
									<TableCell component={Box} align="center">
										{props.kyc.isFetching ? (
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
												{rows_KYC.username}
											</Typography>
										)}
									</TableCell>
									<TableCell component={Box} align="center">
										<Button
											variant="contained"
											color="primary"
										>
											View
										</Button>
									</TableCell>
									<TableCell component={Box} align="center">
										<Button
											component={Box}
											mx={2}
											variant="contained"
											color="secondary"
											onClick={() =>
												handleAccept(rows_KYC.id)
											}
										>
											Accept
										</Button>
										<Button
											component={Box}
											mx={2}
											variant="contained"
											className={classes.discard}
										>
											Discard
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Grid>
	);
}

const mapStateToProps = (state) => ({
	kyc: state.KYC,
});

const mapDispatchToProps = (dispatch) => ({
	getKYC: () => dispatch(getKYC()),
	acceptKYCAction: (id) => dispatch(acceptKYC(id)),
	acceptAllKYCAction: () => dispatch(acceptAllKYC()),
});

export default connect(mapStateToProps, mapDispatchToProps)(KYC);
