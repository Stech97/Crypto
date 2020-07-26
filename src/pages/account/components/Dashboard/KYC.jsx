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
import Fade from "@material-ui/core/Fade";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import {
	getKYC,
	DecisionKYC,
	acceptAllKYC,
	getPassport,
	getProof,
	getSelfi,
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
	image: {
		width: "25vw",
		height: "auto",
	},
	appBar: {
		position: "relative",
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	modal: {
		maxWidth: "80vw",
		maxHeight: "80vh",
	},
}));

function Image(props) {
	const classes = useStyles();
	const { data, alt } = props;
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Fragment>
			<img
				onClick={handleClickOpen}
				className={classes.image}
				alt={alt}
				src={`${data}`}
			/>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							{alt.toUpperCase()}
						</Typography>
						<IconButton
							edge="end"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Grid container justify="center" alignContent="center" xs={12}>
					<img className={classes.modal} alt={alt} src={`${data}`} />
				</Grid>
			</Dialog>
		</Fragment>
	);
}

function Row(props) {
	const classes = useStyles();

	const {
		kyc,
		id,
		username,
		getPassportAction,
		getProofAction,
		getSelfiAction,
		pictures,
		Accept,
		Discard,
		getKYC,
		decisionDefault,
	} = props;

	const [open, setOpen] = useState(false);
	const [decision, setDecision] = useState(decisionDefault);

	const handleAccept = (id) => {
		setDecision(true);
		Accept(id);
	};

	const handleDiscard = (id) => {
		setDecision(false);
		Discard(id);
	};

	const [files, setFiles] = useState({
		passport: "",
		proof: "",
		selfie: "",
	});

	const currentPictures = () => pictures.find((element) => element.id === id);

	const handleClick = (id) => {
		if (!open) {
			getPassportAction(id);
			getProofAction(id);
			getSelfiAction(id);
		}
		setOpen(!open);
	};
	console.log("currentPictures()", currentPictures());
	return (
		<Fragment>
			<TableRow>
				<TableCell align="center">
					{kyc.isFetching.get ? (
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
				<TableCell align="center">
					{kyc.isFetching.get ? (
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
				<TableCell align="center">
					<Button
						variant="contained"
						color="primary"
						onClick={() => handleClick(id)}
					>
						{open ? "Hide" : "View"}
					</Button>
				</TableCell>
				<TableCell align="center">
					{decision === undefined ? (
						<Fragment>
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
								onClick={() => handleDiscard(id)}
							>
								Decline
							</Button>
						</Fragment>
					) : decision ? (
						<Typography color="secondary">Accepted</Typography>
					) : (
						<Typography color="error">Declined</Typography>
					)}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
				>
					<Collapse in={open} style={{ width: "100%" }}>
						<Table size="small" aria-label="purchases">
							<TableHead>
								<TableRow>
									<TableCell align="center">
										<Typography align="center">
											Passport
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography align="center">
											Proof
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography align="center">
											Selfie
										</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell
										style={{ width: "33%" }}
										align="center"
									>
										{kyc.isFetching.current ? (
											<Loader
												type="Rings"
												color="#F9A732"
												height={80}
												width={80}
											/>
										) : (
											<Image
												data={
													currentPictures().passport
												}
												alt={"passport-" + id}
											/>
										)}
									</TableCell>
									<TableCell
										style={{ width: "33%" }}
										align="center"
									>
										{kyc.isFetching.current ? (
											<Loader
												type="Rings"
												color="#F9A732"
												height={80}
												width={80}
											/>
										) : (
											<Image
												data={currentPictures().proof}
												alt={"proof-" + id}
											/>
										)}
									</TableCell>
									<TableCell
										style={{ width: "33%" }}
										align="center"
									>
										{kyc.isFetching.current ? (
											<Loader
												type="Rings"
												color="#F9A732"
												height={80}
												width={80}
											/>
										) : (
											<Image
												data={currentPictures().selfie}
												alt={"selfie-" + id}
											/>
										)}
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
		pictures: state.KYC.data,
		kyc: state.KYC,
	}),
	(dispatch) => ({
		getPassportAction: (id) => dispatch(getPassport(id)),
		getProofAction: (id) => dispatch(getProof(id)),
		getSelfiAction: (id) => dispatch(getSelfi(id)),
		Accept: (id) => dispatch(DecisionKYC(id, true)),
		Discard: (id) =>
			dispatch(DecisionKYC(id, false, "Please, resend your KYC")),
	})
)(Row);

function KYC(props) {
	const classes = useStyles();

	useEffect(() => {
		props.getKYCAction();
	}, []);

	const handleAllAccept = () => {
		props.acceptAll();
		props.getKYCAction();
	};

	return (
		<Grid
			container
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
					onClick={props.getKYCAction}
					variant="contained"
					color="secondary"
				>
					Update
				</Button>
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
				<TableContainer className={classes.table} component={Paper}>
					<Table
						stickyHeader
						size="medium"
						aria-label="a dense table"
					>
						<TableHead>
							<TableRow>
								<TableCell align="center">
									<Typography variant="h5">ID</Typography>
								</TableCell>
								<TableCell align="center">
									<Typography variant="h5">User</Typography>
								</TableCell>
								<TableCell align="center">
									<Typography variant="h5">
										View KYC
									</Typography>
								</TableCell>
								<TableCell align="center">
									<Typography variant="h5">
										Decision
									</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
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
	getKYCAction: () => dispatch(getKYC()),
	acceptAll: () => dispatch(acceptAllKYC()),
});

export default connect(mapStateToProps, mapDispatchToProps)(KYC);
