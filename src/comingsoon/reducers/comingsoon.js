import { COMINGSOON_ERROR, COMINGSOON_SUCCESS } from '../actions/ComingsoonForm'

export const initialState = {
	visibility: true,
    placeholder: "maxmustter@hotmail.com"
}

export const formReducer = (state = initialState, action) => {
	switch (action.type) {
		case COMINGSOON_ERROR:
			return { ...state, visibility: action.payload, placeholder: action.placeholder }

		case COMINGSOON_SUCCESS:
			return { ...state, visibility: action.payload, placeholder: action.placeholder }

		default:
			return state
	}
}

export default formReducer