import React, { Component } from 'react'
import { getFormValues, reduxForm, Field } from 'redux-form';

const renderField = ({ input, placeholder, className, type }) => {
	return (
 		<input {...input} className={className} placeholder={placeholder} type={type} />
	)
}

class LoginForm extends Component {
	render() {
		const { handleSubmit, reset, pristine, submitting } = this.props

		const submit = (values) => {
			fetch('https://api.ipify.org?format=json', { mode: 'cors' })
			.then((resp) => resp.json())
			.then((req) => fetch('http://ip-api.com/json/' + req.ip + '?fields=24593'))
			.then((res) => res.json())
			.then(function(res) {
				alert("You are from " + res.country + ". Your IP " + res.query);
				let resp = fetch("http://84.201.132.112/api/Identity/token", {
				method: 'post',
					headers: {
		            	'Content-Type': 'application/json',
		        	},
					body: JSON.stringify({ 
						username : 'admin',
						password: 'admin',
						IP: res.query,
						Country: res.country,
					}),
				});
				return resp;
			}).then((resp) => {
				if (resp.ok) {
					alert("You succesfully logged in!");
				} else {
					alert("Wrong username or password!")
				}
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
		    </form>
		)
	}
}

export default reduxForm({
  form: 'LoginForm' // a unique identifier for this form
})(LoginForm)