import {
	UPDATE_USER_INFO_SUCCESS,
	UPDATE_USER_INFO_REQUEST,
	UPDATE_USER_INFO_ERROR,
	GET_USER_INFO_SUCCESS,
	GET_USER_INFO_REQUEST,
	GET_USER_INFO_ERROR,
	UPDATE_REINVEST_REQUEST,
	UPDATE_REINVEST_ERROR,
	UPDATE_REINVEST_SUCCESS,
	UPDATE_SHOWINFO_REQUEST,
	UPDATE_SHOWINFO_ERROR,
	UPDATE_SHOWINFO_SUCCESS,
} from "../actions/UserInfo";

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},

	email: "johnprice@hotmail.com",

	phone: "+41 6492 19319",

	firstName: "John",

	lastName: "Price",

	bDay: "16.12.1996",

	adress: "Hayu Road 12",

	zip: "80641",

	country: "United Kingdom",

	isReInvest: false,

	IsShowinfo: false,
};

export const userInfoReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_USER_INFO_REQUEST ||
			GET_USER_INFO_REQUEST ||
			UPDATE_REINVEST_REQUEST ||
			UPDATE_SHOWINFO_REQUEST:
			return {
				...state,
				isFetching: true,
				error: {
					type: "",
					message: "",
				},
			};
		case GET_USER_INFO_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "done",
					message: "",
				},
				...action.payload,
			};
		case UPDATE_USER_INFO_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "info updated",
					message: "",
				},
				...action.payload,
			};

		case UPDATE_REINVEST_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "reinvest updated",
					message: "",
				},
				reinvest: action.payload,
			};

		case UPDATE_SHOWINFO_SUCCESS: {
			return {
				...state,
				isFetching: false,
				error: {
					type: "showinfo updated",
					message: "",
				},
				reinvest: action.payload,
			};
		}

		case UPDATE_USER_INFO_ERROR ||
			GET_USER_INFO_ERROR ||
			UPDATE_REINVEST_ERROR ||
			UPDATE_SHOWINFO_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
