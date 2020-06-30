import { API } from "../../config";
import emailjs from "emailjs-com";

export const FOOTER_FORM_REQUEST = "FOOTER_FORM_REQUEST";
export const FOOTER_FORM_ERROR = "FOOTER_FORM_ERROR";
export const FOOTER_FORM_SUCCESS = "FOOTER_FORM_SUCCESS";

const footerFormRequest = () => ({
	type: FOOTER_FORM_REQUEST,
});

const footerFormError = (payload) => ({
	type: FOOTER_FORM_ERROR,
	payload,
});

const footerFormSuccess = () => ({
	type: FOOTER_FORM_SUCCESS,
});

const footerFormFetch = async (data) => API("/Email/AddEmail", "post", data);

export const footerForm = (email) => {
	return (dispatch) => {
		dispatch(footerFormRequest());
		let variables = { message_html: email, send_to: email };
		footerFormFetch({
			Email: email,
		}).then((res) => {
			if (res.ok) {
				emailjs
					.send(
						"gmail",
						"confirmEmail",
						variables,
						"user_jIExVfMX1Oha7HaXMmsBs"
					)
					.then((res) => {
						dispatch(footerFormSuccess());
					})
					// Handle errors here however you like, or use a React error boundary
					.catch((error) => {
						dispatch(
							footerFormError({
								type: error.status,
								message: error.message,
							})
						);
					});
			} else {
				dispatch(footerFormError(res.error));
			}
		});
	};
};
