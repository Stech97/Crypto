import React, { Fragment, Component, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
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
import MaterialTable from "material-table";

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
				<Grid
					container
					item
					justify="center"
					alignContent="center"
					xs={12}
				>
					<img className={classes.modal} alt={alt} src={`${data}`} />
				</Grid>
			</Dialog>
		</Fragment>
	);
}

function TestRow(props) {
	return <TableRow>{props.rowData}</TableRow>;
}

function Row(props) {
	const classes = useStyles();

	const {
		kyc,
		id,
		username,
		isKYC,
		getPassportAction,
		getProofAction,
		getSelfiAction,
		pictures,
		Accept,
		Discard,
		getKYCAction,
	} = props;

	const handleAccept = (id) => {
		Accept(id);
		getKYCAction();
	};

	const handleDiscard = (id) => {
		Discard(id);
		getKYCAction();
	};

	const [files, setFiles] = useState({
		passport: "",
		proof: "",
		selfie: "",
	});

	const currentPictures = () => pictures.find((element) => element.id === id);

	useEffect(() => {
		getPassportAction(id);
		getProofAction(id);
		getSelfiAction(id);
	}, []);

	return (
		<Table size="small" aria-label="purchases">
			<TableHead>
				<TableRow>
					<TableCell align="center">
						<Typography align="center">Passport</Typography>
					</TableCell>
					<TableCell align="center">
						<Typography align="center">Proof</Typography>
					</TableCell>
					<TableCell align="center">
						<Typography align="center">Selfie</Typography>
					</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				<TableRow>
					<TableCell style={{ width: "33%" }} align="center">
						{kyc.isFetching.current ? (
							<Loader
								type="Rings"
								color="#F9A732"
								height={80}
								width={80}
							/>
						) : (
							<Image
								data={currentPictures().passport}
								alt={"passport-" + id}
							/>
						)}
					</TableCell>
					<TableCell style={{ width: "33%" }} align="center">
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
					<TableCell style={{ width: "33%" }} align="center">
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
	);
}

Row = connect(
	(state) => ({
		pictures: state.KYC.data,
		kyc: state.KYC,
	}),
	(dispatch) => ({
		getKYCAction: () => dispatch(getKYC()),
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

	const { Accept, Discard, getKYCAction, acceptAll } = props;

	useEffect(() => {
		getKYCAction();
	}, []);

	const handleAllAccept = () => {
		acceptAll();
		getKYCAction();
	};

	const handleAccept = (data) => {
		console.log("data", data);
		Accept(data);
	};

	const handleDiscard = (data) => {
		Discard(data);
	};

	const columns = [
		{
			name: "ID",
			title: "ID",
			field: "id",
			type: "numeric",
		},
		{
			title: "Username",
			name: "Username",
			field: "username",
		},
		{
			title: "Status",
			name: "Status",
			field: "isKYC",
			lookup: { true: "Accepted", false: "Declined" },
		},
	];

	const actions = [
		{
			icon: "done",
			tooltip: "Accept",
			onClick: (event, data) => handleAccept(data.id),
		},
		{
			icon: "block",
			tooltip: "Decline",
			onClick: (event, data) => handleDiscard(data.id),
		},
	];

	return (
		<Grid
			container
			my={2}
			direction="row"
			justify="space-between"
			alignItems="center"
		>
			<MaterialTable
				title="KYC requests"
				columns={columns}
				data={props.kyc.data}
				actions={actions}
				options={{
					filtering: true,
				}}
				style={{ width: "100%" }}
				detailPanel={(rowData) => {
					return <Row {...rowData} />;
				}}
				onRowClick={(event, rowData, togglePanel) => togglePanel()}
			/>
		</Grid>
	);
}

const mapStateToProps = (state) => ({
	kyc: state.KYC,
});

const mapDispatchToProps = (dispatch) => ({
	getKYCAction: () => dispatch(getKYC()),
	getPassportAction: (id) => dispatch(getPassport(id)),
	getProofAction: (id) => dispatch(getProof(id)),
	getSelfiAction: (id) => dispatch(getSelfi(id)),
	Accept: (id) => dispatch(DecisionKYC(id, true)),
	Discard: (id) => {
		dispatch(DecisionKYC(id, false, "Please, resend your KYC"));
		dispatch(getKYC());
	},
	acceptAll: () => {
		dispatch(acceptAllKYC());
		dispatch(getKYC());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(KYC);

/*
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
					Refresh
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
								<TableCell align="center">
									<Typography variant="h5">Status</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{props.kyc.data.map((rows_KYC) => (
								<Row {...rows_KYC} key={rows_KYC.id} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>

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
							{data.id}
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
							{data.username}
						</Typography>
					)}
				</TableCell>
				<TableCell align="center">
					<Button
						variant="contained"
						color="primary"
						onClick={() => handleClick(data.id)}
					>
						{open ? "Hide" : "View"}
					</Button>
				</TableCell>
				<TableCell align="center">
					<Button
						component={Box}
						mx={2}
						variant="contained"
						color="secondary"
						onClick={() => handleAccept(data.id)}
					>
						Accept
					</Button>
					<Button
						component={Box}
						mx={2}
						variant="contained"
						className={classes.discard}
						onClick={() => handleDiscard(data.id)}
					>
						Decline
					</Button>
				</TableCell>
				<TableCell align="center">
					{data.isKYC ? (
						<Typography
							align="center"
							variant="h6"
							color="secondary"
						>
							Accepted
						</Typography>
					) : (
						<Typography align="center" variant="h6" color="error">
							Declined
						</Typography>
					)}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
				>
					
				</TableCell>
			</TableRow>
		</Fragment>
*/
