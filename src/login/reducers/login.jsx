import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_ERROR,
} from "../actions/signin";
import {
	REQUEST,
	SUCCESS,
	ERROR,
	SignOut,
	Identity,
	ReAuth,
} from "../../dashboard/actions/logout";
import {
	CONFIRM_EMAIL_REQUEST,
	CONFIRM_EMAIL_SUCCESS,
	CONFIRM_EMAIL_ERROR,
} from "../../signup/actions/confirmEmail";

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
			localStorage.removeItem("id");
			return {
				...state,
				error: action.payload,
				isFetching: false,
			};

		case Identity + SignOut + REQUEST:
			return {
				...state,
				isFetching: true,
			};

		case Identity + SignOut + ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};

		case Identity + SignOut + SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "",
					message: "",
				},
			};
		case Identity + ReAuth + REQUEST:
			return {
				...state,
				isFetching: true,
			};

		case Identity + ReAuth + ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};

		case Identity + ReAuth + SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "",
					message: "",
				},
			};

		case CONFIRM_EMAIL_REQUEST:
			return {
				...state,
				isFetching: true,
			};

		case CONFIRM_EMAIL_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};

		case CONFIRM_EMAIL_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "done",
					message: "",
				},
				user: {
					...state.user,
					isVerified: action.payload,
				},
			};
		default:
			return state;
	}
};
