import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_ERROR } from '../actions/signup'

const initialState = {
 	error: {
 		type: "",
 		message: "",
 	},
 	isFetching: false,
}

export const signupReducer = (state = initialState, action) => {
	switch(action.type) {
		case CREATE_USER_REQUEST:
			return {
				...state,
				isFetching: true,
			}
		case CREATE_USER_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					...state.error,
					type: 'done',
				}
			}
		case CREATE_USER_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			}
		default:
			return state
	}
}