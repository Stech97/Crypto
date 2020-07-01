import {
	TEAM_TABLE_REQUEST,
	TEAM_TABLE_SUCCESS,
	TEAM_TABLE_ERROR,
} from "../actions/getTeamTable";

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
	levels: [],
};

export const teamTableReducer = (state = initialState, action) => {
	switch (action.type) {
		case TEAM_TABLE_REQUEST:
			return {
				...state,
				isFetching: true,
				error: {
					type: "",
					message: "",
				},
			};
		case TEAM_TABLE_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "done",
					message: "",
				},
				levels: action.payload,
			};
		case TEAM_TABLE_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
