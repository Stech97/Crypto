import { PATCH_EXCHANGE_REQUEST, PATCH_EXCHANGE_SUCCESS, PATCH_EXCHANGE_ERROR } from '../actions/exchange'

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
}

export const ExchangeReducer = (state = initialState, action) => {
	switch(action.type) {
		case PATCH_EXCHANGE_REQUEST:
			return {
				...state,
				isFetching: true,
				error: {
					type: "",
					message: "",
				}
			}
		case PATCH_EXCHANGE_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "done",
					message: "",
				},
			}
		case PATCH_EXCHANGE_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			}
		default:
			return state
	}
}