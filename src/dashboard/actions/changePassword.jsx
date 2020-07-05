import { API } from "../../config";

export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR";

const changePasswordRequest = () => ({
	type: CHANGE_PASSWORD_REQUEST,
	payload: true,
});

const changePasswordError = (error) => ({
	type: CHANGE_PASSWORD_ERROR,
	payload: error,
});

const changePasswordSuccess = (news) => ({
	type: CHANGE_PASSWORD_SUCCESS,
	payload: news,
});

const changePasswordFetch = async (values) => {
	let response = await API(
		"/Identity/ChangePassword?Id=" + localStorage.getItem("id"),
		"patch",
		values
	);
	return response;
};

export const changePassword = (values) => {
	return (dispatch) => {
		dispatch(changePasswordRequest(values));
		changePasswordFetch(values)
			.then((res) => {
				if (res.ok) {
					dispatch(changePasswordSuccess(res.data));
				} else {
					dispatch(
						changePasswordError({
							type: "validation",
							message: res.error.message,
						})
					);
				}
			})
			.catch((error) => {
				dispatch(
					changePasswordError({
						type: "code",
						message: error.message,
					})
				);
			});
	};
};
