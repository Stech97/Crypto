import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { store } from './store/configureStore'
import { RouteWithSubRoutes } from './Routes'
import { routes } from './config'
// Create an enhanced history that syncs navigation events with the store

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    { routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>

            	{/*<Switch>
            		<PrivateRoute
                        path="/dashboard"
                        component = { Dashboard }
                        Authed = { localStorage.getItem("token") }
                        Verified = {true}
                    />
                    <PrivateRoute
                        path="/investment"
                        component = { Investment }
                        Authed = { localStorage.getItem("token") }
                        Verified = { true }
                    />
	                <Route path="/main" component = { MainPage } />
	                <Route
                        path="/login"
                        render = { props => (
                            !localStorage.getItem("token")
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
                            localStorage.getItem("token")
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
                    <Route path="/restorePassword/:hash">
                        <RestorePassword />    
                    </Route>
                    <Route path="/forgot" component = { ForgotPassword } />
	                <Route path="/" component = { ComingSoon } />
 	            </Switch>*/}
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

