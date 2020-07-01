import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { restorePassword } from "../actions/restorepassword";
import { SubmissionError, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {
	required,
	maxLength25,
	minLength6,
	validatePassword,
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

class RestorePasswordForm extends Component {
	render() {
		const {
			handleSubmit,
			reset,
			pristine,
			submitting,
			hash,
			forgot,
			error,
			invalid,
			hasErrors,
		} = this.props;

		const submit = (values) => {
			if (values.password !== values.password2) {
				throw new SubmissionError({
					password2: "Passwords must match",
				});
			}

			this.props.restorePasswordAction({
				hash: hash,
				password: values.password,
				password2: values.password2,
			});
		};

		if (forgot.error.type === "done") {
			return <Redirect to="/account/dashboard" />;
		} else {
			return (
				<form className="login-form" onSubmit={handleSubmit(submit)}>
					<Field
						component={textField}
						name="password"
						className="login-form-user"
						type="password"
						placeholder="New Password"
						validate={[
							required,
							maxLength25,
							minLength6,
							validatePassword,
						]}
					/>
					<Field
						component={textField}
						name="password2"
						className="login-form-password"
						type="password"
						placeholder="Repeat New Password"
						validate={[
							required,
							maxLength25,
							minLength6,
							validatePassword,
						]}
					/>
					<div className="login-form-button">
						<button
							type="submit"
							disabled={
								invalid || hasErrors || pristine || submitting
							}
						>
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
	restorePasswordAction: (data) => dispatch(restorePassword(data)),
});

RestorePasswordForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(RestorePasswordForm);

export default reduxForm({
	form: "RestorePassword", // a unique identifier for this form
})(RestorePasswordForm);
