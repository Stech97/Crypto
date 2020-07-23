import { API } from "../../../config";
export const REQUEST = "/request";
export const SUCCESS = "/success";
export const ERROR = "/error";
export const GetKYC = "GetKYC";
export const AcceptKYC = "AcceptKYC";
export const AcceptAllKYC = "AcceptAllKYC";
export const GetPassportPicture = "/GetPassportPicture";
export const GetProofPicture = "/GetProofPicture";
export const GetSelfiPicture = "/GetSelfiPicture";

const getFile = async (type, id) => {
	let response = await API("Administrator" + type + "?UserId=" + id, "file");
	return response;
};

const acceptKYCFetch = async (type, id) => {
	let response = await API(
		"Administrator/" + type + "?UserId=" + id,
		"patch"
	);
	return response;
};

const acceptAllKYCFetch = async (type) => {
	let response = await API("Administrator/" + type, "patch");
	return response;
};

const KYCFetch = async (type) => {
	let response = await API("Administrator/" + type);
	return response;
};

const KYCRequest = (type) => ({
	type: type + REQUEST,
});

const FileRequest = (type, id) => ({
	type: type + REQUEST,
	payload: { id },
});

const KYCError = (type, error) => ({
	payload: error,
	type: type + ERROR,
});

const KYCSuccess = (type, data) => ({
	payload: data,
	type: type + SUCCESS,
});

const getPicture = (type, id, dispatch) => {
	dispatch(FileRequest(type, id));
	getFile(type, id)
		.then((res) => {
			if (res.ok) {
				var reader = new FileReader();
				reader.readAsDataURL(res.data);
				reader.onload = function () {
					var imageDataUrl = reader.result;
					dispatch(KYCSuccess(type, { id, image: imageDataUrl }));
				};
			} else {
				dispatch(
					KYCError(type, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) =>
			dispatch(
				KYCError(type, {
					type: error.status,
					message: error.message,
				})
			)
		);
};

export const getPictures = (id) => {
	return (dispatch) => {
		dispatch(getPicture(GetPassportPicture, id, dispatch));
		dispatch(getPicture(GetProofPicture, id, dispatch));
		dispatch(getPicture(GetSelfiPicture, id, dispatch));
	};
};

export const acceptKYC = (id) => {
	return (dispatch) => {
		dispatch(KYCRequest(AcceptKYC));
		acceptKYCFetch(AcceptKYC, id)
			.then((res) => {
				if (res.ok) {
					dispatch(KYCSuccess(AcceptKYC, id));
				} else {
					dispatch(
						KYCError(AcceptKYC, {
							type: res.error.status,
							message: res.error.message,
						})
					);
				}
			})
			.catch((error) =>
				dispatch(
					KYCError(AcceptKYC, {
						type: error.status,
						message: error.message,
					})
				)
			);
	};
};

export const acceptAllKYC = (id) => {
	return (dispatch) => {
		dispatch(KYCRequest(AcceptAllKYC));
		acceptAllKYCFetch(AcceptAllKYC)
			.then((res) => {
				if (res.ok) {
					dispatch(KYCSuccess(AcceptAllKYC));
				} else {
					dispatch(
						KYCError(AcceptAllKYC, {
							type: res.error.status,
							message: res.error.message,
						})
					);
				}
			})
			.catch((error) =>
				dispatch(
					KYCError(AcceptAllKYC, {
						type: error.status,
						message: error.message,
					})
				)
			);
	};
};

export const getKYC = () => {
	return (dispatch) => {
		dispatch(KYCRequest(GetKYC));
		KYCFetch(GetKYC)
			.then((res) => {
				if (res.ok) {
					dispatch(KYCSuccess(GetKYC, res.data));
				} else {
					dispatch(
						KYCError(GetKYC, {
							type: res.error.status,
							message: res.error.message,
						})
					);
				}
			})
			.catch((error) =>
				dispatch(
					KYCError(GetKYC, {
						type: error.status,
						message: error.message,
					})
				)
			);
	};
};
