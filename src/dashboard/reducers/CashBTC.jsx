import {
	Dashboard,
	CashBTC,
	REQUEST,
	ERROR,
	SUCCESS,
} from "../actions/CashBTC";

const initialState = {
	isFetching: true,
	adress: "",
	error: {
		type: "",
		message: "",
	},
};

export function AddFundsReducer(state = initialState, action) {
	switch (action.type) {
		case Dashboard + CashBTC + REQUEST:
			return {
				...state,
				isFetching: true,
			};

		case Dashboard + CashBTC + ERROR:
			return {
				...state,
				error: action.payload,
				isFetching: false,
			};
		case Dashboard + CashBTC + SUCCESS:
			return {
				...state,
				isFetching: false,
				adress: action.payload,
			};
		default:
			return state;
	}
}
