import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_ERROR,
} from "../actions/signin";
import {
	GET_LOGOUT_REQUEST,
	GET_LOGOUT_SUCCESS,
	GET_LOGOUT_ERROR,
} from "../../pages/account/actions/logout";

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
};

export const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return {
				...state,
				isFetching: true,
			};

		case USER_LOGIN_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "done",
					message: "",
				},
			};

		case USER_LOGIN_ERROR:
			return {
				...state,
				error: action.payload,
				isFetching: false,
			};

		case GET_LOGOUT_REQUEST:
			return {
				...state,
				isFetching: true,
			};

		case GET_LOGOUT_SUCCESS:
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
