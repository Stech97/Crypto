import React, { Component } from "react";

const FaqHeader = () => {
	return (
		<div className="faq-header">
			<h1>Frequently Asked Questions (FAQs)</h1>
		</div>
	);
};

const FaqText = () => {
	return (
		<div className="faq-text">
			<p>
				Here you’ll find answers to the most common questions our
				customers ask. If you can’t find your answer here, please email
				us at <b>contact@defima.io</b> or hit us up on{" "}
				<b>telegram @defimasupport</b>
			</p>
		</div>
	);
};
/*
class FaqTopic extends Component {
	render() {
		const { id, isOpened, toggleTopic, question, text } = this.props
		return (

		)
	}
}
*/
class FaqTopics extends Component {
	state = {
		topic: [
			{
				id: 1,
				opened: false,
				question: "Who is behind DEFIMA and is DEFIMA trustworthy?",
				text: "Lorem ipsum tvou mamu",
			},
			{
				id: 2,
				opened: false,
				question: "How does DEFIMA protect customer’s assets?",
				text: "Lorem ipsum tvou mamu",
			},
			{
				id: 3,
				opened: true,
				question: "Who can participate?",
				text:
					"Anyone can participate, as long as you have an internet connection (to use our website) and access to a bitcoin wallet (to deposit and Withdraw your money). Also, please note we don’t accept people from the USA and Canada.",
			},
		],
		openedAll: false,
	};

	toggleTopic = (id) => {
		this.setState((state) => {
			let item = state.topic.find((t) => t.id === id);
			console.log(item);
			item.opened = !item.opened;
			let openedAll = state.topic.every((t) => t.opened === true);
			return { item, openedAll };
		});
	};

	toggleAll = () => {
		this.setState((state) => {
			let openedAll = state.openedAll;
			console.log(openedAll);
			let newtopic = state.topic.filter((t) => t.opened === openedAll);
			newtopic = newtopic.forEach((t) => (t.opened = !openedAll));
			openedAll = !openedAll;
			return { newtopic, openedAll };
		});
	};

	render() {
		return (
			<div className="faq-topic">
				{this.state.topic &&
					this.state.topic.map((item) => (
						<div
							key={item.id}
							className={
								"faq-topic-" +
								item.id +
								(item.opened ? "-opened" : "")
							}
						>
							<div className="faq-topic-question-opened">
								<p>{item.question}</p>
							</div>
							<div
								onClick={() => this.toggleTopic(item.id)}
								className={
									"faq-topic-arrow" +
									(item.opened ? "-opened" : "")
								}
							/>
							<div
								className={
									"faq-topic-answer" +
									(item.opened ? "-opened" : "")
								}
							>
								<p>{item.text}</p>
							</div>
						</div>
					))}
				<div className="faq-topic-button">
					<button onClick={() => this.toggleAll()}>
						{!this.state.openedAll ? "View All" : "Close All"}
					</button>
				</div>
			</div>
		);
	}
}

class Faq extends Component {
	render() {
		return (
			<section className="faq">
				<div className="wrapper faq-wrapper">
					<FaqHeader />
					<FaqText />
					<FaqTopics />
				</div>
			</section>
		);
	}
}

export default Faq;
