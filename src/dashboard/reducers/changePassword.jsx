import {
	CHANGE_PASSWORD_REQUEST,
	CHANGE_PASSWORD_SUCCESS,
	CHANGE_PASSWORD_ERROR,
} from "../actions/changePassword";

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
};

export const changePasswordReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_PASSWORD_REQUEST:
			return {
				...state,
				isFetching: true,
				error: {
					type: "",
					message: "",
				},
			};
		case CHANGE_PASSWORD_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "done",
					message: "",
				},
			};
		case CHANGE_PASSWORD_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
