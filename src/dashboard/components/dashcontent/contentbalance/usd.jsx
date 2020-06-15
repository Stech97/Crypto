import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getRate } from '../../../actions/getRate'

class ContentBalanceUSDSquare extends Component {
	render() {
		const { amount, isFetching, USD } = this.props
		return (
			<Fragment>
				<div className="content-balance-dol-header content-text-blue">
					<h3>USD Balance</h3>
				</div>
				<div className="content-balance-dol-square content-whitebox-balance content-text-blue">
					<h3>USD { isFetching ? "Loading..." : amount }</h3>
					<span className="content-text-grey">
						BTC {USD.isFetching ? "" : USD.btc}
						<br />
						DET {USD.isFetching ? "" : USD.det}
					</span>
				</div>
			</Fragment>
		)
	}
}

const mapStateToProps = store => {
	console.log(store)
	return {
		USD: store.USDSquare,
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
)(ContentBalanceUSDSquare)