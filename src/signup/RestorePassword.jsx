import React, { Component, Fragment } from 'react'
import Header from './components/Header'
import RestorePasswordForm from './components/RestorePasswordForm'

export const RestorePassword = () => {
	return(
		<Fragment>
			<Header />
			<section className="login">
				<div className="login-wrapper wrapper">
					<div className="login-header">
				    	<h1>Create new password</h1>
				    </div>
					<RestorePasswordForm />
				</div>
			</section>
		</Fragment>
	)
}
