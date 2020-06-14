import React, { Component, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../config'
import Header from './components/Header'
import '../styles/login.scss'
import { confirmEmail } from './actions/confirmEmail'
import { connect } from 'react-redux'
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
	return (
		<Fragment>
			<Header />
			<section className="login">
				<div className="login-wrapper wrapper">
					<button
						className="login-forgot-button"
						onClick={hash => props.confirmEmailAction(props.hash)}
					>Confirm Email</button>
				</div>
			</section>		
		</Fragment>
	)
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