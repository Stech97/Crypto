import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const orange = "#ed7102";

export default withStyles({
	root: {
		color: orange,
		backgroundColor: "#fff",
		border: "3px solid " + orange,
		borderRadius: "30px",
		paddingLeft: "1rem",
		paddingRight: "1rem",
		"&:hover": {
			color: "#fff",
			backgroundColor: orange,
		},
		"&[disabled]": {
			borderColor: "#838383",
		},
	},
})(Button);
