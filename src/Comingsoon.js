import React, { Component } from 'react'
import './styles/comingsoon.scss'
import { connect } from 'react-redux'
import ComingSoonForm from './components/ComingsoonForm'

const ComingSoonLogo = () => {
	return (
		<div className="comingsoon-logobox">
	        <img src="img/defimaLogo.png" alt="defimaLogo" />
	    </div>
	)
}

const ComingSoonH1 = () => {
	return (
		<div className="comingsoon-h1-box">
	        <h1>We Will Launch Soon.</h1>
	    </div>
	)
}

class ComingSoon extends Component {

	render () {
		const { ComingSoon } = this.props
		console.log(ComingSoon.visibility)
		return (
			<section className="comingsoon">
				<div className="comingsoon-wrapper">
				    <div className="comingsoon-grid-container">
					    <ComingSoonLogo />
					    <ComingSoonH1 />
					    <div className={ ComingSoon.visibility ? "comingsoon-h2-box" : "none"}>
					        <h2>Subscribe to get notification as soon as we launch.</h2>
					    </div>
					    <ComingSoonForm updateViewSuccess={ComingSoon.updateViewSuccess} sendError={ComingSoon.visibility} placeholder={ComingSoon.placeholder}/>
			            <div className={ !ComingSoon.visibility ? "comingsoon-thanks-box" : "none" }>
			                <p>Thank you for your subscription.</p>
			            </div>
				    </div>
			  	</div>
			</section>
		)
	}	
}


const mapStateToProps = store => {
	console.log(store)
  return {
    ComingSoon: store.ComingSoon
  }
}
/*
const mapDispatchToProps = dispatch => {
  return {
  	updateViewError: dispatch(updateViewError()),
    updateViewSuccess: dispatch(updateViewSuccess()),
  }
}
*/
export default connect(
	mapStateToProps
)(ComingSoon)
