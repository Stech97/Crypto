import { API } from "../../../config";

export const REQUEST = "/request";
export const SUCCESS = "/success";
export const ERROR = "/error";

export const GetSingleTextInfo = "/GetSingleTextInfo";
export const UpdateSingleTextInfo = "/UpdateSingleTextInfo";
export const GetPic = "/GetPic";
export const UpdatePic = "/UpdatePic";
export const GetFAQ = "/GetFAQ";
export const UpdateFAQ = "/UpdateFAQ";
export const GetAbout = "/GetAbout";
export const UpdateAbout = "/UpdateAbout";
export const GetPicAbout = "/GetPicAbout";

export const homescreen = "homescreen";
export const career = "career";
export const defima_token = "defima_token";
export const how_it_works = "how_it_works";
export const join_us = "join_us";
export const our_mission = "our_mission";
export const portfolio = "portfolio";
export const about_us = "about_us";
export const faq = "faq";

// Fetch functions

const GetBlockFetch = async (component) => {
	let response = await API(
		"/Administrator" + GetSingleTextInfo + "?Component=" + component
	);
	return response;
};

const GetFAQFetch = async () => {
	let response = await API("/Administrator" + GetFAQ);
	return response;
};

const GetAboutFetch = async () => {
	let response = await API("/Administrator" + GetAbout);
	return response;
};

const GetPictureFetch = async (component) => {
	let response = await API(
		"/Administrator" + GetPic + "?Component=" + component,
		"file"
	);
	return response;
};

const GetAboutPictureFetch = async (index) => {
	let response = await API(
		"/Administrator" + GetPicAbout + "?NamePic=" + index,
		"file"
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

const UpdateFAQFetch = async (data) => {
	let response = await API("/Administrator" + UpdateFAQ, "patch", data);
	return response;
};

const UpdateAboutFetch = async (data) => {
	let response = await API("/Administrator" + UpdateAbout, "patch", data);
	return response;
};

const UpdatePictureFetch = async (data, component) => {
	let response = await API(
		"/Administrator" + UpdatePic + "?Component=" + component,
		"put",
		data
	);
	return response;
};

// Convert image to base64

const convertImage = (data) => {
	var base64data = "";
	var reader = new FileReader();
	return new Promise((resolve, reject) => {
		reader.onerror = () => {
			reader.abort();
			reject(new DOMException("Problem parsing input file."));
		};
		reader.onloadend = function () {
			resolve(reader.result);
		};
		reader.readAsDataURL(data);
	});
};

// Action functions

const ActionRequest = (type, block) => ({
	type: type + REQUEST,
	payload: block,
});

const ActionError = (type, error) => ({
	type: type + ERROR,
	payload: error,
});

const ActionSuccess = (type, data) => ({
	type: type + SUCCESS,
	payload: data,
});

// Actions

export const getPicture = (component) => (dispatch) => {
	dispatch(ActionRequest(GetPic, component));
	GetPictureFetch(component)
		.then(async function (res) {
			if (res.ok) {
				let image = await convertImage(res.data);
				dispatch(
					ActionSuccess(GetPic, {
						component,
						image,
					})
				);
			} else if (res.status === 404) {
				dispatch(
					ActionSuccess(GetPic, {
						component,
						image: "",
					})
				);
			} else {
				dispatch(
					ActionError(GetPic, {
						block: component,
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(GetPic, {
					block: component,
					error: {
						type: error.status,
						message: error.message,
					},
				})
			);
		});
};

export const UpdatePicture = (image, component) => (dispatch) => {
	dispatch(ActionRequest(UpdatePic, component));

	UpdatePictureFetch(image, component)
		.then((res) => {
			console.log("res", res);
			if (res.ok) {
				dispatch(ActionSuccess(UpdatePic, component));
			} else {
				dispatch(
					ActionError(UpdatePic, {
						block: component,
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(UpdatePic, {
					block: component,
					error: {
						type: error.status,
						message: error.message,
					},
				})
			);
		});
};

export const GetBlock = (component) => (dispatch) => {
	dispatch(ActionRequest(GetSingleTextInfo, component));

	GetBlockFetch(component)
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(GetSingleTextInfo, res.data));
			} else {
				dispatch(
					ActionError(GetSingleTextInfo, {
						block: component,
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(GetSingleTextInfo, {
					block: component,
					error: {
						type: error.status,
						message: error.message,
					},
				})
			);
		});
};

export const UpdateBlock = (data) => (dispatch) => {
	dispatch(ActionRequest(UpdateSingleTextInfo, data.component));

	UpdateBlockFetch(data)
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(UpdateSingleTextInfo, data.component));
			} else {
				dispatch(
					ActionError(UpdateSingleTextInfo, {
						block: data.component,
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(UpdateSingleTextInfo, {
					block: data.component,
					error: {
						type: error.status,
						message: error.message,
					},
				})
			);
		});
};

export const GetFAQBlock = () => (dispatch) => {
	dispatch(ActionRequest(GetFAQ));

	GetFAQFetch()
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(GetFAQ, res.data));
			} else {
				dispatch(
					ActionError(GetFAQ, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(GetFAQ, {
					type: error.status,
					message: error.message,
				})
			);
		});
};

export const UpdateFAQBlock = (data) => (dispatch) => {
	dispatch(ActionRequest(UpdateFAQ));

	UpdateFAQFetch(data)
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(UpdateFAQ, res.data));
			} else {
				dispatch(
					ActionError(UpdateFAQ, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(UpdateFAQ, {
					type: error.status,
					message: error.message,
				})
			);
		});
};

export const GetAboutBlock = () => (dispatch) => {
	dispatch(ActionRequest(GetAbout));

	GetAboutFetch()
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(GetAbout, res.data));
			} else {
				dispatch(
					ActionError(GetAbout, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(GetAbout, {
					type: error.status,
					message: error.message,
				})
			);
		});
};

export const UpdateAboutBlock = (data) => (dispatch) => {
	dispatch(ActionRequest(UpdateAbout));

	UpdateAboutFetch(data)
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(UpdateAbout, res.data));
			} else {
				dispatch(
					ActionError(UpdateAbout, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(UpdateAbout, {
					type: error.status,
					message: error.message,
				})
			);
		});
};

export const GetPictureAbout = (index) => (dispatch) => {
	dispatch(ActionRequest(GetPicAbout));
	GetAboutPictureFetch(index)
		.then(async function (res) {
			if (res.ok) {
				let image = await convertImage(res.data);
				dispatch(ActionSuccess(GetPicAbout, { index, image }));
			} else if (res.status === 404) {
				dispatch(ActionSuccess(GetPicAbout, { index, image: "" }));
			} else {
				dispatch(
					ActionError(GetPicAbout, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(GetPicAbout, {
					type: error.status,
					message: error.message,
				})
			);
		});
};
