import { API } from "../../config";
import {
	EARNINGS_REQUEST,
	EARNINGS_ERROR,
	EARNINGS_SUCCESS,
	profitFromInvest,
} from "../reducers/contentEarnings";

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
			type: profitFromInvest,
			block: {},
		};
		dispatch(getProfitFromInvestRequest(payload));

		getProfitFromInvestFetch()
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
					dispatch(getProfitFromInvestSuccess(payload));
				} else {
					payload.block = {
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					};

					dispatch(getProfitFromInvestError(payload));
				}
			})
			.catch((res) => {
				payload.block = {
					error: {
						type: "code mistake",
						message: res.message,
					},
				};

				dispatch(getProfitFromInvestError(payload));
			});
	};
};
