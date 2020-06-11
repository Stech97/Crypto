import React, { Component } from 'react'
import { getFormValues, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux'


const renderField = ({ input, placeholder, className, type }) => {
	return (
 		<input {...input} className={className} placeholder={placeholder} type={type} />
	)
}

class ForgotPasswordForm extends Component {
	render() {
		const { handleSubmit, reset, pristine, submitting } = this.props

		const submit = (values) => {
			alert('Functionality is in development')
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
		    		name="email"
			        className="login-form-password"
			        type="email"
			        placeholder="Email"
		      	/>
			    <button
			    	className="login-form-button"
			    	type="submit"
			    	disabled={ pristine || submitting }
			    >Restore</button>
			    { this.props.error && <p>this.props.error</p> }
		    </form>
		)
	}
}

const mapStateToProps = store => {
	return {
		user: store.user
	}
}


ForgotPasswordForm = connect(
	mapStateToProps,
)(ForgotPasswordForm)

export default reduxForm({
  form: 'ForgotPassword' // a unique identifier for this form
})(ForgotPasswordForm)