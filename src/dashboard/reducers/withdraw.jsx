import {
	Dashboard,
	Withdraw,
	REQUEST,
	ERROR,
	SUCCESS,
} from "../actions/CashBTC";

const initialState = {
	isFetching: false,
	adress: "",
	error: {
		type: "",
		message: "",
	},
};

export function WithdrawReducer(state = initialState, action) {
	switch (action.type) {
		case Dashboard + Withdraw + REQUEST:
			return {
				...state,
				isFetching: true,
			};

		case Dashboard + Withdraw + ERROR:
			return {
				...state,
				error: action.payload,
				isFetching: false,
			};
		case Dashboard + Withdraw + SUCCESS:
			return {
				...state,
				isFetching: false,
				adress: action.payload,
			};
		default:
			return state;
	}
}
