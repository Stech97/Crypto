import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from '../actions/signin'

const initialState = {
	userObj: null,
	isFetching: false,
	error: null,
}

export const userReducer = (state=initialState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST: return {
			...state,
			isFetching: true,
		}

		case USER_LOGIN_SUCCESS: return {
			...state,
			userObj: action.payload,
			isFetching: false,
		}

		case USER_LOGIN_ERROR: return {
			...state,
			error: action.payload,
			isFetching: false,
		}

		default: 
			return state
	}
}