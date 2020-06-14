import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getRate } from '../../../actions/getRate'
import TestAddFunds from '../../../containers/testaddfunds'

class ContentBalanceBTCSquare extends Component {

	state = {
		isOpened: false,
	}

	handleClick = () => {
		this.setState({ isOpened: !this.state.isOpened })
	}

	render() {

		const { amount, isFetching, BTC } = this.props
		return(
			<Fragment>
				<div className="content-balance-btc-header content-text-blue">
					<h3>Bitcoin Balance</h3>
				</div>
				<div className="content-balance-btc-square content-whitebox-balance">
					<div className="content-balance-btc-square-text content-text-blue">
						<h3>BTC { isFetching ? "Loading..." : amount }</h3>
						<span className="content-text-grey">USD {BTC.isFetching ? "" : BTC.usd}</span>
					</div>
					<div className="content-balance-btc-square-calc">
						<div
							className="content-balance-btc-square-calc-plus"
							onClick={ () => this.handleClick() }
						>
							<svg
								preserveAspectRatio="xMinYMid slice"
								viewBox="0 0 47 44"
							>
								<use href="#plus" />
							</svg>
						</div>
						<div className="content-balance-btc-square-calc-line">
							<div className={"content-balance-btc-square-calc-line-border"}></div>
						</div>
						<div
							className="content-balance-btc-square-calc-minus"
							onClick={ () => this.handleClick() }
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
					isOpened = { this.state.isOpened }
					handleClick = { this.handleClick }
				/>
			</Fragment>
		)
	}
}

const mapStateToProps = store => {
	console.log(store)
	return {
		BTC: store.BTCSquare,
	}
}

const mapDispatchToProps = dispatch => {
  return {
    getRateAction: (currency, amount) => dispatch(getRate(currency, amount)),
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentBalanceBTCSquare)