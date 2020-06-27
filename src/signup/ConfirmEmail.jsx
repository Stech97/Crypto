import React, { Component, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../config'
import Header from './components/Header'
import '../styles/login.scss'
import { confirmEmail } from './actions/confirmEmail'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
/*
function ConfirmEmailHook(confirmEmail) {
	
	return(
			
	)
}
*/

function ConfirmEmail (props) {
	const { hash } = useParams()
	props = {
		...props,
		hash,
	}
	if (props.user.error.type === 'done') {
		return (
			<Redirect to="/login" />
		)		
	} else {
		return (
			<Fragment>
				<Header />
				<section className="login">
					<div className="login-wrapper wrapper">
						<button
							className="login-forgot-button"
							onClick={hash => props.confirmEmailAction(props.hash)}
						>{ props.user.isFetching ? "Loading..." : props.user.error.type ? <p className="error">{props.user.error.message}</p> :"Confirm Email"}</button>
					</div>
				</section>		
			</Fragment>
		)
	}
}							

const mapStateToProps = store => {
	return {
		user: store.user
	}
}

const mapDispatchToProps = dispatch => ({
  confirmEmailAction: hash => dispatch(confirmEmail(hash))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ConfirmEmail)