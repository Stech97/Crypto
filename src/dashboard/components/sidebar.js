import React, { Component } from 'react'
import cn from 'classnames'

class SidebarTime extends Component {
    
    getTime() {
        fetch("http://84.201.132.112/api/Dashboard/GetTime")
		.then((res) => {
			if (res.ok) {
				console.log(res);
                return res.json();
            } else {
                console.log(res.e);
            }
        }).then(res => this.setState({ time: res.time })
        ).catch(err => this.setState({ time: err }))
    }

    constructor(props) {
        super(props);

        this.state = { time: "" };
    }

    componentDidMount() {
		this.interval = setInterval(() => this.getTime(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
		this.timer = null
	}

	render() {

		return (
			<div className={cn('sidebar-time')}>
		    	<p>Server Time: {this.state.time}</p>
		    </div>
		)
	}
}

class SidebarBar extends Component {

	render() {
		const { isClosed, name, isSelected } = this.props

		return (
		    <div className={cn('sidebar-' + name.toLowerCase() , 'sidebar-bar' + isClosed, 'sidebar-bar' + isClosed + (isSelected ? "-selected" : ""))}>
		    	<svg className={cn("sidebar-bar-icon")} preserveAspectRatio="xMinYMid slice" viewBox="0 0 37 37">
			    	<use href={ "#" + name.toLowerCase() + "-icon-white" } />
		      	</svg>
		      	<div className={cn("sidebar-bar-text")}>
		    	 	<h3>{ name }</h3>
		      	</div>
		      	<svg className={cn("sidebar-bar-arrow")} preserveAspectRatio="xMinYMid slice" viewBox="0 -10 350 75">
		        	<use href="#arrow-right" />
		      	</svg>
		    </div>
		)
	}
}

class Sidebar extends Component {

	state = {
		SelectedId: 1,
	}

	render() {

		const statClosed = (status) => {
			return (status ? "-closed" : "")
		} 

		const statSelection = (id) => {
			return (id === this.state.SelectedId)
		}

		const NavTabs = {
			tabs: [
				{
					id: 1,
					name: "Dashboards",
				},
				{
					id: 2,
					name: "Investment",
				},
				{
					id: 3,
					name: "Team",
				},
				{
					id: 4,
					name: "Marketing",
				},
				{
					id: 5,
					name: "History",
				},
				{
					id: 6,
					name: "Support",
				}
			],
		}

		const { isClosed, toggle } = this.props

		return (
			<div className={cn( "sidebar-wrapper" + statClosed(isClosed) )}>
				<div className={cn( "sidebar" + statClosed(isClosed) )}>
				    <svg onClick={() => {toggle(isClosed)}} className="sidebar-burger" preserveAspectRatio="xMinYMid slice" viewBox="0 0 46 26">
				   		<use href="#burger-icon-white" />
				    </svg>
				    { NavTabs.tabs.map(tab => (
				    	<SidebarBar
				    		key = { tab.id }
				    		name = { tab.name }
				    		isClosed = { statClosed(isClosed) }
				    		isSelected = { statSelection(tab.id) }
				    	/>
				    ))}
				    <SidebarTime />
				</div>
			</div>
		)
	}
}

export default Sidebar