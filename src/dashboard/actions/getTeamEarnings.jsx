import { API } from "../../config";
import {
	EARNINGS_REQUEST,
	EARNINGS_ERROR,
	EARNINGS_SUCCESS,
	teamEarnings,
} from "../reducers/contentEarnings";

const getTeamEarningsRequest = (payload) => ({
	type: EARNINGS_REQUEST,
	payload,
});

const getTeamEarningsError = (payload) => ({
	type: EARNINGS_ERROR,
	payload,
});

const getTeamEarningsSuccess = (payload) => ({
	type: EARNINGS_SUCCESS,
	payload,
});

const getTeamEarningsFetch = async () => {
	let response = {
		ok: true,
		data: {
			det: 423,
			usd: 423,
		},
	};
	return response;
};

export const getTeamEarnings = () => {
	return (dispatch) => {
		var payload = {
			teamEarnings,
		};

		dispatch(getTeamEarningsRequest(payload));

		getTeamEarningsFetch()
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

					dispatch(getTeamEarningsSuccess(payload));
				} else {
					payload = {
						...payload,
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					};

					dispatch(getTeamEarningsError(payload));
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

				dispatch(getTeamEarningsError(payload));
			});
	};
};
