import { API } from "../../../config";

export const REQUEST = "/request";
export const SUCCESS = "/success";
export const ERROR = "/error";

export const GetNews = "/GetNews";
export const UpdateNews = "/UpdateNews";
export const AddNews = "/AddNews";
export const DeleteNews = "/DeleteNews";

const DeleteNewsFetch = async (data) => {
	let response = await API(
		"/Administrator/DeleteNews?heder=" + data.header,
		"delete"
	);
	return response;
};

const PostNewsFetch = async (data) => {
	let response = await API("/Administrator/AddNews", "post", data);
	return response;
};

const PatchNewsFetch = async (data) => {
	let response = await API(
		"/Administrator/UpdateNews?heder=" + data.header,
		"patch",
		data
	);
	return response;
};

const GetNewsFetch = async () => {
	let response = await API("/Dashboard" + GetNews + "?Take=10&Skip=0");
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

export const GetNewsAction = () => (dispatch) => {
	dispatch(ActionRequest(GetNews));

	GetNewsFetch()
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(GetNews, res.data));
			} else {
				dispatch(
					ActionError(GetNews, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(GetNews, {
					type: error.status,
					message: error.message,
				})
			);
		});
};

export const PatchNewsAction = (data) => (dispatch) => {
	dispatch(ActionRequest(UpdateNews));

	PatchNewsFetch(UpdateNews, data)
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(UpdateNews, res.data));
			} else {
				dispatch(
					ActionError(UpdateNews, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(UpdateNews, {
					type: error.status,
					message: error.message,
				})
			);
		});
};

export const AddNewsAction = (data) => (dispatch) => {
	dispatch(ActionRequest(AddNews));

	PostNewsFetch(data)
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(AddNews, res.data));
			} else {
				dispatch(
					ActionError(AddNews, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(AddNews, {
					type: error.status,
					message: error.message,
				})
			);
		});
};

export const DeleteNewsAction = () => (dispatch) => {
	dispatch(ActionRequest(DeleteNews));

	DeleteNewsFetch()
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(DeleteNews, null));
			} else {
				dispatch(
					ActionError(DeleteNews, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(DeleteNews, {
					type: error.status,
					message: error.message,
				})
			);
		});
};
