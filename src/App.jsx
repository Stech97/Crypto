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

