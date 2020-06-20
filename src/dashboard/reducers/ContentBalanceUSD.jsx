import { GET_USD_RATE_SUCCESS, GET_USD_RATE_REQUEST, GET_USD_RATE_ERROR } from '../actions/getRate'

const initialState = {
	rateBTC: 0,
	rateDET: 0,
	btc: 0,
	det: 0,
	isFetching: true,
	error: {
		type: "",
		message: "",
	}
}

export function USDRateReducer( state = initialState, action) {
	switch (action.type) {
		case GET_USD_RATE_REQUEST:
			return {
				...state,
				isFetching: true,
			}
		case GET_USD_RATE_SUCCESS:
			return {
				...state,
				isFetching: false,
				rateBTC: action.payload.rateBTC,
				rateDET: action.payload.rateDET,
				btc: action.payload.btc,
				det: action.payload.det,
			}
		case GET_USD_RATE_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload
			}
		default:
			return state
	}
}