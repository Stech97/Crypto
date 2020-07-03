import React from "react";
import { routes } from "./config";
import RouteWithSubRoutes from "./Routes";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./App.css";
import InDevelopment from "./InDevelopment";
import PagesContent from "./pages/account/Pages";

function App() {
	return (
		<Router>
			<Helmet>
				<title>Defima</title>
				<meta charSet="utf-8" />
				<meta name="description" content="Defima" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
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
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
				/>
			</Helmet>
			<Switch>
				{routes.map((route, i) => (
					<RouteWithSubRoutes key={i} {...route} />
				))}
			</Switch>
		</Router>
	);
}

export default App;
