import React, { Component } from 'react'
import './styles/comingsoon.scss'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form';
import { updateView } from './actions/ComingsoonForm'
import ComingSoonForm from './components/ComingsoonForm'
import ComingSoonStore from './reducers/comingsoon'
import { COMINGSOON_ERROR, COMINGSOON_SUCCESS } from './actions/ComingsoonForm'

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

	handleSubmit = (values) => {
		window.alert('action worked')
		return (dispatch) => {
			fetch("http://10.0.0.50/api/Email/AddEmail", {
				method: 'post',
				body: JSON.stringify("test_" + values.email)
			}).then(function(response) {
				if (response.ok) {
					dispatch({
						type: COMINGSOON_SUCCESS,
						payload: true,
					})
	            } else {
	                alert('Ошибка отправки')
	                dispatch({
	                	type: COMINGSOON_ERROR,
	                	payload: false
	            	})
	            }
	        }).catch((ex) => {
	    		alert('Ъуъ')
	            dispatch({
	            	type: COMINGSOON_ERROR,
	            	payload: false
	            })
	        })
	    }
	}
	render () {
		return (
			<section className="comingsoon">
				<div className="comingsoon-wrapper">
				    <div className="comingsoon-grid-container">
					    <ComingSoonLogo />
					    <ComingSoonH1 />
					    <div className={ !this.props.error ? "comingsoon-h2-box" : "none"}>
					        <h2>Subscribe to get notification as soon as we launch.</h2>
					    </div>
					    <ComingSoonForm onSubmit={this.handleSubmit}/>
				    </div>
			  	</div>
			</section>
		)
	}	
}

/*
const mapStateToProps = store => {
  return {
    sendError: store.sendError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateView: sendError => dispatch(updateView(sendError))
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ComingSoon)
*/
export default ComingSoon