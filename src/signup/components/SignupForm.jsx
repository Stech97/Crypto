import React, { Component } from 'react'
import { getFormValues, reduxForm, Field } from 'redux-form';
import { API } from '../../config'
import { Link } from 'react-router-dom'
import { createUserPostFetch } from '../actions/signup'
import { connect } from 'react-redux'

const SignupHeader = () => {
	return(
		<div className="signup-box-header">
	    	<h1>Create an Account</h1>
	    </div>
	)
}

const textField = ({ input, placeholder, className, type, error }) => {
	return (
		<div className={"signup-box-" + className}>
		    <input
		    	{...input}
		        className={"signup-form signup-form-" + className}
		        type={type}
		        required
		        placeholder={placeholder}
		    />
		    { error && error.type==className && <p className="signup-box-error">{error.message}</p>}
	    </div>
	)
}

const checkField = ({ input, className, type, id, link, linktext, text }) => {
	return (
	    <div className={"signup-box-" + className}>
	        <label className={"signup-form-" + className} htmlFor={id}>
		        <input
		        {...input}
			        type={type}
			        id={id}
			        required
		        />
                <span className={"checkmark-" + className}></span>
		        <span>{text}{ link && <a href="#">{linktext}</a>}</span> 
	        </label>
	    </div>
	)
}


class SignupForm extends Component {

	render() {
		const { handleSubmit, reset, pristine, submitting, createUser } = this.props

		const submit = values => {
			this.props.createUserPostFetch(values)
		}

		return(
			<section className="signup-wrapper">
			    <form
			    	className="signup-box"
			    	onSubmit={handleSubmit(submit)}
			    >
			   		<SignupHeader />  
				    <Field
				        component = { textField }
				    	name = "firstname"
				    	placeholder = "First Name"
				    	className = "firstname"
				    	type = "text"
				    	error = { createUser.error }
				    />
				    <Field
				        component = { textField }
				    	name = "lastname"
				    	placeholder = "Last Name"
				    	className = "lastname"
				    	type = "text"
				    	error = { createUser.error }
				    />
				    <Field
				        component = { textField }
				    	name = "email"
				    	placeholder = "E-Mail"
				    	className = "email"
				    	type = "text"
				    	error = { createUser.error }
				    />
				    <Field
				        component = { textField }
				    	name = "username"
				    	placeholder = "Username"
				    	className = "username"
				    	type = "text"
				    	error = { createUser.error }
				    />
				    <Field
				        component = { textField }
				    	name = "password"
				    	placeholder = "Password"
				    	className = "password"
				    	type = "password"
				    	error = { createUser.error }
				    />
				    <Field
				        component = { textField }
				    	name = "password2"
				    	placeholder = "Repeat Password"
				    	className = "repeatpassword"
				    	type = "password"
				    	error = { createUser.error }
				    />
				    <Field
				    	component = { checkField }
				    	name = "termsagree"
				    	className = "termsagree"
				    	id = "termsAgree"
				    	type = "checkbox"
				    	text = "I agree with "
				    	link = {true}
				    	linktext = "Terms and conditions"
				    />
				    <Field
				    	component = { checkField }
				    	name = "countrycheck"
				    	className = "countrycheck"
				    	id = "countryCheck"
				    	type = "checkbox"
				    	text = "I am NOT an USA or CANADA Citizen"
				    	link = {false}
				    	linktext = "linktext"
				    />
				    <div className="signup-box-bottomcontainer">
				        <div className="signup-box-bottomcontainer-button">
					        <button
					        	className="signup-form-button"
					        	type="submit"
					        >
					        	Create an account
					        </button>
				        </div>
						<div className="signup-box-bottomcontainer-signin">
							<p>
								Already have an account? <Link to={'/Login'}>Sign in</Link>
							</p>
						</div>
						<div className="signup-box-bottomcontainer-footer">
							<a href="#">Terms of use</a>&nbsp;<a href="#">Privacy policy</a>
						</div>
				    </div>
			    </form>
		    </section>
		)
	}
}

const mapStateToProps = store => {
	return {
		createUser: store.createUser
	}
}

const mapDispatchToProps = dispatch => ({
  createUserPostFetch: userInfo => dispatch(createUserPostFetch(userInfo))
})

SignupForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(SignupForm)

export default reduxForm({
  form: 'SignupForm' // a unique identifier for this form
})(SignupForm)