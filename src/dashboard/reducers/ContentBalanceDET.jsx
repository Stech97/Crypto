import { GET_DET_RATE_SUCCESS, GET_DET_RATE_REQUEST, GET_DET_RATE_ERROR } from '../actions/getRate'

const initialState = {
	rate: 0,
	isFetching: true,
	error: {
		type: "",
		message: "",
	}
}

export function DETRateReducer( state = initialState, action) {
	switch (action.type) {
		case GET_DET_RATE_REQUEST:
			return {
				...state,
				isFetching: true,
				error: {
					type: "",
					message: "",
				},
			}
		case GET_DET_RATE_SUCCESS:
			return {
				...state,
				isFetching: false,
				rate: action.payload,
				error: {
					type: "",
					message: "",
				},
			}
		case GET_DET_RATE_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload
			}
		default:
			return state
	}
}