import React, { Component } from "react";
import ContentBalanceContainer from "./ContentBalanceContainer";
import ContentEarnings from "../components/dashcontent/ContentEarnings";
import ContentLinks from "../components/dashcontent/ContentLinks";
import ContentNews from "../components/dashcontent/ContentNews";
import ContentLoginHistory from "../components/dashcontent/ContentLoginHistory";

class ContentNewslog extends Component {
	render() {
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
}

class ContentContainer extends Component {
	render() {
		return (
			<div className="content">
				<ContentBalanceContainer />
				<ContentEarnings />
				<ContentLinks />
				<ContentNewslog />
			</div>
		);
	}
}

export default ContentContainer;
