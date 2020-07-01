import React, { Component } from "react";
import { HistoryRecord } from "../history/content";
import { getInvestmentTable } from "../../actions/InvestmentTable";
import { connect } from "react-redux";

class InvestmentTable extends Component {
	componentDidMount = () => {
		this.props.getInvestmentTableAction();
	};

	render() {
		const history = [
			{
				time: "17.05/15:20",
				type: "small",
				amount: 500,
				balance: 2600,
			},
			{
				time: "17.05/15:20",
				type: "small",
				amount: 500,
				balance: 2600,
			},
			{
				time: "17.05/15:20",
				type: "small",
				amount: 500,
				balance: 2600,
			},
			{
				time: "17.05/15:20",
				type: "small",
				amount: 500,
				balance: 2600,
			},
			{
				time: "17.05/15:20",
				type: "small",
				amount: 500,
				balance: 2600,
			},
			{
				time: "17.05/15:20",
				type: "small",
				amount: 500,
				balance: 2600,
			},
			{
				time: "17.05/15:20",
				type: "small",
				amount: 500,
				balance: 2600,
			},
			{
				time: "17.05/15:20",
				type: "small",
				amount: 500,
				balance: 2600,
			},
			{
				time: "17.05/15:20",
				type: "small",
				amount: 500,
				balance: 2600,
			},
		];
		return (
			<div className="investment-history-content-box">
				{this.props.table.investments.map((record, i) => {
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
