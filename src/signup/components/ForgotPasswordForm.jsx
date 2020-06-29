import React, { Component, Fragment } from "react";
import { getFormValues, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { forgotPassword } from "../actions/forgotpassword";
import {
	aol,
	required,
	minLength3,
	maxLength25,
	email,
	validateUsername,
} from "./SignupForm";

const textField = ({
	input,
	placeholder,
	className,
	type,
	meta: { touched, error, warning },
}) => {
	return (
		<div className={className}>
			<input {...input} type={type} placeholder={placeholder} />
			{touched &&
				((error && (
					<p className="error">
						<i class="fas fa-exclamation-circle"></i>
						{" " + error}
					</p>
				)) ||
					(warning && (
						<p className="error">
							<i class="fas fa-exclamation-circle"></i>
							{" " + warning}
						</p>
					)))}
		</div>
	);
};

class ForgotPasswordForm extends Component {
	render() {
		const {
			handleSubmit,
			reset,
			pristine,
			submitting,
			forgot,
			error,
		} = this.props;

		const submit = (values) => {
			this.props.forgotPasswordAction({
				username: values.username,
				email: values.email,
			});
		};

		if (this.props.forgot.error.type === "done") {
			return (
				<h2 className="login-wrapper-header">
					Request has been sent succesfully
				</h2>
			);
		} else {
			return (
				<form className="login-form" onSubmit={handleSubmit(submit)}>
					<Field
						component={textField}
						name="username"
						className="login-form-user"
						type="text"
						placeholder="Username"
						validate={[
							required,
							maxLength25,
							minLength3,
							validateUsername,
						]}
					/>
					<Field
						component={textField}
						name="email"
						className="login-form-password"
						type="email"
						placeholder="Email"
						validate={[required, email]}
						warn={aol}
					/>
					<div className="login-form-button">
						<button type="submit" disabled={pristine || submitting}>
							{submitting || forgot.isFetching
								? "Loading..."
								: "Restore"}
						</button>
						{forgot.error.type && (
							<p className="error">
								<i class="fas fa-exclamation-circle"></i>
								{" " + forgot.error.message}
							</p>
						)}
						{error && (
							<p className="error">
								<i class="fas fa-exclamation-circle"></i>
								{" " + error}
							</p>
						)}
					</div>
				</form>
			);
		}
	}
}

const mapStateToProps = (store) => {
	return {
		forgot: store.forgot,
	};
};

const mapDispatchToProps = (dispatch) => ({
	forgotPasswordAction: (data) => dispatch(forgotPassword(data)),
});

ForgotPasswordForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(ForgotPasswordForm);

export default reduxForm({
	form: "ForgotPassword", // a unique identifier for this form
})(ForgotPasswordForm);
