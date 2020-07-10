import React, { useEffect } from "react";
import { HistoryRecord } from "../history/content";
import { getInvestmentTable } from "../../actions/InvestmentTable";
import { connect } from "react-redux";
import CsvDownload from "react-json-to-csv";
import CustomTable from "../Table";
import Grid from "@material-ui/core/Grid";

function InvestmentTable(props) {
	useEffect(() => props.getInvestmentTableAction(), []);

	const { table } = props;

	const headers = ["Day", "Product", "Investment", "Profit"];

	return (
		<Grid item container xs={12} spacing={2} justify="flex-start">
			<Grid item container xs={12} spacing={2} justify="flex-start">
				<CustomTable headers={headers} content={table.investments} />
				<CsvDownload filename="investment.csv" data={table.investments}>
					Download Statement CSV
				</CsvDownload>
			</Grid>
		</Grid>
	);
}

const mapStateToProps = (store) => ({
	table: store.investmentTable,
});

const mapDispatchToProps = (dispatch) => ({
	getInvestmentTableAction: () => dispatch(getInvestmentTable()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentTable);
