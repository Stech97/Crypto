import { API } from "../../config";
import {
	EARNINGS_REQUEST,
	EARNINGS_ERROR,
	EARNINGS_SUCCESS,
	totalInvestment,
} from "../reducers/contentEarnings";

const getTotalInvestmentsRequest = (payload) => ({
	type: EARNINGS_REQUEST,
	payload,
});

const getTotalInvestmentsError = (payload) => ({
	type: EARNINGS_ERROR,
	payload,
});

const getTotalInvestmentsSuccess = (payload) => ({
	type: EARNINGS_SUCCESS,
	payload,
});

const getTotalInvestmentsFetch = async () => {
	let response = API(
		"/Dashboard/GetTotalInvestment?Id=" + localStorage.getItem("id")
	);
	return response;
};

export const getTotalInvestments = () => {
	return (dispatch) => {
		var payload = {
			totalInvestment,
		};

		dispatch(getTotalInvestmentsRequest(payload));

		getTotalInvestmentsFetch()
			.then((res) => {
				if (res.ok) {
					payload = {
						...payload,
						data: res.data,
						error: {
							type: "done",
							message: "",
						},
					};

					dispatch(getTotalInvestmentsSuccess(payload));
				} else {
					payload = {
						...payload,
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					};

					dispatch(getTotalInvestmentsError(payload));
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

				dispatch(getTotalInvestmentsError(payload));
			});
	};
};
