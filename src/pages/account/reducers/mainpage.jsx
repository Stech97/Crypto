import {
	REQUEST,
	SUCCESS,
	ERROR,
	GetSingleTextInfo,
	UpdateSingleTextInfo,
} from "../actions/mainpage";

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
};

export const MainpageReducer = (state = initialState, action) => {
	switch (action.type) {
		case GetSingleTextInfo + REQUEST || UpdateSingleTextInfo + REQUEST:
			return {
				...state,
				isFetching: true,
			};
		case GetSingleTextInfo + ERROR || UpdateSingleTextInfo + ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		case GetSingleTextInfo + SUCCESS:
			return {
				...state,
				isFetching: false,
				[action.payload.component]: action.payload.data,
			};
		case UpdateSingleTextInfo + SUCCESS:
			return {
				...state,
				isFetching: false,
			};
		default:
			return state;
	}
};
