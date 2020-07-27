import { API } from "../../../config";
export const REQUEST = "/request";
export const SUCCESS = "/success";
export const ERROR = "/error";
export const GetUsersInfo = "/GetUsersInfo";

const ActionRequest = (type) => ({
	type: type + REQUEST,
});

const ActionError = (type, error) => ({
	type: type + ERROR,
	payload: error,
});

const ActionSuccess = (type, data) => ({
	type: type + SUCCESS,
	payload: data,
});

const GetUsersFetch = async () => {
	let response = await API("/Administrator/GetUsersInfo");
	return response;
};

export const GetUsers = () => (dispatch) => {
	dispatch(ActionRequest(GetUsersInfo));

	GetUsersFetch()
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(GetUsersInfo, res.data));
			} else {
				dispatch(
					ActionError(GetUsersInfo, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(GetUsersInfo, {
					type: error.status,
					message: error.message,
				})
			);
		});
};
