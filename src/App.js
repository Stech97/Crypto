import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { store } from './store/configureStore'
import ComingSoon from './comingsoon/Comingsoon'
import MainPage from './main/Main'
import LoginPage from './login/Login'
import Dashboard from './dashboard/Dashboard'
import waveimage from './styles/utils/img/waveimage.png'
import stealthlogo from './styles/utils/img/stealth-logo.png'
import worldmap2 from './styles/utils/img/worldmap2.png'
import joinusbackground from './styles/utils/img/joinus.png'
// Create an enhanced history that syncs navigation events with the store

class App extends Component {
    render() {
        return (
            <Router>
            	<Switch>
            		<Route path="/comingsoon" component = { ComingSoon } />
	                <Route path="/main" component = { MainPage } />
	                <Route path="/login" component = { LoginPage } />
	                <Route path="/" component = { Dashboard } />
 	            </Switch>
            </Router>
        )
    }
}

export default App

