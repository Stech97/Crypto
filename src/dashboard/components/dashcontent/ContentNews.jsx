import React, { Component, Fragment } from 'react'

class ContentNews extends Component {
	render() {
		return (
			<Fragment>
				<div className="content-newslog-newslogheadings content-text-blue-newslogheadings">
					News
				</div>
				<div className="content-newslog-historyheadings content-text-blue-newslogheadings">
					Login History
				</div>
				<div className="content-newslog-news content-whitebox-news">
					<div className="content-newslog-news-news1 content-newslog-news-style">
						<div className="content-newslog-news-news1-heading content-text-blue content-newslog-news-heading-style">
							<h3>Heading</h3>
						</div>
						<div className="content-newslog-news-news1-text content-text-grey content-newslog-news-text-style">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</div>
						<div className="content-newslog-news-news1-button content-newslog-news-button-style">
							<div className="content-newslog-news-button-text">View More</div>
						</div>
					</div>
					<div className="content-newslog-news-line">
						<div className="content-newslog-news-line-border"></div>
					</div>
					<div className="content-newslog-news-news2 content-newslog-news-style">
						<div className="content-newslog-news-news2-heading content-text-blue content-newslog-news-heading-style">
							<h3>Heading</h3>
						</div>
						<div className="content-newslog-news-news2-text content-text-grey content-newslog-news-text-style">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</div>
						<div className="content-newslog-news-news2-button content-newslog-news-button-style">
							<div className="content-newslog-news-button-text">View More</div>
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default ContentNews