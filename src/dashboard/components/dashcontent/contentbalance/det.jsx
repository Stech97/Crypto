import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getRate } from '../../../actions/getRate'

class ContentBalanceDETSquare extends Component {
	render() {
		const { amount, isFetching, DET } = this.props
		return(
			<Fragment>
				<div className="content-balance-coin-header content-text-blue">
					<h3>DEFIMA Token Balance</h3>
				</div>
				<div className="content-balance-coin-square content-whitebox-balance content-text-blue">
					<h3>DET { isFetching ? "Laoding..." : amount }</h3>
					<span className="content-text-grey">DET/USD {DET.isFetching ? "wait..." : DET.rate}</span>
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