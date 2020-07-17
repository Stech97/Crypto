import React, { Fragment, Component, useEffect } from 'react';
import Whitebox from '../Whitebox';
import { connect } from 'react-redux'
import { getDashInfo } from '../../actions/dashInfo'

class DashInfo extends Component {
	
	componentDidMount = () => {
		this.props.DashInfoAction()
	}

	render() {
		const { dashInfo, DashInfoAction } = this.props
		
		return(
			<Fragment>
		        <Whitebox
		          header='Added Funds'
		          text='BTC '
		          data={dashInfo.funds.data} 
		        />
		        <Whitebox
		          header='Invested Amount'
		          text='BTC '
		          data={dashInfo.investedAmount.data}
		        />
		        <Whitebox
		          header='Registered Users'
		          text=''
		          data={dashInfo.registeredUsers.data}
		        />
		        <Whitebox
		          header='Users with investments'
		          text=''
		          data={dashInfo.usersWithInvestments.data}
		        />
		        <Whitebox
		          header='Withdrawn amount'
		          text='BTC '
		          data={dashInfo.withdrawnAmount.data}
		        />
		        <Whitebox
		          header='User Balance'
		          text='USD '
		          data={dashInfo.userBalance.usd}
		        />
		        <Whitebox
		          header='Commission payed to users'
		          text='DET '
		          data={dashInfo.allCommission.data}
		        />
			</Fragment>
		)
	}
}

const mapStateToProps = (store) => ({
	dashInfo: store.DashInfo
})

const mapDispatchToProps = dispatch => {
	return {
		DashInfoAction: () => dispatch(getDashInfo())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashInfo)