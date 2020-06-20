import { GET_NEWS_SUCCESS, GET_NEWS_REQUEST, GET_NEWS_ERROR } from '../actions/getNews'

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
	news: [
	]
}

export const NewsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_NEWS_REQUEST:
			return {
				...state,
				isFetching: true,
				error: {
					type: "",
					message: "",
				},
			}
		case GET_NEWS_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "done",
					message: "",
				},
				news: action.payload,
			}
		case GET_NEWS_ERROR:
			return {
				isFetching: false,
				error: action.payload,
				news: [],
			}
		default:
			return state
	}
}