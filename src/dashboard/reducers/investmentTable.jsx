import {
	INVESTMENT_TABLE_REQUEST,
	INVESTMENT_TABLE_SUCCESS,
	INVESTMENT_TABLE_ERROR,
} from "../actions/InvestmentTable";

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
	investments: [],
};

export const investmentTableReducer = (state = initialState, action) => {
	switch (action.type) {
		case INVESTMENT_TABLE_REQUEST:
			return {
				...state,
				isFetching: true,
				error: {
					type: "",
					message: "",
				},
			};
		case INVESTMENT_TABLE_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "done",
					message: "",
				},
				investments: action.payload,
			};
		case INVESTMENT_TABLE_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
