import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getNews } from '../../actions/getNews'

class ContentNewsTab extends Component {
	
	state = {
		isOpened: false,
	}
	
	toggleState = () => {
		this.setState({
			...this.state,
			isOpened: !this.state.isOpened,
		})
	}

	render() {
		const { tab } = this.props
		return (
			<div className="content-newslog-news-tab content-newslog-news-style">
				<h4 className="content-newslog-news-tab-heading content-text-blue">
					{tab.heading}
				</h4>
				<h5 className="content-newslog-news-tab-text content-text-grey">
					{this.state.isOpened ? tab.fulltext : tab.description }
				</h5>
				<h5
					className="content-newslog-news-tab-button"
					onClick={this.toggleState}
				>
					{!this.state.isOpened ? "View More" : "Hide" }
				</h5>
			</div>
		)
	}
}

class ContentNews extends Component {
	render() {

		const news = this.props.contentNews.news
		console.log(news == [])
		/*
		const news = [
			{
				heading: "Title 1",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				fulltext: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa corrupti similique maiores libero minus ipsum fuga repudiandae. Voluptates in suscipit autem voluptatem, reprehenderit, quia corporis, quasi magni ullam ipsum unde."
			},
			{
				heading: "Title 2",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				fulltext: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa corrupti similique maiores libero minus ipsum fuga repudiandae. Voluptates in suscipit autem voluptatem, reprehenderit, quia corporis, quasi magni ullam ipsum unde."
			},
		]
		*/
		return (
				<div className="content-newslog-news content-whitebox-news">
					{(news.length == 0) ? 
						<div className="content-newslog-news-tab content-newslog-news-style">
							<h4 className="content-newslog-news-tab-heading content-text-blue">
								No News
							</h4>
						</div>
					:
						news.map((tab, id) => (
							<ContentNewsTab
								key = {id}
								tab = { tab }
							/>
						))						
					}
				</div>
		)
	}
}

const mapStateToProps = store => {
	return {
		contentNews: store.News,
	}
}

const mapDispatchToProps = dispatch => {
  return {
    getNewsAction: () => dispatch(getNews()),
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentNews)