import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from '../actions/signin'
import { GET_LOGOUT_REQUEST, GET_LOGOUT_SUCCESS, GET_LOGOUT_ERROR } from '../../dashboard/actions/logout'
import { CONFIRM_EMAIL_REQUEST, CONFIRM_EMAIL_SUCCESS, CONFIRM_EMAIL_ERROR } from '../../signup/actions/confirmEmail'

const initialState = {
	user: {
		id: 0,
		username: "",
		firstname: "",
		lastname: "",
		email: "",
		token: "",
		isVerified: false,
	},
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
}

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST: return {
			...state,
			isFetching: true,
		}

		case USER_LOGIN_SUCCESS: return {
			...state,
			user: {
				...state.user,
				id: action.payload.id,
				username: action.payload.username,
				firstname: action.payload.firstname,
				lastname: action.payload.lastname,
				token: action.payload.token,
				email: action.payload.email,
				isVerified: action.payload.isVerified,
			},
			isFetching: false,
		}

		case USER_LOGIN_ERROR: return {
			...state,
			error: action.payload,
			isFetching: false,
		}

		case GET_LOGOUT_REQUEST: return {
			...state,
			isFetching: true,
		}

		case GET_LOGOUT_SUCCESS: return {
			...state,
			isFetching: false,
		}
		
		case CONFIRM_EMAIL_REQUEST: return {
			...state,
			isFetching: true,
		}

		case CONFIRM_EMAIL_ERROR: return {
			...state,
			isFetching: false,
			error: action.payload,
		}
		
		case CONFIRM_EMAIL_SUCCESS: return {
			...state,
			isFetching: false,
			user: {
				...state.user,
				isVerified: action.payload,
			}
		}
		default: 
			return state
	}
}