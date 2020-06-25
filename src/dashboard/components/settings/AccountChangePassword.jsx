import React, { Component, Fragment } from 'react'
import { getFormValues, reduxForm, Field } from 'redux-form'

class AccountChange extends Component {
	render() {
		
		const passField = ({input, id, type, placeholder}) => {
			return (
				<input
					{...input}
					type= {type}
					placeholder = {placeholder}
					className = "settings-change-form-input"
				/>
			)
		}
		
		return(
			<div className="settings-change settings-whitebox">
				<h3 className="settings-change-header">
					Change Password
				</h3>
				<form action="" className="settings-change-form">
					<Field
						component = {passField}
						name = 'password'
						type = 'password'
						placeholder = 'New Password'
					/>
					<Field
						component = {passField}
						name = 'password2'
						type = 'password'
						placeholder = 'Repeat New Password'
					/>
					<button type="submit" className="settings-change-form-button">Change Password</button>
				</form>
			</div>
		)
	}
}

export default reduxForm({
	form: 'AccountChange'
})(AccountChange)