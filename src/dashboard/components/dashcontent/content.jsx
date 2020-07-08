import React from "react";
import Balance from "./Balance";
import ContentEarnings from "./ContentEarnings";
import ContentLinks from "./ContentLinks";
import ContentNews from "./ContentNews";
import ContentLoginHistory from "./ContentLoginHistory";
import { createMuiTheme } from "@material-ui/core/styles";

const darkBlue = "#123273";
const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
const grayText = "#838383";
const grayBack = "#efefef";
const orange = "#ed7102";
const lightBlue = "#16428d";
const whitebox = "#efefef";
const contentBack = "#f5fbff";

function ContentNewslog() {
	return (
		<div className="content-newslog">
			<div className="content-newslog-newslogheadings content-text-blue-newslogheadings">
				News
			</div>
			<div className="content-newslog-historyheadings content-text-blue-newslogheadings">
				Login History
			</div>
			<ContentNews />
			<ContentLoginHistory />
		</div>
	);
}

export default function DashContent() {
	return (
		<>
			<Balance />
		</>
	);
}
/*<ContentEarnings />
			<ContentLinks />
			<ContentNewslog />*/
