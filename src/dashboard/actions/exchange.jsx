import { API } from "../../config";
import { getBalance } from "./getBalance";
export const PATCH_EXCHANGE_REQUEST = "PATCH_EXCHANGE_REQUEST";
export const PATCH_EXCHANGE_SUCCESS = "PATCH_EXCHANGE_SUCCESS";
export const PATCH_EXCHANGE_ERROR = "PATCH_EXCHANGE_ERROR";

const patchExchangeSuccess = () => ({
	type: PATCH_EXCHANGE_SUCCESS,
	payload: false,
});

const patchExchangeRequest = () => ({
	type: PATCH_EXCHANGE_REQUEST,
	payload: true,
});

const patchExchangeError = (error) => ({
	type: PATCH_EXCHANGE_ERROR,
	payload: error,
});

const patchExchange = async (data) => {
	let response = API(
		"/Dashboard/Exchange?Id=" + localStorage.getItem("id"),
		"patch",
		data
	);
	return response;
};

export const Exchange = (amount, cur1, cur2) => {
	return (dispatch) => {
		console.log("##### data from action file: ", amount, cur1, cur2);
		dispatch(patchExchangeRequest());
		let data = {
			Amount: amount,
			From: cur1,
			To: cur2,
		};
		patchExchange(data)
			.then((res) => {
				console.log(res);
				dispatch(patchExchangeSuccess());
				dispatch(getBalance(localStorage.getItem("id")));
			})
			.catch((error) => {
				dispatch(
					patchExchangeError({
						type: "conversion",
						error: error.message,
					})
				);
			});
	};
};
