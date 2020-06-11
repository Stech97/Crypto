import React, { Component, Fragment } from 'react'
import Header from './components/Header'
import ForgotPasswordForm from './components/ForgotPasswordForm'

export const ForgotPassword = () => {
	return(
		<Fragment>
			<Header />
			<section className="login">
				<div className="login-wrapper wrapper">
					<div className="login-header">
				    	<h1>Password restore</h1>
				    </div>
					<ForgotPasswordForm />
				</div>
			</section>
		</Fragment>
	)
}