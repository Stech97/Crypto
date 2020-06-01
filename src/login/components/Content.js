import React, { Component } from 'react'
import '../../styles/login.scss'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'

const LoginHeader = () => {
	return(
		<div className="login-header">
	    	<h1>Login to defima</h1>
	    </div>
	)
}

const LoginForgot = () => {
	return(
		<div className="login-forgot">
		    <p>
	        	Forgot your password? <a href="#">Restore it</a>
	    	</p>
	    </div>
	)
}

const LoginFooter = () => {
	return(
		<div className="login-footer">
			<a href="#">Terms of use</a>
	    	<a href="#">Privacy policy</a>
	    </div>
	)
}

class Content extends Component {
	render() {
		return(
			<section className="login">
			  <div className="login-wrapper wrapper">
			    <LoginHeader />
			    <LoginForm />
			    <LoginForgot />
			    <LoginFooter />	    
			  </div>
			</section>
		)
	}
}

export default Content