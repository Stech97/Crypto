import React, { Component } from 'react'
import API from '../../config'
import { connect } from 'react-redux'
import { setUser } from '../actions/header'

class DashHeader extends Component {

	state = {
		isClosed: true,
	};

	toggle = (value) => {
    	this.setState({ isClosed: !value })
    }

    componentDidMount() {
    	this.props.setUserAction();
    } 

	render() {
		return (
			<div className="dash-header">
				<div className="dash-header-logo">
					<img src="img/logo.png" />
				</div>
				<div className="dash-header-user">
					<div className={"dash-header-user-menu" + (this.state.isClosed ? "-closed" : "") }>
						<div className={"dash-header-user-menu" + (this.state.isClosed ? "-closed" : "-opened")}>
							<svg className="dash-header-user-menu-settings-icon" preserveAspectRatio="xMinYMid slice" viewBox="0 0 37 37">
								<use href="#settings" />
							</svg>
							<div className="dash-header-user-menu-settings-text">
								<p>Settings</p>
							</div>
							<svg className="dash-header-user-menu-line">
								<hr />
							</svg>
							<svg className="dash-header-user-menu-logout-icon" preserveAspectRatio="xMinYMid slice" viewBox="0 0 37 37">
								<use href="#dashboards-icon-white" />
							</svg>
							<div className="dash-header-user-menu-logout-text">
								<p>Logout</p>
							</div>
						</div>
					</div>
				<div className="dash-header-user-icon">
					<svg preserveAspectRatio="xMinYMid slice" viewBox="0 0 37 37">
						<use href="#dashboards-icon-white"/>
					</svg>
				</div>
				<div className="dash-header-user-name">
					<h2>{ this.props.user.isFetching ? "Loading..." : this.props.user.username }</h2>
				</div>
				    <div className="dash-header-user-arrow"> 
					  	<svg 
					  		onClick={() => this.toggle(this.state.isClosed)}
					  		role="img"
					  		className={"dash-header-user-arrow" + (this.state.isClosed ? "-closed" : "") }
					  		preserveAspectRatio="xMinYMin slice" viewBox="0 0 25 15"
					  	>
					    	<use href="#arrow-down" />
					  	</svg>
					</div>
			  </div>
			</div>
		)
	}
}

const mapStateToProps = store => {
	console.log(store)
	return {
		user: store.DashHeader
	}
}

const mapDispatchToProps = dispatch => {
  return {
    setUserAction: username => dispatch(setUser(username)),
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DashHeader)