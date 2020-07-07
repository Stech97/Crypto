import React, { Component } from "react";
import ContentBalanceContainer from "../../containers/ContentBalanceContainer";
import ContentEarnings from "./ContentEarnings";
import ContentLinks from "./ContentLinks";
import ContentNews from "./ContentNews";
import ContentLoginHistory from "./ContentLoginHistory";

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
		<div className="content">
			<ContentBalanceContainer />
			<ContentEarnings />
			<ContentLinks />
			<ContentNewslog />
		</div>
	);
}
