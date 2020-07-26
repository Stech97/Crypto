import {
	REQUEST,
	SUCCESS,
	ERROR,
	GetWithdrawalRequest,
	AcceptAllWithdrawal,
	AcceptWithdrawal,
	DiscardWithdraw,
} from "../actions/withdraw";

const initialState = {
	isFetching: {
		data: false,
		withdraw: false,
	},
	error: {
		type: "",
		message: "",
	},
	data: [],
};

export const WithdrawReducer = (state = initialState, action) => {
	switch (action.type) {
		case GetWithdrawalRequest + REQUEST:
			return {
				...state,
				isFetching: {
					...state.isFetching,
					data: true,
				},
			};
		case AcceptAllWithdrawal + REQUEST ||
			AcceptWithdrawal + REQUEST ||
			DiscardWithdraw + REQUEST:
			return {
				...state,
				isFetching: {
					...state.isFetching,
					withdraw: true,
				},
			};
		case GetWithdrawalRequest + ERROR ||
			AcceptAllWithdrawal + ERROR ||
			AcceptWithdrawal + ERROR ||
			DiscardWithdraw + ERROR:
			return {
				...state,
				isFetching: {
					...state.isFetching,
					data: false,
				},
				error: action.payload,
			};
		case GetWithdrawalRequest + SUCCESS:
			return {
				...state,
				isFetching: {
					...state.isFetching,
					data: false,
				},
				data: action.payload,
			};
		case AcceptWithdrawal + SUCCESS:
			return {
				...state,
				isFetching: {
					...state.isFetching,
					withdraw: false,
				},
				data: state.data.map((element) => {
					if (element.userId === action.payload.id) {
						return {
							...element,
							wallet: action.payload.data.wallet,
						};
					} else {
						return element;
					}
				}),
			};
		case DiscardWithdraw + SUCCESS:
			return {
				...state,
				isFetching: {
					...state.isFetching,
					withdraw: false,
				},
				data: state.data.map((element) => {
					if (element.userId === action.payload.id) {
						return {
							...element,
							wallet: "",
						};
					} else {
						return element;
					}
				}),
			};
		default:
			return state;
	}
};
