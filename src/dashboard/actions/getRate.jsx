import { API } from '../../config'

export const GET_BTC_RATE_SUCCESS = 'GET_BTC_RATE_SUCCESS'
export const GET_BTC_RATE_REQUEST = 'GET_BTC_RATE_REQUEST'
export const GET_BTC_RATE_ERROR = 'GET_BTC_RATE_ERROR'
export const GET_USD_RATE_SUCCESS = 'GET_USD_RATE_SUCCESS'
export const GET_USD_RATE_REQUEST = 'GET_USD_RATE_REQUEST'
export const GET_USD_RATE_ERROR = 'GET_USD_RATE_ERROR'
export const GET_DET_RATE_SUCCESS = 'GET_DET_RATE_SUCCESS'
export const GET_DET_RATE_REQUEST = 'GET_DET_RATE_REQUEST'
export const GET_DET_RATE_ERROR = 'GET_DET_RATE_ERROR'

const getRateRequest = (type) => ({
	type: type,
	payload: true,
})

const getRateError = (type, error) => ({
	type: type,
	payload: error,
})

const RateRequest = async(fromCurrency, toCurrency, amount) => {

	let response = await API('/Dashboard/GetRate', "post", { 
			from : fromCurrency.toUpperCase(),
			to: toCurrency.toUpperCase(),
		})
	return response.data.rate
}

export const getRate = (currency, amount) => {
	return dispatch => {
		const am = amount
		if (currency === "btc") {
			dispatch(getRateRequest(GET_BTC_RATE_REQUEST))
			var rate = RateRequest(currency, "USD")
			.then((rate) => {
				console.log("### rate: ", rate)
				var usd = am * rate
				console.log("####### ", am, rate, usd)
				dispatch({
					type: GET_BTC_RATE_SUCCESS,
					payload: {
						rate: rate,
						usd: usd,
					}
				})
			}).catch(error => {
				dispatch(getRateError(GET_BTC_RATE_ERROR, {
					type: "btc",
					message: error.message
				}))
			})
		} else if (currency === "usd") {
			dispatch(getRateRequest(GET_USD_RATE_REQUEST))
			let rateBTC = RateRequest(currency, "BTC")
			.then((rateBTC) => {
				var btc = am * rateBTC
				let rateDET = RateRequest(currency, "DET")
				.then((rateDET) => {
					var det = am * rateDET
					dispatch({
						type: GET_USD_RATE_SUCCESS,
						payload: {
							rateBTC: rateBTC,
							rateDET: rateDET,
							btc: btc,
							det: det,
						}
					})					
				}).catch(error => {
					dispatch(getRateError(GET_USD_RATE_ERROR, {
						type: "usd2det",
						message: error.message
					}))
				})
			}).catch(error => {
				dispatch(getRateError({
					type: "usd2btc",
					message: error.message
				}))
			})
		} else if (currency === "det") {
			dispatch(getRateRequest(GET_DET_RATE_REQUEST))
			var rate = RateRequest(currency, "USD")
			.then(rate => {
				dispatch({
					type: GET_DET_RATE_SUCCESS,
					payload: rate,
				})
			}).catch(error => {
				dispatch(getRateError(GET_DET_RATE_ERROR, {
					type: "det",
					message: error.message
				}))
			})
		} else {
			dispatch(getRateError({
				type: "currency",
				message: "Wrong currency"
			}))
		}
	}
}