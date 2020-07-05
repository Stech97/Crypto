import React, { Component, Fragment } from "react";
import { SubmissionError, reduxForm, Field } from "redux-form";
import {
	required,
	maxLength25,
	minLength6,
	validatePassword,
} from "../../../signup/components/SignupForm";
import { connect } from "react-redux";
import { changePassword } from "../../actions/changePassword";

class AccountChange extends Component {
	render() {
		const submit = (values) => {
			if (values.password !== values.password2) {
				throw new SubmissionError({
					password2: "Passwords must match",
				});
			}
			this.props.changePasswordAction({
				username: this.props.user.username,
				password: values.password,
				confirmPassword: values.password2,
			});
			reset();
		};

		const passField = ({
			input,
			id,
			type,
			placeholder,
			meta: { touched, error, warning },
		}) => {
			return (
				<div className="settings-change-form-input">
					<input
						autoComplete="off"
						{...input}
						type={type}
						placeholder={placeholder}
					/>
					{touched &&
						((error && <p className="error">{" " + error}</p>) ||
							(warning && (
								<p className="error">{" " + warning}</p>
							)))}
				</div>
			);
		};

		const {
			handleSubmit,
			reset,
			pristine,
			submitting,
			hash,
			changePassword,
			error,
			invalid,
			hasErrors,
		} = this.props;

		return (
			<div className="settings-change settings-whitebox">
				<h3 className="settings-change-header">Change Password</h3>
				<form
					onSubmit={handleSubmit(submit)}
					className="settings-change-form"
				>
					<Field
						component={passField}
						name="password"
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
						component={passField}
						name="password2"
						type="password"
						placeholder="Repeat New Password"
						validate={[
							required,
							maxLength25,
							minLength6,
							validatePassword,
						]}
					/>
					<button
						type="submit"
						className="settings-change-form-button"
						disabled={
							invalid || hasErrors || pristine || submitting
						}
					>
						{submitting || changePassword.isFetching
							? "Wait..."
							: pristine && changePassword.error.type === "done"
							? "Success"
							: "Change Password"}
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (store) => {
	return {
		changePassword: store.changePassword,
		user: store.user.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changePasswordAction: (values) => dispatch(changePassword(values)),
	};
};

AccountChange = connect(mapStateToProps, mapDispatchToProps)(AccountChange);

export default reduxForm({
	form: "AccountChange",
})(AccountChange);
