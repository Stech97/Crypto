import { GET_LOGIN_HISTORY_REQUEST, GET_LOGIN_HISTORY_SUCCESS, GET_LOGIN_HISTORY_ERROR } from '../actions/loginhistory'

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
	logins: [],
}

export const loginHistoryReducer = (state = initialState, action) => {
	switch(action.type) {
		case GET_LOGIN_HISTORY_REQUEST:
			return {
				...state,
				isFetching: true,
				error: {
					type: "",
					message: "",
				}
			}
		case GET_LOGIN_HISTORY_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "done",
					message: "",
				},
				logins: action.payload,
			}
		case GET_LOGIN_HISTORY_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			}
		default:
			return state
	}
}