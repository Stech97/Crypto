import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR } from '../actions/forgotpassword'

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
			} 
		
		case FORGOT_PASSWORD_ERROR:
			return {
				...state,
				isFetching: false,
				error: {
					...state.error,
					type: action.payload.type,
					message: action.payload.message,
				}
			}
		
		default:
			return state
	}
}