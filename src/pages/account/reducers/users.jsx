import {
	REQUEST,
	SUCCESS,
	ERROR,
	GetUsersInfo,
	SignOut,
	Super,
} from "../actions/users";

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
		case SignOut + REQUEST:
			return {
				...state,
				isFetching: true,
			};
		case SignOut + ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		case SignOut + SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "",
					message: "",
				},
			};
		case Super + REQUEST:
			return {
				...state,
				isFetching: true,
			};
		case Super + ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		case Super + SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "",
					message: "",
				},
			};
		default:
			return state;
	}
};
