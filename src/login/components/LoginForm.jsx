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
			/*fetch('https://api.ipify.org?format=json', { mode: 'cors' })
			.then((resp) => resp.json())
			.then((req) => fetch('https://ipinfo.io/' + req.ip + '/?token=7a04a322ea8440'))
			.then((res) => res.json())
			.then((res) => {
				alert("You are from " + res.country + ". Your IP " + res.ip);
				let resp = fetch( API_URL + "Identity/token", {
				method: 'post',
					headers: {
		            	'Content-Type': 'application/json',
		        	},
					body: JSON.stringify({ 
						username : values.username,
						password: values.password,
						IP: res.ip,
						Country: res.country,
					}),
				});
				return resp;
			}).then((resp) => {
				if (resp.ok) {
					console.log(resp.id)
					alert("You succesfully logged in!");
				} else {
					console.log(resp)
					alert("Wrong username or password!")
				}
			})*/
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