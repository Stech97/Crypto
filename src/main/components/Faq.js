import React, { Component } from 'react'

const FaqHeader = () => {
	return (
		<div className="faq-header">
	      <h1>Frequently Asked Questions (FAQs)</h1>
	    </div>
	)
}

const FaqText = () => {
	return (
	    <div className="faq-text">
		    <p>Here you’ll find answers to the most common questions our customers ask.
			   If you can’t find your answer here, please email us at{" "}
			   <b>contact@defima.io</b> or hit us up on <b>telegram @defimasupport</b>
		    </p>
	    </div>	
	)
}

class FaqTopic = () => {
	render () {
		return (
			<div className="faq-topic">
		      <FaqTopic1 />


		      <div className="faq-topic-1">
		        <div className="faq-topic-question">
		          <p>Who is behind DEFIMA and is DEFIMA trustworthy?</p>
		        </div>
		        <div className="faq-topic-arrow" />
		        <div className="faq-topic-answer">
		          <p />
		        </div>
		      </div>
		      <div className="faq-topic-2">
		        <div className="faq-topic-question">
		          <p>How does DEFIMA protect customer’s assets?</p>
		        </div>
		        <div className="faq-topic-arrow" />
		        <div className="faq-topic-answer">
		          <p>Lorem 5</p>
		        </div>
		      </div>
		      <div className="faq-topic-3-opened">
		        <div className="faq-topic-question-opened">
		          <p>Who can participate?</p>
		        </div>
		        <div className="faq-topic-arrow-opened" />
		        <div className="faq-topic-answer-opened">
		          <p>
		            Anyone can participate, as long as you have an internet connection
		            (to use our website) and access to a bitcoin wallet (to deposit and
		            Withdraw your money). Also, please note we don’t accept people from
		            the USA and Canada.
		          </p>
		        </div>
		      </div>
		      <div className="faq-topic-button">
		        <a href="#">View All</a>
		      </div>
		    </div>
		)
	}
}

class Faq extends Component {
	render () {
		return (
			<section className="faq">
  				<div className="wrapper faq-wrapper">
  					<FaqHeader />
  					<FaqText />
  					<FaqTopic /> 
  				</div>
  			</section>
		)
	}
}
<section className="faq">
  <div className="wrapper faq-wrapper">
    <div className="faq-header">
      <h1>Frequently Asked Questions (FAQs)</h1>
    </div>
    <div className="faq-text">
      <p>
        Here you’ll find answers to the most common questions our customers ask.
        If you can’t find your answer here, please email us at{" "}
        <b>contact@defima.io</b> or hit us up on <b>telegram @defimasupport</b>
      </p>
    </div>
    <div className="faq-topic">
      <div className="faq-topic-1">
        <div className="faq-topic-question">
          <p>Who is behind DEFIMA and is DEFIMA trustworthy?</p>
        </div>
        <div className="faq-topic-arrow" />
        <div className="faq-topic-answer">
          <p />
        </div>
      </div>
      <div className="faq-topic-2">
        <div className="faq-topic-question">
          <p>How does DEFIMA protect customer’s assets?</p>
        </div>
        <div className="faq-topic-arrow" />
        <div className="faq-topic-answer">
          <p />
        </div>
      </div>
      <div className="faq-topic-3-opened">
        <div className="faq-topic-question-opened">
          <p>Who can participate?</p>
        </div>
        <div className="faq-topic-arrow-opened" />
        <div className="faq-topic-answer-opened">
          <p>
            Anyone can participate, as long as you have an internet connection
            (to use our website) and access to a bitcoin wallet (to deposit and
            Withdraw your money). Also, please note we don’t accept people from
            the USA and Canada.
          </p>
        </div>
      </div>
      <div className="faq-topic-button">
        <a href="#">View All</a>
      </div>
    </div>
  </div>
</section>
