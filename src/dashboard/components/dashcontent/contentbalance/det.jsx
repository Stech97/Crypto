import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getRate } from '../../../actions/getRate'

class ContentBalanceDETSquare extends Component {
	render() {
		const { amount, isFetching, DET } = this.props
		return(
			<Fragment>
				<div className="content-balance-coin-header content-text-blue">
					<h5>DEFIMA Token Balance</h5>
				</div>
				<div className="content-balance-coin-square content-whitebox-balance content-text-blue">
					<h5>DET { isFetching ? "Loading..." : amount }</h5>
					<h6 className="content-text-grey">DET/USD {DET.isFetching ? "wait..." : DET.rate}</h6>
				</div>
			</Fragment>
		)
	}
}


const mapStateToProps = store => {
	console.log(store)
	return {
		DET: store.DETSquare,
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
)(ContentBalanceDETSquare)