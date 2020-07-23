import {
	REQUEST,
	SUCCESS,
	ERROR,
	GetRate,
	UpdateRate,
	GetCommission,
	UpdateCommission,
	GetProfit,
	UpdateProfit,
} from "../actions/finance";

const initialState = {
	isFetching: {
		[GetProfit + REQUEST]: false,
		[GetRate + REQUEST]: false,
		[GetCommission + REQUEST]: false,
		update: false,
	},
	rateDet: "1.0",
	comissions: [30, 20, 20, 10, 10, 5, 5, 0.5],
	profit: [],
};

export const FinanceReducer = (state = initialState, action) => {
	switch (action.type) {
		case (GetRate + REQUEST, GetCommission + REQUEST, GetProfit + REQUEST):
			return {
				...state,
				isFetching: {
					...state.isFetching,
					[action.type]: true,
				},
			};
		case (GetRate + ERROR, GetCommission + ERROR, GetProfit + ERROR):
			return {
				...state,
				error: action.payload,
			};
		case GetRate + SUCCESS:
			return {
				...state,
				isFetching: {
					...state.isFetching,
					[GetRate + REQUEST]: false,
				},
				rateDet: action.payload.rateDet,
			};
		case GetCommission + SUCCESS:
			return {
				...state,
				isFetching: {
					...state.isFetching,
					[GetCommission + REQUEST]: false,
				},
				comissions: action.payload,
			};
		case GetProfit + SUCCESS:
			return {
				...state,
				isFetching: {
					...state.isFetching,
					[GetProfit + REQUEST]: false,
				},
				profit: action.payload,
			};
		default:
			return state;
	}
};
