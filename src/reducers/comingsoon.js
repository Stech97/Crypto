import { COMINGSOON_ERROR, COMINGSOON_SUCCESS } from '../actions/ComingsoonForm'

const initialState = {
	sendError: false,
    placeholder: "maxmustter@hotmail.com"
}

export function formReducer(state = initialState, action) {
	switch (action.type) {
		case COMINGSOON_ERROR:
			return { ...state, sendError: action.payload, placeholder: action.placeholder }

		case COMINGSOON_SUCCESS:
			return { ...state, sendError: action.payload, placeholder: action.placeholder }

		default:
			return state
	}
}
