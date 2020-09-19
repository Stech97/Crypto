import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { store } from "./store/configureStore";
import RouteWithSubRoutes from "./Routes";
import { routes, API } from "./config";
import { Helmet } from "react-helmet";
import "./styles/common/main/global.scss";
import ErrorPage from "./signup/ErrorPage";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
// Create an enhanced history that syncs navigation events with the store

const getIpFetch = () =>
    axios.get("https://api.ipify.org?format=json", { mode: "cors" });

const getCountryFetch = (ip) =>
    axios.get("https://ipinfo.io/" + ip + "/?token=7a04a322ea8440");

const getUserInfoFetch = async () => {
    let response = await API(
        "/Identity/GetUser?Id=" + localStorage.getItem("id")
    );
    return response;
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { status: false, loading: true };
    }

    RelogCheck = async () => {
        let id = localStorage.getItem("id");
        if (id) {
            getUserInfoFetch()
                .then((res) => {
                    if (res.status !== 200) {
                        localStorage.removeItem("id");
                    }
                })
                .catch((error) => localStorage.removeItem("id"));
        }
    };

    CountryAllowed = async () => {
        getIpFetch()
            .then((req) => {
                getCountryFetch(req.data.ip)
                    .then((res) => {
                        if (
                            res.data.coumtry !== "US" &&
                            res.data.coumtry !== "CA"
                        ) {
                            this.setState({
                                ...this.state,
                                status: true,
                                loading: false,
                            });
                        } else {
                            this.setState({
                                ...this.state,
                                status: false,
                                loading: false,
                            });
                        }
                    })
                    .catch((error) => {
                        this.setState({
                            ...this.state,
                            status: true,
                            loading: false,
                        });
                    });
            })
            .catch((error) => {
                this.setState({ ...this.state, status: true, loading: false });
            });
    };

    componentDidMount = async () => {
        this.CountryAllowed();
        this.RelogCheck();
        this.forceUpdate();
    };

    render() {
        if (this.state.loading) {
            return (
                <Backdrop>
                    <CircularProgress color="red" />
                </Backdrop>
            );
        } else {
            if (this.state.status) {
                return (
                    <Router>
                        <Helmet>
                            <title>Defima</title>
                            <meta charSet="utf-8" />
                            <meta name="description" content="Defima" />
                            <link
                                rel="apple-touch-icon"
                                sizes="180x180"
                                href="/apple-touch-icon.png"
                            />
                            <link
                                rel="icon"
                                type="image/png"
                                sizes="32x32"
                                href="/favicon-32x32.png"
                            />
                            <link
                                rel="icon"
                                type="image/png"
                                sizes="16x16"
                                href="/favicon-16x16.png"
                            />
                            <link rel="manifest" href="/site.webmanifest" />
                            <link
                                rel="mask-icon"
                                href="/safari-pinned-tab.svg"
                                color="#5bbad5"
                            />
                            <meta
                                name="msapplication-TileColor"
                                content="#da532c"
                            />
                            <meta name="theme-color" content="#ffffff" />
                            <link
                                href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
                                rel="stylesheet"
                            />
                            <link
                                rel="stylesheet"
                                href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
                                integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
                                crossorigin="anonymous"
                            />
                        </Helmet>
                        <Switch>
                            {routes.map((route, i) => (
                                <RouteWithSubRoutes key={i} {...route} />
                            ))}
                        </Switch>
                    </Router>
                );
            } else {
                return <ErrorPage />;
            }
        }
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user,
    };
};

export default connect(mapStateToProps)(App);
