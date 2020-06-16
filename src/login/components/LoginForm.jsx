import React, { Component } from 'react'
import { getFormValues, reduxForm, Field } from 'redux-form';
import { userPostFetch } from '../actions/signin'
import { connect } from 'react-redux'
import { Redirect, useHistory } from "react-router-dom";

const renderField = ({ input, placeholder, className, type }) => {
	return (
 		<input {...input} className={className} placeholder={placeholder} type={type} />
	)
}

class LoginForm extends Component {
	render() {
		const { handleSubmit, reset, pristine, submitting } = this.props

		const submit = (values) => {
			this.props.userPostFetch({
				username: values.username,
				password: values.password,
			})
		}

		return(
		    <form
		    	className="login-form"
		    	onSubmit={handleSubmit(submit)}
		    >
		    	<Field
					component={renderField}		    	
		    		name="username"
		    		className="login-form-user"
		    		type="text"
		    		placeholder="Username"
		    	/>
		    	<Field
		    		component={renderField}
		    		name="password"
			        className="login-form-password"
			        type="password"
			        placeholder="Password"
		      	/>
			    <button
			    	className="login-form-button"
			    	type="submit"
			    	disabled={ pristine || submitting }
			    >Login</button>
			    { this.props.user.error && <p className="error">{this.props.user.error.message}</p> }
		    </form>
		)
	}
}

const mapStateToProps = store => {
	return {
		user: store.user
	}
}

const mapDispatchToProps = dispatch => ({
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

LoginForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm)

export default reduxForm({
  form: 'LoginForm' // a unique identifier for this form
})(LoginForm)