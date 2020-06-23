import React, { Component } from 'react'
import cn from 'classnames'
import { API } from '../../config'
import { NavLink } from 'react-router-dom'

class SidebarTime extends Component {
    
    async getTime() {
       	const response = await API('/Dashboard/GetTime');
       	this.setState({ time: response.data.time });
 
/*       
		.then((res) => {
			if (res.ok) {
                this.setState({ time: res.time });
            } else {
                console.log(res.e);
            }
        }).catch(err => this.setState({ time: err }))
*/
    }

    constructor(props) {
        super(props);

        this.state = { time: "Loading..." };
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
		const { isClosed, name, isSelected, path } = this.props

		return (
		    <NavLink activeClassName={"sidebar-bar-selected sidebar-bar" + isClosed + "-selected"} to={"/account/" + path } className={cn('sidebar-' + name.toLowerCase(), cn('sidebar-bar' + isClosed))}>
		    	<svg className={cn("sidebar-bar-icon")} preserveAspectRatio="xMinYMid slice" viewBox="0 0 37 37">
			    	<use href={ "#" + name.toLowerCase() + "-icon-white" } />
		      	</svg>
				<div className={cn("sidebar-bar-text")}>
		    	 	<h3>{ name }</h3>
		      	</div>
		      	<svg className={cn("sidebar-bar-arrow")} preserveAspectRatio="xMinYMid slice" viewBox="0 -10 350 75">
		        	<use href="#arrow-right" />
		      	</svg>
			</NavLink>
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
					path: "dashboard",
				},
				{
					id: 2,
					name: "Investment",
					path: "investment"
				},
				{
					id: 3,
					name: "Team",
					path: "team"
				},
				{
					id: 4,
					name: "Marketing",
					path: "marketing"
				},
				{
					id: 5,
					name: "History",
					path: "history"
				},
				{
					id: 6,
					name: "Support",
					path: "faq"
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
				    		path = { tab.path }
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