import React, { Component } from "react";
import { HistoryRecord } from "../history/content";
import { getInvestmentTable } from "../../actions/InvestmentTable";
import { connect } from "react-redux";
import CsvDownload from "react-json-to-csv";

class InvestmentTable extends Component {
	componentDidMount = () => {
		this.props.getInvestmentTableAction();
	};

	render() {
		const { table } = this.props;
		return (
			<div className="investment-history">
				<h3 className="investment-history-header">
					Transaction History
				</h3>
				<div className="investment-history-content">
					<div className="investment-history-content-header">
						<h5 className="investment-history-content-row-column">
							Day
						</h5>
						<h5 className="investment-history-content-row-column">
							Product
						</h5>
						<h5 className="investment-history-content-row-column">
							Investment
						</h5>
						<h5 className="investment-history-content-row-column">
							Profit
						</h5>
					</div>
					<div className="investment-history-content-box">
						{table.investments.map((record, i) => {
							return (
								<HistoryRecord
									key={i}
									record={{
										time: record.day,
										type: record.product,
										amount: record.investment,
										balance: record.profit,
									}}
								/>
							);
						})}
					</div>
				</div>
				<CsvDownload
					className="investment-history-download"
					filename="investment.csv"
					data={table.investments}
				>
					Download Statement CSV
				</CsvDownload>
			</div>
		);
	}
}

const mapStateToProps = (store) => ({
	table: store.investmentTable,
});

const mapDispatchToProps = (dispatch) => ({
	getInvestmentTableAction: () => dispatch(getInvestmentTable()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentTable);
