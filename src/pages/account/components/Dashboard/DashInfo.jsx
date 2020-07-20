import React, { Fragment, Component, useEffect } from "react";
import Whitebox from "../Whitebox";
import { connect } from "react-redux";
import { getDashInfo } from "../../actions/dashInfo";

class DashInfo extends Component {
	componentDidMount = () => {
		this.props.DashInfoAction();
	};

	render() {
		const { dashInfo, DashInfoAction } = this.props;

		return (
			<Fragment>
				<Whitebox
					header="Added Funds"
					text="BTC "
					data={dashInfo.funds.data}
					isFetching={dashInfo.funds.isFetching}
				/>
				<Whitebox
					header="Invested Amount"
					text="USD "
					data={dashInfo.investedAmount.usd}
					isFetching={dashInfo.investedAmount.isFetching}
				/>
				<Whitebox
					header="Registered Users"
					text=""
					data={dashInfo.registeredUsers.data}
					isFetching={dashInfo.registeredUsers.isFetching}
				/>
				<Whitebox
					header="Users with investments"
					text=""
					data={dashInfo.usersWithInvestments.data}
					isFetching={dashInfo.usersWithInvestments.isFetching}
				/>
				<Whitebox
					header="Withdrawn amount"
					text="BTC "
					data={dashInfo.withdrawnAmount.data}
					isFetching={dashInfo.withdrawnAmount.isFetching}
				/>
				<Whitebox
					header="User Balance"
					text="USD "
					data={dashInfo.userBalance.usd}
					isFetching={dashInfo.userBalance.isFetching}
				/>
				<Whitebox
					header="Commission payed to users"
					text="DET "
					data={dashInfo.allCommission.data}
					isFetching={dashInfo.allCommission.isFetching}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = (store) => ({
	dashInfo: store.DashInfo,
});

const mapDispatchToProps = (dispatch) => {
	return {
		DashInfoAction: () => dispatch(getDashInfo()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashInfo);
