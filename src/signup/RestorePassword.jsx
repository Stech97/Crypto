import React, { Component, Fragment } from 'react'
import Header from './components/Header'
import RestorePasswordForm from './components/RestorePasswordForm'
import { useParams } from 'react-router-dom'

export function RestorePassword (props) {
	const { hash } = useParams()
	props = {
		...props,
		hash,
	}
	return(
		<Fragment>
			<Header />
			<section className="login">
				<div className="login-wrapper wrapper">
					<div className="login-header">
				    	<h1>Create new password</h1>
				    </div>
					<RestorePasswordForm hash = { props.hash }/>
				</div>
			</section>
		</Fragment>
	)
}
