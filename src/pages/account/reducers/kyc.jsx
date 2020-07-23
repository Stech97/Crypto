import {
	REQUEST,
	SUCCESS,
	ERROR,
	GetKYC,
	AcceptKYC,
	AcceptAllKYC,
	GetPassportPicture,
	GetProofPicture,
	GetSelfiPicture,
} from "../actions/kyc";

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
	data: [],
	accept: [],
	pictures: [],
};

export const KYCReducer = (state = initialState, action) => {
	const types = {
		[GetPassportPicture]: "passport",
		[GetProofPicture]: "proof",
		[GetSelfiPicture]: "selfie",
	};

	var arr = [];
	var current = null;
	switch (action.type) {
		case GetPassportPicture + REQUEST ||
			GetProofPicture + REQUEST ||
			GetSelfiPicture + REQUEST:
			arr = state.pictures;
			current = arr.find((element) => element.id === action.payload.id);
			if (current) {
				arr = arr.map(
					((element) => element.id === action.payload.id && element: {
						...element,
						isFetching: true,
					})
				);
			} else {
				arr.push({ id: action.payload.id, isFetching: true });
			}
			return {
				...state,
				pictures: arr,
			};
		case GetPassportPicture + ERROR ||
			GetProofPicture + ERROR ||
			GetSelfiPicture + ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		case GetPassportPicture + SUCCESS ||
			GetProofPicture + SUCCESS ||
			GetSelfiPicture + SUCCESS:
			arr = state.pictures;
			current = arr.find((element) => element.id === action.payload.id);
			if (current) {
				arr = arr.map(
					((element) => element.id === action.payload.id && element: {
						...element,
						passport: action.payload.image,
						isFetching: false,
					})
				);
			} else {
				arr.push({
					id: action.payload.id,
					[types[action.type]]: action.payload.image,
					isFetching: false,
				});
			}
			return {
				...state,
				isFetching: false,
				pictures: arr,
			};
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
			arr = state.accept;
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
