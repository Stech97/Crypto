import {
	REQUEST,
	SUCCESS,
	ERROR,
	GetWithdrawalRequest,
} from "../actions/withdraw";

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
	data: [],
};

export const WithdrawReducer = (state = initialState, action) => {
	switch (action.type) {
		case GetWithdrawalRequest + "/" + REQUEST:
			return {
				...state,
				isFetching: true,
			};
		case GetWithdrawalRequest + "/" + ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		case GetWithdrawalRequest + "/" + SUCCESS:
			return {
				...state,
				isFetching: false,
				data: action.payload,
			};
		default:
			return state;
	}
};
