import { REQUEST, SUCCESS, ERROR, GetUsersInfo } from "../actions/users";

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
	data: [],
};

export const UsersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GetUsersInfo + REQUEST:
			return {
				...state,
				isFetching: true,
			};
		case GetUsersInfo + ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		case GetUsersInfo + SUCCESS:
			return {
				...state,
				isFetching: false,
				data: action.payload,
			};
		default:
			return state;
	}
};
