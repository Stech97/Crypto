import { API } from "../../config";

export const Dashboard = "/Dashboard";
export const GetBalance = "/GetBalance";
export const GetRate = "/GetRate";
export const request = "/request";
export const error = "/error";
export const success = "/success";

const getBalanceFetch = async () => {
	let response = await API(
		Dashboard + GetBalance + "?Id=" + localStorage.getItem("id")
	);
	return response;
};

const getRateFetch = async (cur1, cur2) => {
	let response = await API(Dashboard + GetRate, "post", {
		From: cur1,
		To: cur2,
	});
	return response;
};

const BalanceRequest = (type) => ({
	type: Dashboard + type + request,
});

const BalanceError = (type, error) => ({
	type: Dashboard + type + error,
	payload: error,
});

const BalanceSuccess = (type, data) => ({
	type: Dashboard + type + success,
	payload: data,
});

export const getAllRate = () => (dispatch) => {
	dispatch(BalanceRequest(GetRate));
	var rate: {
		u2b: 1,
		b2u: 1,
		u2d: 1,
		d2u: 1,
	};

	getRateFetch("USD", "BTC")
		.then((res) => {
			if (res.ok) {
				rate.u2b = res.data.rate;
				rate.b2u = 1 / rate.u2b;
			} else {
				dispatch(
					BalanceError(GetRate, {
						ok: false,
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					})
				);
			}
		})
		.catch((error) =>
			dispatch(
				BalanceError(GetRate, {
					ok: false,
					error: {
						type: error.status,
						message: error.message,
					},
				})
			)
		);

	getRateFetch("USD", "DET")
		.then((res) => {
			if (res.ok) {
				rate.u2d = res.data.rate;
				rate.d2u = 1 / rate.u2d;
			} else {
				dispatch(
					BalanceError(GetRate, {
						ok: false,
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					})
				);
			}
		})
		.catch((error) =>
			dispatch(
				BalanceError(GetRate, {
					ok: false,
					error: {
						type: error.status,
						message: error.message,
					},
				})
			)
		);

	dispatch(BalanceSuccess(GetRate, rate));
};

export const getBalance = () => (dispatch) => {
	dispatch(BalanceRequest(GetBalance));

	getBalanceFetch()
		.then((res) => {
			if (res.ok) {
				dispatch(BalanceSuccess(GetBalance, res.data));
			} else {
				dispatch(
					BalanceError(GetBalance, {
						type: res.error.status,
						message: res.error.message,
					})
				);
			}
		})
		.catch((error) =>
			dispatch(
				BalanceError(GetBalance, {
					type: error.status,
					message: error.message,
				})
			)
		);
};
