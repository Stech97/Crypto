import React, { useEffect, Fragment } from "react";
import { HistoryRecord } from "../history/content";
import { getInvestmentTable } from "../../actions/InvestmentTable";
import { connect } from "react-redux";
import CsvDownload from "react-json-to-csv";
import CustomTable from "../Table";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	button: {
		padding: "10px",
		color: "#123273",
		boxShadow: "0 0 20px rgba(0, 0, 0, 0.06)",
		backgroundColor: "#ffffff",
		border: "1px solid #efefef",
		marginTop: "20px",
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
	table: {
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
}));

function InvestmentTable(props) {
	const classes = useStyles();
	useEffect(() => props.getInvestmentTableAction(), []);

	const { table } = props;

	const headers = ["Day", "Product", "Investment", "Profit"];

	return (
		<Fragment>
			<CustomTable headers={headers} content={table.investments} />
			<Grid item container xs={12} spacing={2} justify="flex-end">
				<CsvDownload
					className={classes.button}
					filename="investment.csv"
					data={table.investments}
				>
					Download Statement CSV
				</CsvDownload>
			</Grid>
		</Fragment>
	);
}

const mapStateToProps = (store) => ({
	table: store.investmentTable,
});

const mapDispatchToProps = (dispatch) => ({
	getInvestmentTableAction: () => dispatch(getInvestmentTable()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentTable);
