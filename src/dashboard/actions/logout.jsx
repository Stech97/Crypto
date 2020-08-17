import { API } from "../../config";
import Cookies from "js-cookie";
export const REQUEST = "/REQUEST";
export const SUCCESS = "/SUCCESS";
export const ERROR = "/ERROR";
export const SignOut = "/SignOut";
export const Identity = "/Identity";
export const ReAuth = "/ReAuth";

const relogFetch = async () => {
	let response = await API(
		Identity + ReAuth + "?UserId=" + localStorage.getItem("id")
	);
	return response;
};

export const relogUser = () => (dispatch) => {
	dispatch(ActionRequest(ReAuth));
	relogFetch()
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(ReAuth));
			} else if (res.status === 401) {
				localStorage.removeItem("id");
				dispatch(
					ActionError(ReAuth, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			} else {
				localStorage.removeItem("id");
				dispatch(
					ActionError(ReAuth, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			localStorage.removeItem("id");
			dispatch(
				ActionError(ReAuth, {
					message: error.message,
					type: error.status,
				})
			);
		});
};

const ActionSuccess = (type) => ({
	type: Identity + type + SUCCESS,
	payload: false,
});

const ActionRequest = (type) => ({
	type: Identity + type + REQUEST,
	payload: false,
});

const ActionError = (type, error) => ({
	type: Identity + type + ERROR,
	payload: error,
});

export const userLogoutGet = () => {
	return (dispatch) => {
		dispatch(ActionRequest(SignOut));
		let ID = localStorage.getItem("id");
		localStorage.removeItem("id");
		let response = API(Identity + SignOut + "?Id=" + ID, "delete")
			.then((response) => {
				dispatch(ActionSuccess(SignOut));
			})
			.catch((error) =>
				dispatch(
					ActionError(SignOut, {
						message: error.message,
						type: error.status,
					})
				)
			);
	};
};
