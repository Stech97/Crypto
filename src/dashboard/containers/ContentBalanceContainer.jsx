import React, { Component, useEffect } from "react";
import ContentBalanceBTCSquare from "../components/dashcontent/contentbalance/btc";
import ContentBalanceUSDSquare from "../components/dashcontent/contentbalance/usd";
import ContentBalanceDETSquare from "../components/dashcontent/contentbalance/det";
import ContentBalanceConverter from "../components/dashcontent/contentbalance/converter";
import { connect } from "react-redux";
import { getBalance } from "../actions/getBalance";

function ContentBalanceContainer(props) {
	useEffect(() => {
		return () => {
			props.getBalanceAction();
		};
	}, []);

	const { balance, user } = props;
	return (
		<div className="content-balance">
			<ContentBalanceBTCSquare
				currency="btc"
				amount={balance.btc}
				isFetching={balance.isFetching}
			/>
			<ContentBalanceConverter currency1="btc" currency2="dol" />
			<ContentBalanceUSDSquare
				currency="usd"
				amount={balance.usd}
				isFetching={balance.isFetching}
			/>
			<ContentBalanceConverter currency1="dol" currency2="coin" />
			<ContentBalanceDETSquare
				currency="det"
				amount={balance.det}
				isFetching={balance.isFetching}
			/>
		</div>
	);
}

const mapStateToProps = (store) => {
	return {
		balance: store.ContentBalanceContainer,
		user: store.DashHeader,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getBalanceAction: () => dispatch(getBalance()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentBalanceContainer);
