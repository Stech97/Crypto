import API from '../../config'
import { GET_USER_REQUEST, GET_USER_SUCCESS } from '../actions/header'

const initialState = {
	id: 7,
	username: "Loading...",
	isFetching: false,
}

export function dashHeaderReducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER_REQUEST: return {
			...state, 
			id: 7,
			username: action.payload,
			isFetching: true
		}

		case GET_USER_SUCCESS: return {
			...state, 
			id: 7,
			username: action.payload,
			isFetching: false
		}

		default:
			return state
	}
}