import { GET_REFS_SUCCESS, GET_REFS_REQUEST, GET_REFS_ERROR } from '../actions/getRefs'

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
	refs: {
		refId: "",
		refString: "",
	}
}

export const RefsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_REFS_REQUEST:
			return {
				...state,
				isFetching: true,
				error: {
					type: "",
					message: "",
				},
			}
		case GET_REFS_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "done",
					message: "",
				},
				refs: action.payload,
			}
		case GET_REFS_ERROR:
			return {
				isFetching: false,
				error: action.payload,
				refs: {
					refId: "",
					refString: "",
				},
			}
		default:
			return state
	}
}