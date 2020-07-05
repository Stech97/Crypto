import React from "react";
import { useParams, Redirect } from "react-router-dom";
import SignupPage from "./Signup";

export default function ReferalComponent() {
	var { parent } = useParams();
	return <SignupPage parent={parent} />;
}
