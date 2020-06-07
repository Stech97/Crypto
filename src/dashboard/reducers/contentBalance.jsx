import { GET_BALANCE_REQUEST, GET_BALANCE_SUCCESS } from '../actions/getBalance'

const initialState = {
	btc: "Wait...",
	usd: "Wait...",
	det: "Wait...",
	isFetching: false,
}

export function BalanceReducer(state = initialState, action) {
	switch (action.type) {
		case GET_BALANCE_REQUEST: return {
			...state, 
			btc: action.payload,
			usd: action.payload,
			det: action.payload,
			isFetching: true,
		}

		case GET_BALANCE_SUCCESS: return {
			...state, 
			btc: action.payload.btc,
			usd: action.payload.usd,
			det: action.payload.det,
			isFetching: false,
		}

		default:
			return state
	}
}