import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getRate } from '../../../actions/getRate'
import Loader from 'react-loader-spinner'

class ContentBalanceUSDSquare extends Component {

	componentDidUpdate = (prevProps) => {
		if (this.props.amount !== prevProps.amount) {
			this.props.getRateAction('usd', this.props.amount)
		}
	}

	render() {
		const { amount, isFetching, USD } = this.props
		return (
			<Fragment>
				<div className="content-balance-dol-header content-text-blue">
					<h5>USD Balance</h5>
				</div>
				<div className="content-balance-dol-square content-whitebox-balance content-text-blue">
					{ (isFetching || USD.isFetching) ?
						<Loader type="Rings" color="#123273" height={80} width={80}/>
					:
						<Fragment>
							<h5>USD {amount}</h5>
							<h6 className="content-text-grey">
								BTC {USD.btc}
								<br />
								DET {USD.det}
							</h6>
						</Fragment>
					}
				</div>
			</Fragment>
		)
	}
}

const mapStateToProps = store => {
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