import React, { useEffect, useState } from "react";
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
import MaterialTable from "material-table";

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

function Withdraw(props) {
	const classes = useStyles();
	const { Accept, AcceptAll, Discard } = props;
	useEffect(() => {
		props.getWithdrawAction();
	}, []);

	const columns = [
		{
			name: "ID",
			title: "ID",
			field: "userId",
			type: "numeric",
		},
		{
			title: "Username",
			name: "Username",
			field: "username",
		},
		{
			title: "Amount",
			name: "Amount",
			field: "amount",
			type: "numeric",
		},
		{
			title: "Status",
			name: "Status",
			field: "status",
		},
		{
			title: "Wallet",
			name: "Wallet",
			field: "wallet",
			sorting: false,
		},
	];

	const actions = [
		{
			icon: "done",
			tooltip: "Accept",
			onClick: (event, rowData) => {
				Accept(rowData.userId);
			},
			//disabled: (rowData) => rowData.status !== "Withdraw",
		},
		{
			icon: "block",
			tooltip: "Decline",
			onClick: (event, rowData) => Discard(rowData.userId),
			disabled: (rowData) => rowData.status !== "Withdraw",
		},
	];

	return (
		<Grid container item xs={12} component={Box} my={2}>
			<MaterialTable
				title="Withdraw requests"
				columns={columns}
				data={props.withdraw.data}
				actions={actions}
				style={{ width: "100%" }}
			/>
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
