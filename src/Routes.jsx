import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import { API } from "./config";

/*
const getUserInfo = async () => {
    let response = await API(
        "/Identity/GetUser?Id=" + localStorage.getItem("id")
    );
    return response;
};
*/
function isAuthenticated() {
    return /*localStorage.getItem("token") && */ true;
}

/*async function isVerified() {
    if (isAuthenticated()) {
        await getUserInfo()
            .then((res) => {
                if (res.ok || res.error.status === 404) {
                    return res.data.isVerified;
                } else {
                    return false;
                }
            })
            .catch((error) => {
                return false;
            });
    } else {
        return false;
    }
}*/

const PrivateRoute = ({
    component: Component,
    routes: routes,
    path,
    ...rest
}) => {
    return (
        <Route
            path={path}
            render={(props) => {
                return <Component {...rest} {...props} routes={routes} />;
            }}
        />
    );
};

const InPrivateRoute = ({
    component: Component,
    routes: routes,
    path,
    ...rest
}) => {
    return (
        <Route
            path={path}
            render={(props) => {
                return <Component {...rest} {...props} routes={routes} />;
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
            <InPrivateRoute
                path={path}
                component={component}
                routes={routes}
                {...rest}
            />
        );
    }
}
