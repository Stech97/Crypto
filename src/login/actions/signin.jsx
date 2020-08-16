import { API } from "../../config";
import axios from "axios";
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";

const loginUserSuccess = () => ({
	type: USER_LOGIN_SUCCESS,
});

const loginUserError = (error) => ({
	type: USER_LOGIN_ERROR,
	payload: error,
});

const loginUserRequest = () => ({
	type: USER_LOGIN_REQUEST,
});

const loginUserFetch = (username, password) =>
	API("/Administrator/tokenAdmin", "post", {
		username: username,
		password: password,
	});

export const userPostFetch = (user) => {
	return (dispatch) => {
		dispatch(loginUserRequest());
		loginUserFetch(user.username, user.password)
			.then((res) => {
				if (res.ok) {
					localStorage.setItem("id", res.data.id);
					dispatch(loginUserSuccess());
				} else if ((res.error.status = 401)) {
					dispatch(
						loginUserError({
							type: res.error.status,
							message: "Wrong username or password",
						})
					);
				} else if (res.error.status == 403) {
					dispatch(
						loginUserError({
							type: res.error.status,
							message: "Access Denied.",
						})
					);
				} else {
					dispatch(
						loginUserError({
							type: res.error.status,
							message: "Unknown error",
						})
					);
				}
			})
			.catch((error) => {
				dispatch(
					loginUserError({
						type: error.status,
						message: "Unknown error",
					})
				);
			});
	};
};
