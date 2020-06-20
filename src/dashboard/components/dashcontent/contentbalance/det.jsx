import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getRate } from '../../../actions/getRate'
import Loader from 'react-loader-spinner'

class ContentBalanceDETSquare extends Component {
	
	componentDidMount = () => {
		this.props.getRateAction(this.props.amount)
	}
/*
	componentDidUpdate = (prevProps) => {
		if (this.props.amount !== prevProps.amount) {
			this.props.getRateAction('det', this.props.amount)
		}
	}
*/
	render() {
		const { amount, isFetching, DET } = this.props
		return(
			<Fragment>
				<div className="content-balance-coin-header content-text-blue">
					<h5>DEFIMA Token Balance</h5>
				</div>
				<div className="content-balance-coin-square content-whitebox-balance content-text-blue">
					{ (isFetching || DET.isFetching) ?
						<Loader type="Rings" color="#00BFFF" height={80} width={80}/>
					:
						<Fragment>
							<h5>DET { isFetching ? "Loading..." : amount }</h5>
							<h6 className="content-text-grey">DET/USD {DET.rate}</h6>
						</Fragment>
					}
				</div>
			</Fragment>
		)
	}
}


const mapStateToProps = store => {
	return {
		DET: store.DETSquare,
	}
}

const mapDispatchToProps = dispatch => {
  return {
    getRateAction: (amount) => dispatch(getRate('det', amount)),
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentBalanceDETSquare)