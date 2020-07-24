import { API } from "../../../config";
export const REQUEST = "/request";
export const SUCCESS = "/success";
export const ERROR = "/error";
export const GetWithdrawalRequest = "/GetWithdrawalRequest";

const WithdrawFetch = async (type) => {
	let response = await API("/Administrator" + type);
	return response;
};

const WithdrawRequest = () => ({
	type: GetWithdrawalRequest + REQUEST,
});

const WithdrawError = (error) => ({
	type: GetWithdrawalRequest + ERROR,
	payload: error,
});

const WithdrawSuccess = (data) => ({
	type: GetWithdrawalRequest + SUCCESS,
	payload: data,
});

export const getWithdraw = () => {
	return (dispatch) => {
		dispatch(WithdrawRequest());
		WithdrawFetch(GetWithdrawalRequest)
			.then((res) => {
				if (res.ok) {
					dispatch(WithdrawSuccess(res.data));
				} else if ((res.error.status = 404)) {
					dispatch(WithdrawSuccess([]));
				} else {
					dispatch(
						WithdrawError({
							type: res.error.status,
							message: res.error.message,
						})
					);
				}
			})
			.catch((error) =>
				dispatch(
					WithdrawError({
						type: error.status,
						message: error.message,
					})
				)
			);
	};
};
