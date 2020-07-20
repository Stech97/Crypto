import {
	REQUEST,
	SUCCESS,
	ERROR,
	GetKYC,
	AcceptKYC,
	AcceptAllKYC,
} from "../actions/kyc";

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
	data: [],
	accept: [],
};

export const KYCReducer = (state = initialState, action) => {
	switch (action.type) {
		case GetKYC + REQUEST:
			return {
				...state,
				isFetching: true,
			};
		case GetKYC + ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		case GetKYC + SUCCESS:
			return {
				...state,
				isFetching: false,
				data: action.payload,
			};
		case AcceptKYC + REQUEST:
			return {
				...state,
				isFetching: true,
			};
		case AcceptKYC + ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		case AcceptKYC + SUCCESS:
			let arr = state.accept;
			arr.push({ id: action.payload });
			return {
				...state,
				isFetching: false,
				accept: arr,
			};
		case AcceptAllKYC + REQUEST:
			return {
				...state,
				isFetching: true,
			};
		case AcceptAllKYC + ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		case AcceptAllKYC + SUCCESS:
			return {
				...state,
				isFetching: false,
			};
		default:
			return state;
	}
};
