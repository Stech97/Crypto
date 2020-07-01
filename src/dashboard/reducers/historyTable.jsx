import {
	HISTORY_TABLE_REQUEST,
	HISTORY_TABLE_SUCCESS,
	HISTORY_TABLE_ERROR,
} from "../actions/historyTable";

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
	records: [],
};

export const historyTableReducer = (state = initialState, action) => {
	switch (action.type) {
		case HISTORY_TABLE_REQUEST:
			return {
				...state,
				isFetching: true,
				error: {
					type: "",
					message: "",
				},
			};
		case HISTORY_TABLE_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "done",
					message: "",
				},
				records: action.payload,
			};
		case HISTORY_TABLE_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
