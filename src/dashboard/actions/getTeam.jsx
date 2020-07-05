import { API } from "../../config";
import {
	EARNINGS_REQUEST,
	EARNINGS_ERROR,
	EARNINGS_SUCCESS,
	totalMembers,
} from "../reducers/contentEarnings";

const getMembersAmountRequest = (payload) => ({
	type: EARNINGS_REQUEST,
	payload,
});

const getMembersAmountError = (payload) => ({
	type: EARNINGS_ERROR,
	payload,
});

const getMembersAmountSuccess = (payload) => ({
	type: EARNINGS_SUCCESS,
	payload,
});

const getMembersAmountFetch = async () => {
	let response = API(
		"/Dashboard/GetTotalmembers?Id=" + localStorage.getItem("id")
	);
	return response;
};

export const getMembersAmount = () => {
	return (dispatch) => {
		var payload = {
			type: totalMembers,
			block: {},
		};
		dispatch(getMembersAmountRequest(payload));

		getMembersAmountFetch()
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
					dispatch(getMembersAmountSuccess(payload));
				} else {
					payload.block = {
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					};

					dispatch(getMembersAmountError(payload));
				}
			})
			.catch((res) => {
				payload.block = {
					error: {
						type: "code mistake",
						message: res.message,
					},
				};

				dispatch(getMembersAmountError(payload));
			});
	};
};
