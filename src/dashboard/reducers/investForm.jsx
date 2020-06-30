import {
	BUY_INVEST_REQUEST,
	BUY_INVEST_SUCCESS,
	BUY_INVEST_ERROR,
} from "../actions/investForm";

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
};

export const InvestPopupReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUY_INVEST_REQUEST:
			return {
				...state,
				isFetching: true,
				error: {
					type: "",
					message: "",
				},
			};
		case BUY_INVEST_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "done",
					message: "",
				},
			};
		case BUY_INVEST_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
