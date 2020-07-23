import React, { Fragment, Component, useEffect, useState } from "react";
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
import Collapse from "@material-ui/core/Collapse";

import {
	getKYC,
	acceptKYC,
	acceptAllKYC,
	getPictures,
} from "../../actions/kyc";
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

function Row(props) {
	const classes = useStyles();

	const {
		isFetching,
		id,
		username,
		getPicturesAction,
		pictures,
		acceptKYCAction,
		getKYC,
	} = props;

	const [open, setOpen] = useState(false);
	const [files, setFiles] = useState({
		proof: "",
		selfie: "",
		passport: "",
	});

	const handleAccept = (id) => {
		acceptKYCAction(id);
		getKYC();
	};

	const handleClick = (id) => {
		setOpen(!open);
		getPicturesAction(id);
		setFiles(pictures.find((element) => element.id === id));
	};

	return (
		<Fragment>
			<TableRow component={Box}>
				<TableCell component={Box} align="center">
					{isFetching ? (
						<Loader
							type="Rings"
							color="#F9A732"
							height={80}
							width={80}
						/>
					) : (
						<Typography align="center" variant="h6">
							{id}
						</Typography>
					)}
				</TableCell>
				<TableCell component={Box} align="center">
					{isFetching ? (
						<Loader
							type="Rings"
							color="#F9A732"
							height={80}
							width={80}
						/>
					) : (
						<Typography align="center" variant="h6">
							{username}
						</Typography>
					)}
				</TableCell>
				<TableCell component={Box} align="center">
					<Button
						variant="contained"
						color="primary"
						onClick={() => handleClick(id)}
					>
						{open ? "Hide" : "View"}
					</Button>
				</TableCell>
				<TableCell component={Box} align="center">
					<Button
						component={Box}
						mx={2}
						variant="contained"
						color="secondary"
						onClick={() => handleAccept(id)}
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
			<TableRow component={Box}>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
				>
					<Collapse
						in={open}
						component={Box}
						style={{ width: "100%" }}
						keepMounted
					>
						<Table size="small" aria-label="purchases">
							<TableHead component={Box}>
								<TableRow component={Box}>
									<TableCell component={Box} align="center">
										<Typography align="center">
											Passport
										</Typography>
									</TableCell>
									<TableCell component={Box} align="center">
										<Typography align="center">
											Proof
										</Typography>
									</TableCell>
									<TableCell component={Box} align="center">
										<Typography align="center">
											Selfie
										</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell
										component={Box}
										style={{ width: "33%" }}
										align="center"
									>
										<img
											src="/img/defimacoin.png"
											style={{
												maxHeight: "400px",
												width: "100%",
											}}
											alt={"passport-" + id}
										/>
									</TableCell>
									<TableCell
										component={Box}
										style={{ width: "33%" }}
										align="center"
									>
										<img
											src={pictures.proof}
											style={{
												maxHeight: "400px",
												width: "100%",
											}}
											alt={"proof-" + id}
										/>
									</TableCell>
									<TableCell
										component={Box}
										style={{ width: "33%" }}
										align="center"
									>
										<img
											src={pictures.selfie}
											style={{
												maxHeight: "400px",
												width: "100%",
											}}
											alt={"selfie-" + id}
										/>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	);
}

Row = connect(
	(state) => ({
		pictures: state.KYC.pictures,
		isFetching: state.KYC.isFetching,
	}),
	(dispatch) => ({
		getPicturesAction: (type, id) => dispatch(getPictures(type, id)),
		acceptKYCAction: (id) => dispatch(acceptKYC(id)),
		getKYC: () => dispatch(getKYC()),
	})
)(Row);

function KYC(props) {
	const classes = useStyles();

	useEffect(() => {
		props.getKYC();
	}, [props.kyc.accepted]);

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
							{props.kyc.data.map((rows_KYC) => (
								<Row
									id={rows_KYC.id}
									username={rows_KYC.username}
									key={rows_KYC.id}
								/>
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
	acceptAllKYCAction: () => dispatch(acceptAllKYC()),
});

export default connect(mapStateToProps, mapDispatchToProps)(KYC);
