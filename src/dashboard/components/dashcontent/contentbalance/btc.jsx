import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getRate } from "../../../actions/getRate";
import Withdraw from "./withdraw";
import TestAddFunds from "../../../containers/testaddfunds";
import Loader from "react-loader-spinner";

class ContentBalanceBTCSquare extends Component {
	state = {
		AddIsOpened: false,
		WithdrawIsOpened: false,
	};

	handleClickAdd = () => {
		this.setState({ AddIsOpened: !this.state.AddIsOpened });
	};

	handleClickWithDraw = () => {
		this.setState({ WithdrawIsOpened: !this.state.WithdrawIsOpened });
	};

	componentDidUpdate = (prevProps) => {
		if (this.props.amount !== prevProps.amount) {
			this.props.getRateAction("btc", this.props.amount);
		}
	};

	render() {
		const { amount, isFetching, BTC } = this.props;

		return (
			<Fragment>
				<div className="content-balance-btc-header content-text-blue">
					<h5>Bitcoin Balance</h5>
				</div>
				<div className="content-balance-btc-square content-whitebox-balance">
					<div className="content-balance-btc-square-text content-text-blue">
						{isFetching || BTC.isFetching ? (
							<Loader
								type="Rings"
								color="#123273"
								height={80}
								width={80}
							/>
						) : (
							<Fragment>
								<h5>
									BTC {isFetching ? "Loading..." : amount}
								</h5>
								<h6 className="content-text-grey">
									USD {BTC.isFetching ? "" : BTC.usd}
								</h6>
							</Fragment>
						)}
					</div>
					<div className="content-balance-btc-square-calc">
						<div
							className="content-balance-btc-square-calc-plus"
							onClick={() => this.handleClickAdd()}
						>
							<svg
								preserveAspectRatio="xMinYMid slice"
								viewBox="0 0 47 44"
							>
								<use href="#plus" />
							</svg>
						</div>
						<div
							className="content-balance-btc-square-calc-minus"
							onClick={() => this.handleClickWithDraw()}
						>
							<svg
								preserveAspectRatio="xMinYMid slice"
								viewBox="0 0 46 6"
							>
								<use href="#minus" />
							</svg>
						</div>
					</div>
				</div>
				<TestAddFunds
					isOpened={this.state.AddIsOpened}
					handleClick={this.handleClickAdd}
				/>
				<Withdraw
					isOpened={this.state.WithdrawIsOpened}
					handleClick={this.handleClickWithDraw}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = (store) => {
	return {
		BTC: store.BTCSquare,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getRateAction: (currency, amount) =>
			dispatch(getRate(currency, amount)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentBalanceBTCSquare);
