import React, { Component, Fragment } from "react";
//import "../styles/login.scss";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import Header from "./components/Header";
import SignupForm from "./components/SignupForm";

export default function SignupPage(props) {
	if (props.parent) {
		var parent = props.parent;
	} else {
		var parent = "";
	}
	return (
		<Fragment>
			<Header />
			<SignupForm parent={parent} />
		</Fragment>
	);
}
