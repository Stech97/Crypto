import { GET_BTC_RATE_SUCCESS, GET_BTC_RATE_REQUEST, GET_BTC_RATE_ERROR } from '../actions/getRate'

const initialState = {
	rate: 0,
	usd: 0,
	isFetching: true,
	error: {
		type: "",
		message: "",
	}
}

export function BTCRateReducer( state = initialState, action) {
	switch (action.type) {
		case GET_BTC_RATE_REQUEST:
			return {
				...state,
				isFetching: true,
			}
		case GET_BTC_RATE_SUCCESS:
			return {
				...state,
				isFetching: false,
				rate: action.payload.rate,
				usd: action.payload.usd,
			}
		case GET_BTC_RATE_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			}
		default:
			return state
	}
}