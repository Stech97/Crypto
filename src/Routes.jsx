import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { API } from "./config";
import MainPage from "./main/Main";
import Cookies from "js-cookie";
import Checkmail from "./signup/Checkmail";

const getUserInfo = async () => {
    let response = await API(
        "/Identity/GetUser?Id=" + localStorage.getItem("id")
    );
    return response;
};

async function isAuthenticated() {
    let res = await getUserInfo();
    if (res.ok) {
        return true;
    } else {
        return false;
    }
}

const PrivateRoute = ({ component: Component, routes: routes, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthenticated()) {
                    return <Component {...props} routes={routes} />;
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
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthenticated()) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/account/dashboard",
                                state: { from: props.location },
                            }}
                        />
                    );
                } else {
                    return <Component {...props} routes={routes} />;
                }
            }}
        />
    );
};

const PublicRoute = ({ component: Component, routes: routes, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => <Component {...props} routes={routes} />}
        />
    );
};

export default function RouteWithSubRoutes(route) {
    if (route.Private) {
        return (
            <PrivateRoute
                path={route.path}
                component={route.component}
                routes={route.routes}
            />
        );
    } else if (route.public) {
        return (
            <PublicRoute
                path={route.path}
                component={route.component}
                routes={route.routes}
            />
        );
    } else {
        return (
            <InprivateRoute
                path={route.path}
                component={route.component}
                routes={route.routes}
            />
        );
    }
}
