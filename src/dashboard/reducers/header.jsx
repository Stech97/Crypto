import { GET_USER_REQUEST, GET_USER_SUCCESS } from '../actions/header'

const initialState = {
	id: localStorage.getItem('id'),
	username: "Loading...",
	isFetching: false,
}

export function dashHeaderReducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER_REQUEST: return {
			...state, 
			username: action.payload,
			isFetching: true
		}
		
		case GET_USER_SUCCESS: return {
			...state, 
			username: action.payload,
			isFetching: false
		}
		
		default:
			return state
	}
}