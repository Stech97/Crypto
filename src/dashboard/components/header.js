import React, { Component } from 'react'

class DashHeader extends Component {
	render() {
		return (
			<div className="dash-header">
			    <div className="dash-header-logo">
			      <img src="img/logo.png" alt="logo" />
			    </div>
			    <div className="dash-header-user">
			      <div className="dash-header-user-icon">
			        <img src="img/user-icon.png" alt="usericon" />
			      </div>
			      <div className="dash-header-user-name">
			        <h2>User</h2>
			      </div>
			      <div className="dash-header-user-arrow">
			        <img src="img/arrow-down.png" alt="arrow-down" />
			      </div>
			    </div>
			</div>
		)
	}
}

export default DashHeader