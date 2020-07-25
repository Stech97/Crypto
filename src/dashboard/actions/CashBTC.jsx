import { API } from "../../config";
export const Dashboard = "/Dashboard";

export const Withdraw = "/Withdraw";
export const CashBTC = "/CashBTC";
export const REQUEST = "/request";
export const ERROR = "/error";
export const SUCCESS = "/success";

const CashFetch = async (data) => {
	let response = await API(
		Dashboard + CashBTC + "?Id=" + localStorage.getItem("id"),
		"patch",
		data
	);
	return response;
};

const ActionRequest = (type) => ({
	type: Dashboard + type + REQUEST,
});

const ActionError = (type, error) => ({
	type: Dashboard + type + ERROR,
	payload: error,
});

const ActionSuccess = (type, data) => ({
	type: Dashboard + type + SUCCESS,
	payload: data,
});

export const WithdrawCash = (data) => (dispatch) => {
	dispatch(ActionRequest(Withdraw));
	CashFetch(data)
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(Withdraw, null));
			} else {
				dispatch(
					ActionError(Withdraw, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(Withdraw, {
					type: error.status,
					message: error.message,
				})
			);
		});
};

export const SendCash = (amount) => (dispatch) => {
	dispatch(ActionRequest(CashBTC));
	CashFetch({ BTC: amount })
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(CashBTC, null));
			} else {
				dispatch(
					ActionError(CashBTC, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(CashBTC, {
					type: error.status,
					message: error.message,
				})
			);
		});
};
