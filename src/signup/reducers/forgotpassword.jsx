import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR } from '../actions/forgotpassword'
import { RESTORE_PASSWORD_REQUEST, RESTORE_PASSWORD_SUCCESS, RESTORE_PASSWORD_ERROR } from '../actions/restorepassword'

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	}
}

export const forgotPasswordReducer = (state = initialState, action) => {
	switch(action.type) {
		case FORGOT_PASSWORD_REQUEST:
			return {
				...state,
				isFetching: true,
			}
		
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "none",
					message: "",
				}
			} 
		
		case FORGOT_PASSWORD_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			}
		
		case RESTORE_PASSWORD_REQUEST:
			return {
				...state,
				isFetching: true,
			}

		case RESTORE_PASSWORD_SUCCESS:
			return {
				...state,
				isFetching: false,
			}

		case RESTORE_PASSWORD_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			}

		default:
			return state
	}
}