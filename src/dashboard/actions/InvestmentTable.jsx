import { API } from "../../config";
export const INVESTMENT_TABLE_REQUEST = "INVESTMENT_TABLE_REQUEST";
export const INVESTMENT_TABLE_ERROR = "INVESTMENT_TABLE_ERROR";
export const INVESTMENT_TABLE_SUCCESS = "INVESTMENT_TABLE_SUCCESS";

const getInvestmentTableRequest = () => ({
	type: INVESTMENT_TABLE_REQUEST,
});

const getInvestmentTableError = (payload) => ({
	type: INVESTMENT_TABLE_ERROR,
	payload,
});

const getInvestmentTableSuccess = (payload) => ({
	type: INVESTMENT_TABLE_SUCCESS,
	payload,
});

const getInvestmentTableFetch = async () => {
	let response = API(
		"/Investment/GetInvestments?UserId=" +
			localStorage.getItem("id") +
			"&Take=10"
	);
	return response;
};

export const getInvestmentTable = () => {
	return (dispatch) => {
		dispatch(getInvestmentTableRequest());

		getInvestmentTableFetch()
			.then((res) => {
				if (res.ok) {
					let payload = res.data;

					dispatch(getInvestmentTableSuccess(payload));
				} else {
					let payload = {
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					};

					dispatch(getInvestmentTableError(payload));
				}
			})
			.catch((res) => {
				let payload = {
					error: {
						type: "code mistake",
						message: res.message,
					},
				};

				dispatch(getInvestmentTableError(payload));
			});
	};
};
