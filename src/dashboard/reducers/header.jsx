import {
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_ERROR,
} from "../actions/header";

const initialState = {
	user: {
		id: localStorage.getItem("id"),
		username: "",
		firstName: "",
		lastName: "",
		email: "",
		token: "",
		isVerified: false,
	},
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
};

export function dashHeaderReducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER_REQUEST:
			return {
				...state,
				isFetching: true,
			};

		case GET_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				isFetching: false,
			};
		case GET_USER_ERROR:
			return {
				...state,
				error: action.payload,
				user: {
					id: localStorage.getItem("id"),
					username: "",
					firstName: "",
					lastName: "",
					email: "",
					token: "",
					isVerified: false,
				},
			};
		default:
			return state;
	}
}
