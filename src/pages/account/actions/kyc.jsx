import { API } from "../../../config";
export const REQUEST = "/request";
export const SUCCESS = "/success";
export const ERROR = "/error";
export const GetKYC = "GetKYC";
export const AcceptKYC = "AcceptKYC";
export const AcceptAllKYC = "AcceptAllKYC";

const getFile = async (type, id) => {
	let response = await API("/Administrator/" + type + "?UserId=" + id);
	return response;
};

const acceptKYCFetch = async (type, id) => {
	let response = await API(
		"/Administrator/" + type + "?UserId=" + id,
		"patch"
	);
	return response;
};

const acceptAllKYCFetch = async (type) => {
	let response = await API("/Administrator/" + type, "patch");
	return response;
};

const KYCFetch = async (type) => {
	let response = await API("/Administrator/" + type);
	return response;
};

const KYCRequest = (type) => ({
	type: type + REQUEST,
});

const KYCError = (type, error) => ({
	payload: error,
	type: type + ERROR,
});

const KYCSuccess = (type, data) => ({
	payload: data,
	type: type + SUCCESS,
});

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
