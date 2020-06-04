import React, { Component } from 'react'

class SidebarTime extends Component {
    

    constructor(props) {
        super(props);
/*
        let time = ""
        fetch("http://84.201.132.112:80/api/Dashboard/GetTime")
			.then((res) => {
				console.log('first result: ', JSON.stringify(res));
				return res.json()
			})
			.then((res) => {
				if (res.ok) {
	                console.log('second result: ', res.time)
	                time = res.time
	            } else {
	                console.log(res.e)
	            }
	        })
*/
        this.state = { time: "04:20:25" };
    }

	render() {


		return (
			<div className="sidebar-time">
		    	<p>Server Time: {this.state.time}</p>
		    </div>
		)
	}
}

class Sidebar extends Component {

	render() {
		return (
			<div className={this.props.isClosed ? "sidebar-wrapper-closed" : "sidebar-wrapper"}>
				<div className={this.props.isClosed ? "sidebar-closed" : "sidebar"}>
				    <svg onClick={() => {this.props.toggle(this.props.isClosed)}} className="sidebar-burger" preserveAspectRatio="xMinYMid slice" viewBox="0 0 46 26">
				   		<use href="#burger-icon-white" />
				    </svg>
				    <div className={this.props.isClosed ? "sidebar-dash sidebar-bar-closed sidebar-bar-closed-selected" : "sidebar-dash sidebar-bar sidebar-bar-selected"}>
				    	<svg className="sidebar-bar-icon" preserveAspectRatio="xMinYMid slice" viewBox="0 0 37 37">
					    	<use href="#dashboards-icon-white" />
				      	</svg>
				      	<div className="sidebar-bar-text">
				    	 	<h3>Dashboards</h3>
				      	</div>
				      	<svg className="sidebar-bar-arrow" preserveAspectRatio="xMinYMid slice" viewBox="0 -10 350 75">
				        	<use href="#arrow-right" />
				      	</svg>
				    </div>
				    <div className={"sidebar-investment " + (this.props.isClosed ? "sidebar-bar-closed" : "sidebar-bar") }>
				     	<svg className="sidebar-bar-icon" preserveAspectRatio="xMinYMid slice" viewBox="0 0 37 37">
					    	<use href="#investment-icon-white" />
				      	</svg>
				      	<div className="sidebar-bar-text">
				        	<h3>Investment</h3>
				      	</div>
				      	<svg className="sidebar-bar-arrow" preserveAspectRatio="xMinYMid slice" viewBox="0 -10 350 75">
				      		<use href="#arrow-right" />
				      	</svg>
				    </div>
				    <div className={"sidebar-team " + (this.props.isClosed ? "sidebar-bar-closed" : "sidebar-bar") }>
				      	<svg className="sidebar-bar-icon" preserveAspectRatio="xMinYMid slice" viewBox="0 0 37 37">
					    	<use href="#team-icon-white" />
				      	</svg>
				      	<div className="sidebar-bar-text">
				        	<h3>Team</h3>
				      	</div>
				      	<svg className="sidebar-bar-arrow" preserveAspectRatio="xMinYMid slice" viewBox="0 -10 350 75">
				        	<use href="#arrow-right" />
				      	</svg>
				    </div>
				    <div className={"sidebar-marketing " + (this.props.isClosed ? "sidebar-bar-closed" : "sidebar-bar") }>
				    	<svg className="sidebar-bar-icon" preserveAspectRatio="xMinYMid slice" viewBox="0 0 37 37">
					    	<use href="#marketing-icon-white" />
				      	</svg>
				      	<div className="sidebar-bar-text">
				        	<h3>Marketing</h3>
				      	</div>
				      	<svg className="sidebar-bar-arrow" preserveAspectRatio="xMinYMid slice" viewBox="0 -10 350 75">
				        	<use href="#arrow-right" />
				      	</svg>
			    	</div>
			    	<div className={"sidebar-history " + (this.props.isClosed ? "sidebar-bar-closed" : "sidebar-bar") }>
			      		<svg className="sidebar-bar-icon" preserveAspectRatio="xMinYMid slice" viewBox="0 0 37 37">
					    	<use href="#history-icon-white" />
				      	</svg>
				    	<div className="sidebar-bar-text">
				   		    <h3>History</h3>
				      	</div>
				      	<svg className="sidebar-bar-arrow" preserveAspectRatio="xMinYMid slice" viewBox="0 -10 350 75">
				        	<use href="#arrow-right" />
				      	</svg>
				    </div>
				    <div className={"sidebar-support " + (this.props.isClosed ? "sidebar-bar-closed" : "sidebar-bar") }>
				        <svg className="sidebar-bar-icon" preserveAspectRatio="xMinYMid slice" viewBox="0 0 37 37">
					    	<use href="#support-icon-white" />
				        </svg>
				      	<div className="sidebar-bar-text">
				        	<h3>Support</h3>
				      	</div>
				      	<svg className="sidebar-bar-arrow" preserveAspectRatio="xMinYMid slice" viewBox="0 -10 350 75">
				        	<use href="#arrow-right" />
				      	</svg>
				    </div>
				    <SidebarTime />
				</div>
			</div>
		)
	}
}

export default Sidebar