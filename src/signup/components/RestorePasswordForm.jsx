import React, { Component } from 'react'
import { restorePassword } from '../actions/restorepassword'
import { getFormValues, reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'


const renderField = ({ input, placeholder, className, type }) => {
	return (
 		<input {...input} className={className} placeholder={placeholder} type={type} />
	)
}

class RestorePasswordForm extends Component {
	render() {
		const { handleSubmit, reset, pristine, submitting, hash} = this.props

		const submit = (values) => {

			this.props.restorePasswordAction({
				hash: hash,
				password: values.password,
				password2: values.password2,
			})
		}

		return(
		    <form
		    	className="login-form"
		    	onSubmit={handleSubmit(submit)}
		    >
		    	<Field
					component={renderField}		    	
		    		name="password"
		    		className="login-form-user"
		    		type="password"
		    		placeholder="New Password"
		    	/>
		    	<Field
		    		component={renderField}
		    		name="password2"
			        className="login-form-password"
			        type="password"
			        placeholder="Repeat New Password"
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
		forgot: store.forgot
	}
}

const mapDispatchToProps = dispatch => ({
	restorePasswordAction: data => dispatch(restorePassword(data))
})

RestorePasswordForm = connect(
	mapStateToProps,
	mapDispatchToProps,
)(RestorePasswordForm)

export default reduxForm({
  form: 'RestorePassword' // a unique identifier for this form
})(RestorePasswordForm)