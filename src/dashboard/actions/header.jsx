import { API } from "../../config";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_ERROR = "GET_USER_ERROR";

const getUserInfoFetch = async () => {
	let response = await API(
		"/Identity/GetUser?Id=" + localStorage.getItem("id")
	);
	return response;
};

const getUserInfoRequest = () => ({
	type: GET_USER_REQUEST,
});

export const getUserInfoSuccess = (payload) => ({
	type: GET_USER_SUCCESS,
	payload,
});

const getUserInfoError = (payload) => ({
	type: GET_USER_ERROR,
	payload,
});

export const setUser = () => {
	return (dispatch) => {
		dispatch(getUserInfoRequest());

		getUserInfoFetch()
			.then((res) => {
				if (res.ok) {
					dispatch(getUserInfoSuccess(res.data));
				} else {
					localStorage.removeItem("id");
					dispatch(
						getUserInfoError({
							type: "server",
							message: "Wrong Id",
						})
					);
				}
			})
			.catch((error) => {
				localStorage.removeItem("id");
				dispatch(
					getUserInfoError({
						type: error.status,
						message: error.message,
					})
				);
			});
	};
};
