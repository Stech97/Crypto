import React, { Component } from 'react'

class Sidebar extends Component {

	render() {
		return (
			<div className={this.props.isClosed ? "sidebar-wrapper-closed" : "sidebar-wrapper"}>
				<div className={this.props.isClosed ? "sidebar-closed" : "sidebar"}>
				    <div className="sidebar-burger">
				   		<img onClick={() => {this.props.toggle(this.props.isClosed)}} src="img/burger-menu.png" alt="burger-menu" />
				    </div>
				    <div className={this.props.isClosed ? "sidebar-dash sidebar-bar-closed sidebar-bar-closed-selected" : "sidebar-dash sidebar-bar sidebar-bar-selected"}>
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
				    <div className={"sidebar-investment " + (this.props.isClosed ? "sidebar-bar-closed" : "sidebar-bar") }>
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
				    <div className={"sidebar-team " + (this.props.isClosed ? "sidebar-bar-closed" : "sidebar-bar") }>
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
				    <div className={"sidebar-marketing " + (this.props.isClosed ? "sidebar-bar-closed" : "sidebar-bar") }>
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
			    	<div className={"sidebar-history " + (this.props.isClosed ? "sidebar-bar-closed" : "sidebar-bar") }>
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
				    <div className={"sidebar-support " + (this.props.isClosed ? "sidebar-bar-closed" : "sidebar-bar") }>
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
			</div>
		)
	}
}

export default Sidebar