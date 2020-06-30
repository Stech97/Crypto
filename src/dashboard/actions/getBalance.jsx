import { API } from "../../config";

export const GET_BALANCE_REQUEST = "GET_BALANCE_REQUEST";
export const GET_BALANCE_SUCCESS = "GET_BALANCE_SUCCESS";

const BalanceRequest = async () => {
	let resp = await API(
		"/Dashboard/GetBalance?Id=" + localStorage.getItem("id")
	);
	return resp.data;
};

var rounded = function (number) {
	return Number(Number(number).toFixed(4));
};

export const getBalance = () => {
	return (dispatch) => {
		dispatch({
			type: GET_BALANCE_REQUEST,
			payload: "Loading...",
		});

		let data = BalanceRequest().then((data) => {
			dispatch({
				type: GET_BALANCE_SUCCESS,
				payload: {
					btc: rounded(data.btc),
					usd: rounded(data.usd),
					det: rounded(data.det),
				},
			});
		});
	};
};
