import React, { Component } from 'react'
import DashHeader from './components/header'
import Sidebar from './components/sidebar'
import InvestmentContent from './components/investment/content'
import '../styles/dashboard.scss'
import { SvgSprite }  from './svg/icons'

class Investment extends Component {
	
	state = {
		isClosed: false
	};

	toggle = (value) => {
		this.setState({ isClosed: !value })
	}
		
	render() {
		return (
			<div className="dash">
				<SvgSprite />
				<div className={this.state.isClosed ? "dash-wrapper-closed" : "dash-wrapper"}>
					<DashHeader />
					<Sidebar isClosed={this.state.isClosed} toggle={this.toggle} />
					<InvestmentContent />
				</div>
			</div>
		)
	}
}
/*
const mapStateToProps = state => {
	console.log(state)
	return {
		Sidebar: state.Sidebar
	}
}

const mapDispatchToProps = (dispatch) => ({
		toggleSidebar: (isClosed) => dispatch(toggleSidebar(), isClosed),
})
*/
export default Investment
