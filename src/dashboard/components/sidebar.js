import React, { Component } from 'react'

class Sidebar extends Component {

	render() {
		return (
			<div className={this.props.isClosed ? "sidebar-wrapper-closed" : "sidebar-wrapper"}>
				<div className={this.props.isClosed ? "sidebar-closed" : "sidebar"}>
				    <div className="sidebar-burger">
				   		<img onClick={() => {this.props.toggle(this.props.isClosed)}} src="img/sprite.svg#burger-icon-white" alt="burger-menu" />
				    </div>
				    <div className={this.props.isClosed ? "sidebar-dash sidebar-bar-closed sidebar-bar-closed-selected" : "sidebar-dash sidebar-bar sidebar-bar-selected"}>
				    	<div className="sidebar-bar-icon">
					    	<img src="img/sprite.svg#dashboards-icon-white" alt="icon-dashboards" />
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
				        	<img src="img/sprite.svg#investment-icon-white" alt="icon-investment" />
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
				        	<img src="img/sprite.svg#team-icon-white" alt="icon-team" />
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
				        	<img src="img/sprite.svg#marketing-icon-white" alt="icon-marketing" />
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
			        		<img src="img/sprite.svg#history-icon-white" alt="icon-history" />
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
				        	<img src="img/sprite.svg#support-icon-white" alt="icon-support" />
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