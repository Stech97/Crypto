import { GET_CURRENCY_RATE_SUCCESS, GET_CURRENCY_RATE_REQUEST, GET_CURRENCY_RATE_ERROR } from '../actions/getRate'

const initialState = {
	rateBTC: 0,
	rateDET: 0,
	btc: 0,
	det: 0,
	isFetching: false,
}

export function USDRateReducer( state = initialState, action) {
	switch (action.type) {
		case GET_CURRENCY_RATE_REQUEST:
			return {
				...state,
				isFetching: true,
			}
		case GET_CURRENCY_RATE_SUCCESS:
			return {
				...state,
				rate: action.payload.rate,
				btc: action.payload.btc,
				det: action.payload.det,
			}
		case GET_CURRENCY_RATE_ERROR:
			return {
				...state,
				rate: action.payload.rate,
				btc: action.payload.btc,
				det: action.payload.det,
			}
		default:
			return state
	}
}