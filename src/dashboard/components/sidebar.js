import React, { Component } from 'react'
class Sidebar extends Component {

	render() {
		return (
			<div className={this.props.isClosed ? "sidebar-wrapper-closed" : "sidebar-wrapper"}>
				<div className={this.props.isClosed ? "sidebar-closed" : "sidebar"}>
				    <svg onClick={() => {this.props.toggle(this.props.isClosed)}} className="sidebar-burger">
				   		<use href="#burger-icon-white" />
				    </svg>
				    <div className={this.props.isClosed ? "sidebar-dash sidebar-bar-closed sidebar-bar-closed-selected" : "sidebar-dash sidebar-bar sidebar-bar-selected"}>
				    	<svg className="sidebar-bar-icon">
					    	<use href="#dashboards-icon-white" />
				      	</svg>
				      	<div className="sidebar-bar-text">
				    	 	<h3>Dashboards</h3>
				      	</div>
				      	<svg className="sidebar-bar-arrow">
				        	<use href="#arrow-right" />
				      	</svg>
				    </div>
				    <div className={"sidebar-investment " + (this.props.isClosed ? "sidebar-bar-closed" : "sidebar-bar") }>
				     	<svg className="sidebar-bar-icon">
					    	<use href="#investment-icon-white" />
				      	</svg>
				      	<div className="sidebar-bar-text">
				        	<h3>Investment</h3>
				      	</div>
				      	<svg className="sidebar-bar-arrow">
				        	<use href="#arrow-right" />
				      	</svg>
				    </div>
				    <div className={"sidebar-team " + (this.props.isClosed ? "sidebar-bar-closed" : "sidebar-bar") }>
				      	<svg className="sidebar-bar-icon">
					    	<use href="#team-icon-white" />
				      	</svg>
				      	<div className="sidebar-bar-text">
				        	<h3>Team</h3>
				      	</div>
				      	<svg className="sidebar-bar-arrow">
				        	<use href="#arrow-right" />
				      	</svg>
				    </div>
				    <div className={"sidebar-marketing " + (this.props.isClosed ? "sidebar-bar-closed" : "sidebar-bar") }>
				    	<svg className="sidebar-bar-icon">
					    	<use href="#marketing-icon-white" />
				      	</svg>
				      	<div className="sidebar-bar-text">
				        	<h3>Marketing</h3>
				      	</div>
				      	<svg className="sidebar-bar-arrow">
				        	<use href="#arrow-right" />
				      	</svg>
			    	</div>
			    	<div className={"sidebar-history " + (this.props.isClosed ? "sidebar-bar-closed" : "sidebar-bar") }>
			      		<svg className="sidebar-bar-icon">
					    	<use href="#history-icon-white" />
				      	</svg>
				    	<div className="sidebar-bar-text">
				   		    <h3>History</h3>
				      	</div>
				      	<svg className="sidebar-bar-arrow">
				        	<use href="#arrow-right" />
				      	</svg>
				    </div>
				    <div className={"sidebar-support " + (this.props.isClosed ? "sidebar-bar-closed" : "sidebar-bar") }>
				        <svg className="sidebar-bar-icon">
					    	<use href="#support-icon-white" />
				        </svg>
				      	<div className="sidebar-bar-text">
				        	<h3>Support</h3>
				      	</div>
				      	<svg className="sidebar-bar-arrow">
				        	<use href="#arrow-right" />
				      	</svg>
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