import { API } from "../../config";

export const GET_BTC_RATE_SUCCESS = "GET_BTC_RATE_SUCCESS";
export const GET_BTC_RATE_REQUEST = "GET_BTC_RATE_REQUEST";
export const GET_BTC_RATE_ERROR = "GET_BTC_RATE_ERROR";
export const GET_USD_RATE_SUCCESS = "GET_USD_RATE_SUCCESS";
export const GET_USD_RATE_REQUEST = "GET_USD_RATE_REQUEST";
export const GET_USD_RATE_ERROR = "GET_USD_RATE_ERROR";
export const GET_DET_RATE_SUCCESS = "GET_DET_RATE_SUCCESS";
export const GET_DET_RATE_REQUEST = "GET_DET_RATE_REQUEST";
export const GET_DET_RATE_ERROR = "GET_DET_RATE_ERROR";

const getRateRequest = (type) => ({
	type: type,
	payload: true,
});

const getRateError = (type, error) => ({
	type: type,
	payload: error,
});

export const RateRequest = async (fromCurrency, toCurrency) => {
	let response = await API("/Dashboard/GetRate", "post", {
		From: fromCurrency.toUpperCase(),
		To: toCurrency.toUpperCase(),
	});
	return response;
};

var rounded = function (number) {
	return Number(Number(number).toFixed(4));
};

export const getRate = (currency, amount) => {
	return (dispatch) => {
		const am = amount;
		if (currency === "btc") {
			dispatch(getRateRequest(GET_BTC_RATE_REQUEST));
			var rate = RateRequest(currency, "USD")
				.then((rate) => {
					if (rate.ok) {
						var usd = am * rate.data.rate;
						dispatch({
							type: GET_BTC_RATE_SUCCESS,
							payload: {
								rate: rate.data.rate,
								usd: rounded(usd),
							},
						});
					} else if (rate.error.status === 400) {
						dispatch({
							type: GET_BTC_RATE_SUCCESS,
							payload: {
								rate: 0,
								usd: 0,
							},
						});
					} else {
						dispatch(
							getRateError(GET_BTC_RATE_ERROR, {
								type: "btc",
								message: rate.error.message,
							})
						);
					}
				})
				.catch((error) => {
					dispatch(
						getRateError(GET_BTC_RATE_ERROR, {
							type: "btc",
							message: error.message,
						})
					);
				});
		} else if (currency === "usd") {
			dispatch(getRateRequest(GET_USD_RATE_REQUEST));
			let rateBTC = RateRequest(currency, "BTC")
				.then((rateBTC) => {
					if (rateBTC.ok) {
						var btc = am * rateBTC.data.rate;
						let rateDET = RateRequest(currency, "DET")
							.then((rateDET) => {
								if (rateDET.ok) {
									var det = am * rateDET.data.rate;
									dispatch({
										type: GET_USD_RATE_SUCCESS,
										payload: {
											rateBTC: rateBTC.data.rate,
											rateDET: rateDET.data.rate,
											btc: rounded(btc),
											det: rounded(det),
										},
									});
								} else if (rateDET.error.status === 400) {
									dispatch({
										type: GET_USD_RATE_SUCCESS,
										payload: {
											rateBTC: rateBTC.data.rate,
											rateDET: 0,
											btc: rounded(btc),
											det: 0,
										},
									});
								} else {
									dispatch(
										getRateError(GET_USD_RATE_ERROR, {
											type: "usd2det",
											message: rateDET.error.message,
										})
									);
								}
							})
							.catch((error) => {
								dispatch(
									getRateError(GET_USD_RATE_ERROR, {
										type: "usd2det",
										message: error.message,
									})
								);
							});
					} else if (rateBTC.error.status === 400) {
						let rateDET = RateRequest(currency, "DET")
							.then((rateDET) => {
								if (rateDET.ok) {
									var det = am * rateDET.data.rate;
									dispatch({
										type: GET_USD_RATE_SUCCESS,
										payload: {
											rateBTC: 0,
											rateDET: rateDET.data.rate,
											btc: 0,
											det: rounded(det),
										},
									});
								} else if (rateDET.error.status === 400) {
									dispatch({
										type: GET_USD_RATE_SUCCESS,
										payload: {
											rateBTC: 0,
											rateDET: 0,
											btc: 0,
											det: 0,
										},
									});
								} else {
									dispatch(
										getRateError(GET_USD_RATE_ERROR, {
											type: "usd2det",
											message: rateDET.error.message,
										})
									);
								}
							})
							.catch((error) => {
								dispatch(
									getRateError(GET_USD_RATE_ERROR, {
										type: "usd2det",
										message: error.message,
									})
								);
							});
					} else {
						dispatch(
							getRateError({
								type: "usd2btc",
								message: rateBTC.error.message,
							})
						);
					}
				})
				.catch((error) => {
					dispatch(
						getRateError({
							type: "usd2btc",
							message: error.message,
						})
					);
				});
		} else if (currency === "det") {
			dispatch(getRateRequest(GET_DET_RATE_REQUEST));
			var rate = RateRequest(currency, "USD")
				.then((rate) => {
					if (rate.ok) {
						dispatch({
							type: GET_DET_RATE_SUCCESS,
							payload: rate.data.rate,
						});
					} else if (rate.error.status === 400) {
						dispatch({
							type: GET_DET_RATE_SUCCESS,
							payload: 0,
						});
					} else {
						dispatch(
							getRateError(GET_DET_RATE_ERROR, {
								type: "det",
								message: rate.error.message,
							})
						);
					}
				})
				.catch((error) => {
					dispatch(
						getRateError(GET_DET_RATE_ERROR, {
							type: "det",
							message: error.message,
						})
					);
				});
		} else {
			dispatch(
				getRateError({
					type: "currency",
					message: "Wrong currency",
				})
			);
		}
	};
};
