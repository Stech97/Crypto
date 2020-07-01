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

const PrivateRoute = ({ component: Component, routes: routes, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated() ? (
                    <Component {...props} routes={routes} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export function RouteWithSubRoutes(route) {
    if (route.Private) {
        return (
            <PrivateRoute
                path={route.path}
                component={route.component}
                routes={route.routes}
            />
        );
    }
}
