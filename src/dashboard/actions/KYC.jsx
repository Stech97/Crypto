import { API } from "../../config";

export const REQUEST = "/request";
export const SUCCESS = "/success";
export const ERROR = "/error";
export const UploadPassport = "/UploadPassport";
export const UploadProof = "/UploadProof";
export const UploadSelfi = "/UploadSelfi";
export const Identity = "/Identity";

const requestAction = (type) => ({
	type: Identity + type + REQUEST,
});

const errorAction = (type, error) => ({
	type: Identity + type + ERROR,
	payload: error,
});

const successAction = (type) => ({
	type: Identity + type + SUCCESS,
});

const patchFile = async (type, file) => {
	let response = API(
		Identity + type + "?UserId=" + localStorage.getItem("id"),
		"put",
		file
	);
	return response;
};

const uploadFile = (type, dispatch, file) => {
	dispatch(requestAction(type));

	patchFile(type, file)
		.then((res) => {
			if (res.ok) {
				dispatch(successAction(type));
			} else {
				dispatch(
					errorAction(type, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				errorAction(type, {
					type: error.status,
					message: error.message,
				})
			);
		});
};

export const uploadFiles = (files) => (dispatch) => {
	console.log("files", files);
	if (files.passport) {
		uploadFile(UploadPassport, dispatch, files.passport);
	}
	if (files.selfie) {
		uploadFile(UploadSelfi, dispatch, files.selfie);
	}
	if (files.proof) {
		uploadFile(UploadProof, dispatch, files.proof);
	}
};
