import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { RouteWithSubRoutes } from '../Routes'
import DashHeader from './components/header'
import Sidebar from './components/sidebar'
import '../styles/dashboard.scss'
import { SvgSprite }  from './svg/icons'

class AccountPage extends Component {
	
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
					<div className={this.state.isClosed ? "contentbox-closed" : "contentbox"}>
						<Switch>
							{this.props.routes.map((route, i) => (
								<RouteWithSubRoutes key={i} {...route} />
							))}
						</Switch>						
					</div>		
				</div>
			</div>
		)
	}
}

export default AccountPage