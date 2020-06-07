import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';
import { updateView, updateViewError } from '../../../comingsoon/actions/ComingsoonForm'

const renderField = ({ input, placeholder, className, type }) => {
	return (
 		<input {...input} className={className} placeholder={placeholder} type={type} />
	)
}

class FooterFrom extends Component {

	render() {		
		const { handleSubmit, submitting, reset, visibility, placeholder} = this.props

		const validateEmail = (check) => {
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  	return re.test(String(check).toLowerCase())
		}

        const submit = (values) => {

			console.log(values.email, validateEmail(values.email))
			if (validateEmail(values.email)) {
				this.props.dispatch(updateView(), values.email)	
			} else {
				this.props.dispatch(updateViewError())
			}
			this.props.reset()
		}

		return (
		    <form
		    	className={ visibility ? "footer-newsletter-form-box" : "none" }
		    	onSubmit={handleSubmit(submit)}
		    >
		        <Field
		          component={renderField}
		          name="email"
		          className="footer-newsletter-input-email"
		          type="text"
		          placeholder={placeholder}
		        />
		        <button
		        	type="submit"
		        	disabled={submitting}
		        	className="footer-newsletter-input-button"
		    	>Notify Me</button>
	      	</form>
		)
	}
}

export default reduxForm({
  form: 'FooterFrom' // a unique identifier for this form
})(FooterFrom)