import { API } from "../../../config";
export const REQUEST = "/request";
export const SUCCESS = "/success";
export const ERROR = "/error";
export const GetKYC = "/GetKYC";
export const AcceptKYC = "/AcceptKYC";
export const DiscardKYC = "/DiscardKYC";
export const AcceptAllKYC = "/AcceptAllKYC";
export const GetPassportPicture = "/GetPassportPicture";
export const GetProofPicture = "/GetProofPicture";
export const GetSelfiPicture = "/GetSelfiPicture";

const getFile = async (type, id) => {
	let response = await API("/Administrator" + type + "?UserId=" + id, "file");
	return response;
};

const acceptKYCFetch = async (type, id) => {
	let response = await API("Administrator" + type + "?UserId=" + id, "patch");
	return response;
};

const discardKYCFetch = async (type, id, message) => {
	let response = await API("Administrator" + type, "patch", {
		UserID: id,
		error: message,
	});
	return response;
};

const acceptAllKYCFetch = async (type) => {
	let response = await API("/Administrator" + type, "patch");
	return response;
};

const KYCFetch = async (type) => {
	let response = await API("/Administrator" + type);
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

const getPicture = (type, id, dispatch) => {
	dispatch(FileRequest(type, id));
	getFile(type, id)
		.then(async function (res) {
			if (res.ok) {
				let image = await convertImage(res.data);
				dispatch(KYCSuccess(type, { id, image }));
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
export const getPassport = (id) => {
	return (dispatch) => {
		getPicture(GetPassportPicture, id, dispatch);
	};
};

export const getProof = (id) => {
	return (dispatch) => {
		getPicture(GetProofPicture, id, dispatch);
	};
};

export const getSelfi = (id) => {
	return (dispatch) => {
		getPicture(GetSelfiPicture, id, dispatch);
	};
};

export const DecisionKYC = (id, decision, message = undefined) => {
	return (dispatch) => {
		let type = decision ? AcceptKYC : DiscardKYC;
		let data = { id, decision };
		let decisionFetch = decision
			? (type, id, message) => acceptKYCFetch(type, id)
			: (type, id, message) => discardKYCFetch(type, id, message);
		dispatch(KYCRequest(type));
		decisionFetch(type, id)
			.then((res) => {
				if (res.ok) {
					dispatch(KYCSuccess(type, id));
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
};

export const acceptAllKYC = () => {
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
