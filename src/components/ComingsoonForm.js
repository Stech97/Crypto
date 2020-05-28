import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';
import { COMINGSOON_ERROR, COMINGSOON_SUCCESS } from '../actions/ComingsoonForm'

const renderField = ({ input, placeholder, className, type }) => {
	return (
 		<input {...input} className={className} placeholder={placeholder} type={type} />
	)
}

class ComingSoonForm extends Component {

	render() {		
		const { handleSubmit, submitting, sendError, placeholder} = this.props
        const submit = (values) => {
        	window.alert(JSON.stringify({
				method: 'post',
				headers: {
                	'Content-Type': 'application/json',
            	},
				body: JSON.stringify({ Email : 'test' + values.email })
			}))
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
		}
       
		return (
		    <form
		    	className={ !sendError ? "comingsoon-form-box" : "none" }
		    	onSubmit={handleSubmit(submit)}
		    >
		        <Field
		          component={renderField}
		          name="email"
		          className="commingsoon-input-text"
		          type="email"
		          placeholder={!sendError ? "maxmustter@hotmail.com" : "Wrong E-Mail. Please try again."}
		        />
		        <button
		        	onClick={handleSubmit(submit)}
		        	type="submit"
		        	disabled={submitting}
		        	className="comingsoon-input-button"
		    	>Notify Me</button>
	      	</form>
		)
	}
}

export default reduxForm({
  form: 'ComingSoonForm' // a unique identifier for this form
})(ComingSoonForm)