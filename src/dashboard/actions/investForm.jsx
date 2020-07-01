import { API } from "../../config";
import { getBalance } from "./getBalance";
export const BUY_INVEST_REQUEST = "BUY_INVEST_REQUEST";
export const BUY_INVEST_SUCCESS = "BUY_INVEST_SUCCESS";
export const BUY_INVEST_ERROR = "BUY_INVEST_ERROR";

const buyInvestSuccess = () => ({
	type: BUY_INVEST_SUCCESS,
	payload: false,
});

const buyInvestRequest = () => ({
	type: BUY_INVEST_REQUEST,
	payload: true,
});

const buyInvestError = (error) => ({
	type: BUY_INVEST_ERROR,
	payload: error,
});

const buyInvestFetch = async (data) => {
	let response = API(
		"/Investment/BuyInvestment?Id=" + localStorage.getItem("id"),
		"post",
		data
	);
	return response;
};

export const buyInvest = (amount, currency, type) => {
	return (dispatch) => {
		dispatch(buyInvestRequest());
		let data = {
			Currency: currency,
			SumInvestment: amount,
			Type: type,
		};
		buyInvestFetch(data)
			.then((res) => {
				if (res.ok) {
					dispatch(buyInvestSuccess());
					dispatch(getBalance(localStorage.getItem("id")));
				} else if (res.error.status === 400) {
					dispatch(
						buyInvestError({
							type: "balance",
							message: "Not enough cash",
						})
					);
				} else {
					dispatch(
						buyInvestError({
							type: "server",
							message: "Unknown exception",
						})
					);
				}
			})
			.catch((error) => {
				dispatch(
					buyInvestError({
						type: "buy invest",
						error: error.message,
					})
				);
			});
	};
};
