import { API } from "../../../config";
export const REQUEST = "/request";
export const SUCCESS = "/success";
export const ERROR = "/error";
export const GetWithdrawalRequest = "/GetWithdrawalRequest";
export const AcceptAllWithdrawal = "/AcceptAllWithdrawal";
export const AcceptWithdrawal = "/AcceptWithdrawal";
export const DiscardWithdraw = "/DiscardWithdraw";

const GetWithdrawFetch = async (type) => {
	let response = await API("/Administrator" + type);
	return response;
};

const AcceptAllFetch = async (type) => {
	let response = await API("/Administrator" + type, "patch");
	return response;
};

const WithdrawFetch = async (type, id) => {
	let response = await API(
		"/Administrator" + type + "?UserId=" + id,
		"patch"
	);
	return response;
};

const WithdrawRequest = (type) => ({
	type: type + REQUEST,
});

const WithdrawError = (type, error) => ({
	type: type + ERROR,
	payload: error,
});

const WithdrawSuccess = (type, data) => ({
	type: type + SUCCESS,
	payload: data,
});

const SendWithdraw = (type, id, dispatch) => {
	dispatch(WithdrawRequest(type));

	WithdrawFetch(type, id)
		.then((res) => {
			if (res.ok) {
				console.log("res.data", res);
				dispatch(WithdrawSuccess(type, { id, data: res.data }));
			} else {
				dispatch(
					WithdrawError(type, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) =>
			dispatch(
				WithdrawError(type, {
					type: error.status,
					message: error.message,
				})
			)
		);
};

export const WithdrawAcceptAll = () => (dispatch) => {
	dispatch(WithdrawRequest(AcceptAllWithdrawal));

	AcceptAllFetch(AcceptAllWithdrawal)
		.then((res) => {
			if (res.ok) {
				dispatch(WithdrawSuccess(AcceptAllWithdrawal, res.data));
			} else {
				dispatch(
					WithdrawError(AcceptAllWithdrawal, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) =>
			dispatch(
				WithdrawError(AcceptAllWithdrawal, {
					type: error.status,
					message: error.message,
				})
			)
		);
};

export const WithdrawAccept = (id) => (dispatch) => {
	SendWithdraw(AcceptWithdrawal, id, dispatch);
};

export const WithdrawDiscard = (id) => (dispatch) => {
	SendWithdraw(DiscardWithdraw, id, dispatch);
};

export const getWithdraw = () => {
	return (dispatch) => {
		dispatch(WithdrawRequest());
		GetWithdrawFetch(GetWithdrawalRequest)
			.then((res) => {
				if (res.ok) {
					dispatch(WithdrawSuccess(GetWithdrawalRequest, res.data));
				} else if ((res.error.status = 404)) {
					dispatch(WithdrawSuccess(GetWithdrawalRequest, []));
				} else {
					dispatch(
						WithdrawError(GetWithdrawalRequest, {
							type: res.error.status,
							message: res.error.message,
						})
					);
				}
			})
			.catch((error) =>
				dispatch(
					WithdrawError(GetWithdrawalRequest, {
						type: error.status,
						message: error.message,
					})
				)
			);
	};
};
