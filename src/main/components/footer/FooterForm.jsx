import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

const renderField = ({
	input,
	placeholder,
	className,
	type,
	meta: { touched, error },
}) => {
	return (
		<input
			{...input}
			className={className}
			placeholder={placeholder}
			type={type}
		/>
	);
};

class FooterForm extends Component {
	render() {
		const {
			handleSubmit,
			submitting,
			reset,
			visibility,
			data,
		} = this.props;

		const email = (value) =>
			value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
				? "Invalid email address"
				: undefined;

		const required = (value) =>
			value || typeof value === "number" ? undefined : "Required";

		const submit = (values) => {
			this.props.sendAction(values.email);
			this.props.reset();
		};

		return (
			<form
				className={!visibility ? "footer-newsletter-form-box" : "none"}
				onSubmit={handleSubmit(submit)}
			>
				<Field
					component={renderField}
					name="email"
					className="footer-newsletter-input-email"
					type="text"
					placeholder={
						data.error.message
							? data.error.message
							: "maxmutter@hotmail.com"
					}
					validate={[email]}
				/>
				<button
					type="submit"
					disabled={submitting}
					className="footer-newsletter-input-button"
				>
					Notify Me
				</button>
			</form>
		);
	}
}

export default reduxForm({
	form: "FooterFrom", // a unique identifier for this form
})(FooterForm);
