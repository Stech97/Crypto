import { API } from "../../config";

export const GET_BALANCE_REQUEST = "GET_BALANCE_REQUEST";
export const GET_BALANCE_SUCCESS = "GET_BALANCE_SUCCESS";

const BalanceRequest = async (ID) => {
	let resp = await API("/Dashboard/GetBalance?Id=" + ID);
	return resp.data;
};

var rounded = function (number) {
	return Number(Number(number).toFixed(4));
};

export const getBalance = (ID) => {
	return (dispatch) => {
		dispatch({
			type: GET_BALANCE_REQUEST,
			payload: "Loading...",
		});

		let data = BalanceRequest(ID).then((data) => {
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
