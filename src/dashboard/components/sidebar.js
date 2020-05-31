import React, { Component } from 'react'

class Sidebar extends Component {
	render() {
		return (
		  <div className="sidebar">
		    <div className="sidebar-burger" />
		    <div className="sidebar-dash sidebar-bar sidebar-bar-selected">
		      <div className="sidebar-bar-icon">
		        <img src="img/icon-dashboards.png" alt="icon-dashboards" />
		      </div>
		      <div className="sidebar-bar-text">
		        <h3>Dashboards</h3>
		      </div>
		      <div className="sidebar-bar-arrow">
		        <img src="img/arrow-right.png" alt="arrow-right" />
		      </div>
		    </div>
		    <div className="sidebar-investment sidebar-bar">
		      <div className="sidebar-bar-icon">
		        <img src="img/icon-investment.png" alt="icon-investment" />
		      </div>
		      <div className="sidebar-bar-text">
		        <h3>Investment</h3>
		      </div>
		      <div className="sidebar-bar-arrow">
		        <img src="img/arrow-right.png" alt="arrow-right" />
		      </div>
		    </div>
		    <div className="sidebar-team sidebar-bar">
		      <div className="sidebar-bar-icon">
		        <img src="img/icon-team.png" alt="icon-team" />
		      </div>
		      <div className="sidebar-bar-text">
		        <h3>Team</h3>
		      </div>
		      <div className="sidebar-bar-arrow">
		        <img src="img/arrow-right.png" alt="arrow-right" />
		      </div>
		    </div>
		    <div className="sidebar-marketing sidebar-bar">
		      <div className="sidebar-bar-icon">
		        <img src="img/icon-marketing.png" alt="icon-marketing" />
		      </div>
		      <div className="sidebar-bar-text">
		        <h3>Marketing</h3>
		      </div>
		      <div className="sidebar-bar-arrow">
		        <img src="img/arrow-right.png" alt="arrow-right" />
		      </div>
		    </div>
		    <div className="sidebar-history sidebar-bar">
		      <div className="sidebar-bar-icon">
		        <img src="img/icon-history.png" alt="icon-history" />
		      </div>
		      <div className="sidebar-bar-text">
		        <h3>History</h3>
		      </div>
		      <div className="sidebar-bar-arrow">
		        <img src="img/arrow-right.png" alt="arrow-right" />
		      </div>
		    </div>
		    <div className="sidebar-support sidebar-bar">
		      <div className="sidebar-bar-icon">
		        <img src="img/icon-support.png" alt="icon-support" />
		      </div>
		      <div className="sidebar-bar-text">
		        <h3>Support</h3>
		      </div>
		      <div className="sidebar-bar-arrow">
		        <img src="img/arrow-right.png" alt="arrow-right" />
		      </div>
		    </div>
		    <div className="sidebar-time">
		      <p>Server Time: 04:20:59</p>
		    </div>
		  </div>
		)
	}
}

export default Sidebar