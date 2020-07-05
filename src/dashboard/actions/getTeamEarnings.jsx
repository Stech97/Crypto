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
	let response = API(
		"/Dashboard/GetEarningsTeam?Id=" + localStorage.getItem("id")
	);
	return response;
};

export const getTeamEarnings = () => {
	return (dispatch) => {
		var payload = {
			type: teamEarnings,
			block: {},
		};
		dispatch(getTeamEarningsRequest(payload));

		getTeamEarningsFetch()
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
					dispatch(getTeamEarningsSuccess(payload));
				} else {
					payload.block = {
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					};

					dispatch(getTeamEarningsError(payload));
				}
			})
			.catch((res) => {
				payload.block = {
					error: {
						type: "code mistake",
						message: res.message,
					},
				};

				dispatch(getTeamEarningsError(payload));
			});
	};
};
