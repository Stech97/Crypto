import { API } from "../../config";
export const HISTORY_TABLE_REQUEST = "HISTORY_TABLE_REQUEST";
export const HISTORY_TABLE_ERROR = "HISTORY_TABLE_ERROR";
export const HISTORY_TABLE_SUCCESS = "HISTORY_TABLE_SUCCESS";

const getHistoryTableRequest = () => ({
	type: HISTORY_TABLE_REQUEST,
});

const getHistoryTableError = (payload) => ({
	type: HISTORY_TABLE_ERROR,
	payload,
});

const getHistoryTableSuccess = (payload) => ({
	type: HISTORY_TABLE_SUCCESS,
	payload,
});

const getHistoryTableFetch = async () => {
	let response = API(
		"https://back.defima.io/Investment/GetBalanceHistory?UserId=" +
			localStorage.getItem("id")
	);
	return response;
};

export const getHistoryTable = () => {
	return (dispatch) => {
		dispatch(getHistoryTableRequest());

		getHistoryTableFetch()
			.then((res) => {
				if (res.ok) {
					let payload = res.data;

					dispatch(getHistoryTableSuccess(payload));
				} else {
					let payload = {
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					};

					dispatch(getHistoryTableError(payload));
				}
			})
			.catch((res) => {
				let payload = {
					error: {
						type: "code mistake",
						message: res.message,
					},
				};

				dispatch(getHistoryTableError(payload));
			});
	};
};
