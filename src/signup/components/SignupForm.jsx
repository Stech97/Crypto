import React, { Component } from 'react'
import { getFormValues, reduxForm, Field } from 'redux-form';
import { API } from '../../config'
import { Link } from 'react-router-dom'
import emailjs from 'emailjs-com'

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
		    { error.type==className && <p className="signup-box-error">{error.message}</p>}
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
                <span className="checkmark2"></span>
		        <span>{text}{ link && <a href="#">{linktext}</a>}</span> 
	        </label>
	    </div>
	)
}


class SignupForm extends Component {

	state = {
		errors: [
			{
				type: "username",
				message: "",
			},
			{
				type: "password",
				message: "",
			},
			{
				type: "password2",
				message: "",
			},
			{
				type: "email",
				message: "",
			},
			{
				type: "server",
				message: "",
			},
		]
	}

	validateEmail = (check) => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	  	return re.test(String(check).toLowerCase())
	}

	validateLogin = (login) => {
		const re = /^[a-zA-z]{1}[a-zA-Z1-9]{3,20}$/
		return re.test(String(login))
	}



	validatePassword = (password) => {
		/* Описываем, что должно быть в пароле, с меткой НЕ (^). 
		По уму, эту строку надо вынести из функции в глобальную область, чтобы регулярное выражение создавалось только
		 один раз, будет шустрее.
		*/
		  var r=/[^A-Z-a-z-0-9]/g; 
		  var error = ""
		  if(r.test(password)){
		      error = " Only latin symbols and numbers allowed!";
		      return (error);
		  }
		  if (password.length<6){
		      error = " At least 6 symbols!";
		      return (error);
		  }
		  if (password.length>20){
		      error = " Max 20 symbols!";
		      return (error);
		  }
		  return(true);
	}

	render() {
		const { handleSubmit, reset, pristine, submitting } = this.props

		const submit = async(values) => {

			if (this.validateLogin(values.username)) {
				if (this.validateEmail(values.email)) {
					let response = await API('/Identity/CheckInfo', 'post', {
						Username: values.username,
						Email: values.email
					})
					if (response.username) {
						this.setState(state => {
							let errors = state.errors.map(error => {
								if (error.type === "username") {
									error.message = 'Username is taken. Try another.'
								}
							})
							return { errors, }
						})
						alert(this.state.errors.filter(error => error.type === "username").message)
					} else if (response.email) {
						alert('Email is taken. Try another.')						
					} else {
						if (!this.validatePassword(values.password)) {
							alert(this.validatePassword(values.password))
						} else if (!(values.password == values.password2)) {
							alert('Passwords must match!')
						} else {
							let resp = await API('/Identity/CreateLogin', 'post', {
								username: values.username,
								password: values.password,
								Email: values.email,
								FirstName: values.firstname,
								LastName: values.lastname,
							})
							if (resp.ok) {
								alert('done')
								let confirmLink = 'https://defima.io/confirmEmail/'+resp.hash
								emailjs.send(
									'gmail',
									'confirmEmail',
									{
										to_name: values.firstname + " " + values.lastname,
										message_html: confirmLink,
										send_to: values.email
									},
									'user_jIExVfMX1Oha7HaXMmsBs'
								).then((res) => {
									if (res.ok) {
										alert('Email successfully sent!')
									} else {
										alert('Mail error: ', res)
									}
								})
							} else {
								alert('server error: ', resp)
							}
						}
					}
				} else {
					alert('email is wrong')
				}
			} else {
				alert('username is wrong')
			}
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
				    	error = {{
				    		type: "fuuu",
				    		message: "tvoya mama"
				    	}}
				    />
				    <Field
				        component = { textField }
				    	name = "lastname"
				    	placeholder = "Last Name"
				    	className = "lastname"
				    	type = "text"
				    	error = {{
				    		type: "fuuu",
				    		message: "tvoya mama"
				    	}}
				    />
				    <Field
				        component = { textField }
				    	name = "email"
				    	placeholder = "E-Mail"
				    	className = "email"
				    	type = "text"
				    	error = {{
				    		type: "email",
				    		message: "tvoya mama"
				    	}}
				    />
				    <Field
				        component = { textField }
				    	name = "username"
				    	placeholder = "Username"
				    	className = "username"
				    	type = "text"
				    	error = {{
				    		type: "fuuu",
				    		message: "tvoya mama"
				    	}}
				    />
				    <Field
				        component = { textField }
				    	name = "password"
				    	placeholder = "Password"
				    	className = "password"
				    	type = "password"
				    	error = {{
				    		type: "fuuu",
				    		message: "tvoya mama"
				    	}}
				    />
				    <Field
				        component = { textField }
				    	name = "password2"
				    	placeholder = "Repeat Password"
				    	className = "repeatpassword"
				    	type = "password"
				    	error = {{
				    		type: "fuuu",
				    		message: "tvoya mama"
				    	}}
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

export default reduxForm({
  form: 'SignupForm' // a unique identifier for this form
})(SignupForm)