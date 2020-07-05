import { API } from "../../config";

export const UPDATE_USER_INFO_SUCCESS = "UPDATE_USER_INFO_SUCCESS";
export const UPDATE_USER_INFO_REQUEST = "UPDATE_USER_INFO_REQUEST";
export const UPDATE_USER_INFO_ERROR = "UPDATE_USER_INFO_ERROR";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_ERROR = "GET_USER_INFO_ERROR";
export const UPDATE_REINVEST_REQUEST = "UPDATE_REINVEST_REQUEST";
export const UPDATE_REINVEST_ERROR = "UPDATE_REINVEST_ERROR";
export const UPDATE_REINVEST_SUCCESS = "UPDATE_REINVEST_SUCCESS";
export const UPDATE_SHOWINFO_REQUEST = "UPDATE_SHOWINFO_REQUEST";
export const UPDATE_SHOWINFO_ERROR = "UPDATE_SHOWINFO_ERROR";
export const UPDATE_SHOWINFO_SUCCESS = "UPDATE_SHOWINFO_SUCCESS";

const updateUserInfoRequest = () => ({
	type: UPDATE_USER_INFO_REQUEST,
	payload: true,
});

const updateUserInfoError = (error) => ({
	type: UPDATE_USER_INFO_ERROR,
	payload: error,
});

const updateUserInfoSuccess = (news) => ({
	type: UPDATE_USER_INFO_SUCCESS,
	payload: news,
});

const updateReInvestRequest = () => ({
	type: UPDATE_REINVEST_REQUEST,
	payload: true,
});

const updateReInvestError = (error) => ({
	type: UPDATE_REINVEST_ERROR,
	payload: error,
});

const updateReInvestSuccess = (news) => ({
	type: UPDATE_REINVEST_SUCCESS,
	payload: news,
});

const updateShowInfoRequest = () => ({
	type: UPDATE_SHOWINFO_REQUEST,
	payload: true,
});

const updateShowInfoError = (error) => ({
	type: UPDATE_SHOWINFO_ERROR,
	payload: error,
});

const updateShowInfoSuccess = () => ({
	type: UPDATE_SHOWINFO_SUCCESS,
});

const getUserInfoRequest = () => ({
	type: GET_USER_INFO_REQUEST,
	payload: true,
});

const getUserInfoError = (error) => ({
	type: GET_USER_INFO_ERROR,
	payload: error,
});

const getUserInfoSuccess = (news) => ({
	type: GET_USER_INFO_SUCCESS,
	payload: news,
});

const updateUserInfoFetch = async (values) => {
	let response = await API(
		"/Identity/UpdateInfo?Id=" + localStorage.getItem("id"),
		"patch",
		values
	);
	return response;
};

const updateReInvestFetch = async (reinvest) => {
	let response = await API(
		"/Identity/ReInvest?Id=" +
			localStorage.getItem("id") +
			"&ReInvest=" +
			reinvest,
		"patch",
		{}
	);
	return response;
};

const updateShowInfoFetch = async (showinfo) => {
	let response = await API(
		"/Identity/ShowInfo?Id=" +
			localStorage.getItem("id") +
			"&ShowInfo=" +
			showinfo,
		"patch",
		{}
	);
	return response;
};

const getUserInfoFetch = async () => {
	let response = await API(
		"/Identity/GetUserInfo?Id=" + localStorage.getItem("id")
	);
	return response;
};

export const updateReInvest = (value) => {
	return (dispatch) => {
		dispatch(updateReInvestRequest());
		updateReInvestFetch(value)
			.then((res) => {
				if (res.ok) {
					dispatch(updateReInvestSuccess());
					dispatch(getUserInfo());
				} else {
					dispatch(
						updateReInvestError({
							type: "validation",
							message: res.error.message,
						})
					);
				}
			})
			.catch((error) => {
				dispatch(
					updateReInvestError({
						type: "code",
						message: error.message,
					})
				);
			});
	};
};

export const updateShowInfo = (value) => {
	return (dispatch) => {
		dispatch(updateShowInfoRequest());
		updateShowInfoFetch(value)
			.then((res) => {
				if (res.ok) {
					dispatch(updateShowInfoSuccess(res.data));
					dispatch(getUserInfo());
				} else {
					dispatch(
						updateShowInfoError({
							type: "validation",
							message: res.error.message,
						})
					);
				}
			})
			.catch((error) => {
				dispatch(
					updateShowInfoError({
						type: "code",
						message: error.message,
					})
				);
			});
	};
};

export const getUserInfo = () => {
	return (dispatch) => {
		dispatch(getUserInfoRequest());
		getUserInfoFetch()
			.then((res) => {
				if (res.ok) {
					dispatch(getUserInfoSuccess(res.data));
				} else {
					dispatch(
						getUserInfoError({
							type: "validation",
							message: res.error.message,
						})
					);
				}
			})
			.catch((error) => {
				dispatch(
					getUserInfoError({
						type: "code",
						message: error.message,
					})
				);
			});
	};
};

export const updateUserInfo = (values) => {
	return (dispatch) => {
		dispatch(updateUserInfoRequest(values));
		updateUserInfoFetch(values)
			.then((res) => {
				if (res.ok) {
					dispatch(updateUserInfoSuccess(res.data));
					dispatch(getUserInfo());
				} else {
					dispatch(
						updateUserInfoError({
							type: "validation",
							message: res.error.message,
						})
					);
				}
			})
			.catch((error) => {
				dispatch(
					updateUserInfoError({
						type: "code",
						message: error.message,
					})
				);
			});
	};
};
