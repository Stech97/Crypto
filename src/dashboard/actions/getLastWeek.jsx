import { API } from "../../config";
import {
	EARNINGS_REQUEST,
	EARNINGS_ERROR,
	EARNINGS_SUCCESS,
	lastWeekProfits,
} from "../reducers/contentEarnings";
import { RateRequest } from "./getRate";

const getLastWeekProfitRequest = (payload) => ({
	type: EARNINGS_REQUEST,
	payload,
});

const getLastWeekProfitError = (payload) => ({
	type: EARNINGS_ERROR,
	payload,
});

const getLastWeekProfitSuccess = (payload) => ({
	type: EARNINGS_SUCCESS,
	payload,
});

const getLastWeekProfitFetch = async () => {
	let response = API(
		"/Dashboard/GetLastWeekProfit?Id=" + localStorage.getItem("id")
	);
	return response;
};

export const getLastWeekProfit = () => {
	return (dispatch) => {
		var payload = {
			type: lastWeekProfits,
			block: {},
		};
		dispatch(getLastWeekProfitRequest(payload));

		getLastWeekProfitFetch()
			.then((res) => {
				if (res.ok) {
					payload.block = {
						data: res.data,
						error: {
							type: "done",
							message: "",
						},
					};
					console.log("payload", payload);
					dispatch(getLastWeekProfitSuccess(payload));
				} else {
					payload.block = {
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					};

					dispatch(getLastWeekProfitError(payload));
				}
			})
			.catch((res) => {
				payload.block = {
					error: {
						type: "code mistake",
						message: res.message,
					},
				};

				dispatch(getLastWeekProfitError(payload));
			});
	};
};
