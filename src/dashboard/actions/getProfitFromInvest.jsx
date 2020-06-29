import { API } from "../../config";
import {
	EARNINGS_REQUEST,
	EARNINGS_ERROR,
	EARNINGS_SUCCESS,
	profitFromInvest,
} from "../reducers/contentEarnings";
import { RateRequest } from "./getRate";

const getProfitFromInvestRequest = (payload) => ({
	type: EARNINGS_REQUEST,
	payload,
});

const getProfitFromInvestError = (payload) => ({
	type: EARNINGS_ERROR,
	payload,
});

const getProfitFromInvestSuccess = (payload) => ({
	type: EARNINGS_SUCCESS,
	payload,
});

const getProfitFromInvestFetch = async () => {
	let response = API(
		"/Dashboard/ProfitFromInvest?Id=" + localStorage.getItem("id")
	);
	return response;
};

export const getProfitFromInvest = () => {
	return (dispatch) => {
		var payload = {
			profitFromInvest,
		};

		dispatch(getProfitFromInvestRequest(payload));

		getProfitFromInvestFetch()
			.then((res) => {
				if (res.ok) {
					RateRequest("usd", "btc").then((rate) => {
						payload = {
							...payload,
							data: {
								usd: res.data.profit,
								btc: res.data.profit * rate.data.rate,
							},
							error: {
								type: "done",
								message: "",
							},
						};

						dispatch(getProfitFromInvestSuccess(payload));
					});
				} else {
					payload = {
						...payload,
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					};

					dispatch(getProfitFromInvestError(payload));
				}
			})
			.catch((res) => {
				payload = {
					...payload,
					error: {
						type: "code mistake",
						message: res.message,
					},
				};

				dispatch(getProfitFromInvestError(payload));
			});
	};
};
