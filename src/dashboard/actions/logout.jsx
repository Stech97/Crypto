import { API } from "../../config";
import Cookies from "js-cookie";
export const GET_LOGOUT_REQUEST = "GET_LOGOUT_REQUEST";
export const GET_LOGOUT_SUCCESS = "GET_LOGOUT_SUCCESS";
export const GET_LOGOUT_ERROR = "GET_LOGOUT_ERROR";

const getLogoutSuccess = () => ({
	type: GET_LOGOUT_SUCCESS,
	payload: false,
});

const getLogoutRequest = () => ({
	type: GET_LOGOUT_REQUEST,
	payload: "Loading...",
});

const getLogoutError = (error) => ({
	type: GET_LOGOUT_ERROR,
	payload: error,
});

export const userLogoutGet = () => {
	return (dispatch) => {
		dispatch(getLogoutRequest());
		Cookies.remove("token");
		let ID = localStorage.getItem("id");
		localStorage.removeItem("id");
		localStorage.removeItem("isVerified");
		let response = API("/Identity/SignOut?Id=" + ID)
			.then((response) => {
				dispatch(getLogoutSuccess());
			})
			.catch((error) => dispatch(getLogoutError(error.message)));
	};
};
