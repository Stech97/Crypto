import { API } from "../../../config";

export const REQUEST = "/request";
export const SUCCESS = "/success";
export const ERROR = "/error";

export const GetSingleTextInfo = "/GetSingleTextInfo";
export const UpdateSingleTextInfo = "/UpdateSingleTextInfo";

const GetBlockFetch = async (component) => {
	let response = await API(
		"/Administrator" + GetSingleTextInfo + "?Component=" + component
	);
	return response;
};

const UpdateBlockFetch = async (data) => {
	let response = await API(
		"/Administrator" + UpdateSingleTextInfo,
		"patch",
		data
	);
	return response;
};

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

export const GetBlock = (component) => (dispatch) => {
	dispatch(ActionRequest(GetSingleTextInfo));

	GetBlockFetch(component)
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(GetSingleTextInfo, res.data));
			} else {
				dispatch(
					ActionError(GetSingleTextInfo, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(GetSingleTextInfo, {
					type: error.status,
					message: error.message,
				})
			);
		});
};

export const UpdateBlock = (data) => (dispatch) => {
	dispatch(ActionRequest(UpdateSingleTextInfo));

	UpdateBlockFetch(data)
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(UpdateSingleTextInfo, res.data));
			} else {
				dispatch(
					ActionError(UpdateSingleTextInfo, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(UpdateSingleTextInfo, {
					type: error.status,
					message: error.message,
				})
			);
		});
};
