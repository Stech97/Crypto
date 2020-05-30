import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';
import { updateView, updateViewError } from '../actions/ComingsoonForm'

const renderField = ({ input, placeholder, className, type }) => {
	return (
 		<input {...input} className={className} placeholder={placeholder} type={type} />
	)
}

class ComingSoonForm extends Component {

	render() {		
		const { handleSubmit, submitting, reset, sendError, placeholder} = this.props

		const validateEmail = (check) => {
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  	return re.test(String(check).toLowerCase())
		}

        const submit = (values) => {
        	/*
        	window.alert(JSON.stringify({
				method: 'post',
				headers: {
                	'Content-Type': 'application/json',
            	},
				body: JSON.stringify({ Email : 'test' + values.email })
			}))
			
			let variables = {message_html: values.email};
			fetch("http://10.0.0.50/api/Email/AddEmail", {
				method: 'post',
				headers: {
                	'Content-Type': 'application/json',
            	},
				body: JSON.stringify({ Email : 'test' + values.email })
			}).then(function(response) {
				if (response.ok) {
	                alert('Успех!')			
	            } else {
	                alert(response.e)
	            }
	        }).catch((ex) => {
	    		alert('Ъуъ')
	        })

			emailjs.send(
			  	'gmail', templateId,
			  	variables, 'user_jIExVfMX1Oha7HaXMmsBs'
		  	).then(res => {
		    	console.log('Email successfully sent!')
				this.props.dispatch(updateViewSuccess())
		  	})
		  	// Handle errors here however you like, or use a React error boundary
		  	.catch(err => {
		  		console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
				this.props.dispatch(updateViewError())
			})
			*/
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
		    	className={ sendError ? "comingsoon-form-box" : "none" }
		    	onSubmit={handleSubmit(submit)}
		    >
		        <Field
		          component={renderField}
		          name="email"
		          className="commingsoon-input-text"
		          type="text"
		          placeholder={placeholder}
		        />
		        <button
		        	type="submit"
		        	disabled={submitting}
		        	className="comingsoon-input-button"
		    	>Notify Me</button>
	      	</form>
		)
	}
}

export default reduxForm({
  form: 'TESTFORM' // a unique identifier for this form
})(ComingSoonForm)