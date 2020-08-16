import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import { API } from "./config";

const getUserInfo = async () => {
    let response = await API(
        "/Identity/GetUser?Id=" + localStorage.getItem("id")
    );
    return response;
};

function isAuthenticated() {
    return localStorage.getItem("id") && true;
}

const PrivateRoute = ({ component: Component, routes: routes, ...rest }) => {
    console.log("isAuthenticated()", isAuthenticated());
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthenticated()) {
                    return <Component {...rest} {...props} routes={routes} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

const InprivateRoute = ({ component: Component, routes: routes, ...rest }) => {
    console.log("isAuthenticated()", isAuthenticated());
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthenticated()) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/pages/account/dashboard",
                                state: { from: props.location },
                            }}
                        />
                    );
                } else {
                    return <Component {...rest} {...props} routes={routes} />;
                }
            }}
        />
    );
};

export default function RouteWithSubRoutes({
    Private,
    path,
    component,
    routes,
    ...rest
}) {
    if (Private) {
        return (
            <PrivateRoute
                path={path}
                component={component}
                routes={routes}
                {...rest}
            />
        );
    } else {
        return (
            <InprivateRoute
                path={path}
                component={component}
                routes={routes}
                {...rest}
            />
        );
    }
}
