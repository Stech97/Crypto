import {
	Dashboard,
	GetBalance,
	GetRate,
	request,
	error,
	success,
} from "../actions/getBalance";

const initialState = {
	isFetching: true,
	balance: {
		btc: 0,
		usd: 0,
		det: 0,
	},
	rate: {
		u2b: 1,
		b2u: 1,
		u2d: 1,
		d2u: 1,
	},
};

export function BalanceReducer(state = initialState, action) {
	switch (action.type) {
		case Dashboard + GetBalance + request || Dashboard + GetRate + request:
			return {
				...state,
				isFetching: true,
			};

		case Dashboard + GetBalance + error || Dashboard + GetRate + error:
			return {
				...state,
				error: action.payload,
				isFetching: false,
			};
		case Dashboard + GetBalance + success:
			return {
				...state,
				isFetching: false,
				balance: action.payload,
			};
		case Dashboard + GetRate + success:
			return {
				...state,
				isFetching: false,
				rate: {
					...state.rate,
					...action.payload,
				},
			};
		default:
			return state;
	}
}
