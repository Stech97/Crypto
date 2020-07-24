import {
	REQUEST,
	SUCCESS,
	ERROR,
	GetNews,
	UpdateNews,
	AddNews,
	DeleteNews,
} from "../actions/news";

const initialState = {
	isFetching: false,
	news: [],
	error: {
		type: "",
		message: "",
	},
};

export const NewsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GetNews + REQUEST ||
			UpdateNews + REQUEST ||
			AddNews + REQUEST ||
			DeleteNews + REQUEST:
			return {
				...state,
				isFetching: true,
			};
		case GetNews + ERROR ||
			UpdateNews + ERROR ||
			AddNews + ERROR ||
			DeleteNews + ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		case GetNews + SUCCESS:
			return {
				...state,
				isFetching: false,
				news: action.payload,
			};
		case DeleteNews + SUCCESS || UpdateNews + SUCCESS || AddNews + SUCCESS:
			return {
				...state,
				isFetching: false,
			};
		default:
			return state;
	}
};
