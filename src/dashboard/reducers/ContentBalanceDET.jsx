import { GET_CURRENCY_RATE_SUCCESS, GET_CURRENCY_RATE_REQUEST, GET_CURRENCY_RATE_ERROR } from '../actions/getRate'

const initialState = {
	rate: 0,
	isFetching: false,
}

export function DETRateReducer( state = initialState, action) {
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
			}
		case GET_CURRENCY_RATE_ERROR:
			return {
				...state,
				rate: action.payload.rate,
			}
		default:
			return state
	}
}