import { API } from '../../config'

export const GET_CURRENCY_RATE_SUCCESS = 'GET_CURRENCY_RATE_SUCCESS'
export const GET_CURRENCY_RATE_REQUEST = 'GET_CURRENCY_RATE_REQUEST'
export const GET_CURRENCY_RATE_ERROR = 'GET_CURRENCY_RATE_ERROR'

const RateRequest = async(fromCurrency, toCurrency) => {

	let response = await API('/Dashboard/GetRate', "post", { 
			from : fromCurrency,
			to: toCurrency,
		})
	console.log(response)
	return response.data.rate
}

export const getRate = (currency, amount) => {
	return dispatch => {
		dispatch({
			type: GET_CURRENCY_RATE_REQUEST,
			payload: {
				isFetching: true,
			}
		})
		switch (currency) {
			case "btc":
				var rate = RateRequest(currency, "usd")
				var usd = amount * rate
				dispatch({
					type: GET_CURRENCY_RATE_SUCCESS,
					payload: {
						rate: rate,
						usd: usd,
					}
				})
			case "usd":
				var rateBTC = RateRequest(currency, "btc")
				var rateDET = RateRequest(currency, "det")
				var btc = amount * rateBTC
				var det = amount * rateDET
				dispatch({
					type: GET_CURRENCY_RATE_SUCCESS,
					payload: {
						rateBTC: rateBTC,
						rateDET: rateDET,
						btc: btc,
						det: det,
					}
				})
			case "det":
				var rate = RateRequest(currency, "usd")
				dispatch({
					type: GET_CURRENCY_RATE_SUCCESS,
					payload: {
						rate: rate,
					}
				})
			default:
				dispatch({
					type: GET_CURRENCY_RATE_ERROR,
					payload: "Ъуъ"
				})

		}
	}
}