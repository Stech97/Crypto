import {
	TEAM_POPUP_REQUEST,
	TEAM_POPUP_SUCCESS,
	TEAM_POPUP_ERROR,
} from "../actions/teamPopup";

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
	members: []
};

export const teamPopupReducer = (state = initialState, action) => {
	switch (action.type) {
		case TEAM_POPUP_REQUEST:
			return {
				...state,
				isFetching: true,
				error: {
					type: "",
					message: "",
				},
			};
		case TEAM_POPUP_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "done",
					message: "",
				},
				members: action.payload,
			};
		case TEAM_POPUP_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
