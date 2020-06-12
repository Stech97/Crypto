import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { store } from './store/configureStore'
import ComingSoon from './comingsoon/Comingsoon'
import MainPage from './main/Main'
import LoginPage from './login/Login'
import SignupPage from './signup/Signup'
import Dashboard from './dashboard/Dashboard'
import Investment from './dashboard/Investment'
import waveimage from './styles/utils/img/waveimage.png'
import stealthlogo from './styles/utils/img/stealth-logo.png'
import worldmap2 from './styles/utils/img/worldmap2.png'
import joinusbackground from './styles/utils/img/joinus.png'
import ConfirmEmail from './signup/ConfirmEmail'
import Checkmail from './signup/Checkmail'
import { ForgotPassword } from './signup/ForgotPassword'
// Create an enhanced history that syncs navigation events with the store

const PrivateRoute = ({ component: Component, Authed, Verified, ...rest }) => {
    return(
        <Route
            {...rest}
            render = { props => (
                Authed
                    ? Verified
                        ? <Component {...props} />
                        : <Checkmail {...props} />
                    : <Redirect
                            to = {{
                                pathname: '/login',
                                state: { from: props.location }
                            }}
                        />
            )}
        />
    )
}

class App extends Component {
    render() {
        return (
            <Router>
            	<Switch>
            		<PrivateRoute
                        path="/dashboard"
                        component = { Dashboard }
                        Authed = { localStorage.getItem("Authed") }
                        Verified = {true}
                    />
                    <PrivateRoute
                        path="/investment"
                        component = { Investment }
                        Authed = { localStorage.getItem("Authed") }
                        Verified = { true }
                    />
	                <Route path="/main" component = { MainPage } />
	                <Route
                        path="/login"
                        render = { props => (
                            !localStorage.getItem("Authed")
                                ? <LoginPage {...props} />
                                : <Redirect
                                        to = {{
                                            pathname: '/dashboard',
                                            state: { from: props.location }
                                        }}
                                    />
                        )}
                    />
                    <Route
                        path="/signup"
                        render = { props => (
                            localStorage.getItem("Authed")
                                ? true
                                    ? <Redirect
                                        to = {{
                                            pathname: '/dashboard',
                                            state: { from: props.location }
                                        }}
                                    />
                                    : <Checkmail {...props} />
                                : <SignupPage {...props} />
                        )}
                    />
                    <Route path="/confirmEmail/:hash" >
                        <ConfirmEmail />
                    </Route> 
                    <Route path="/forgot" component = { ForgotPassword } />
	                <Route path="/" component = { ComingSoon } />
 	            </Switch>
            </Router>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.user,
    }
}

export default connect(
    mapStateToProps,
)(App)

