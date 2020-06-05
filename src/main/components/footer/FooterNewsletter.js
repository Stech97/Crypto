import React, { Component } from 'react'
import FooterForm from './FooterForm'
import { connect } from 'react-redux'

class FooterNewsletter extends Component {

	render() {
		const { props } = this.props
		return (
			<div className="footer-newsletter">
		        <div className="footer-newsletter-header">
		        	<h2>Newsletter</h2>
		        </div>
		      	<FooterForm 
		      		placeholder = { props.placeholder }
		      		visibility = { props.visibility }
		      	/>
		      	<div className={!props.visibility ? "footer-newsletter-thanks" : "none"}>
		      		<h3>Thank you for your subscription!</h3>
		      	</div>
		    </div>
		)
	}
}

const mapStateToProps = store => {
	console.log(store)
  return {
    props: store.ComingSoon
  }
}
/*
const mapDispatchToProps = dispatch => {
  return {
  	updateView: email => dispatch(updateView(email)),
  }
}
*/
export default connect(
	mapStateToProps
)(FooterNewsletter)