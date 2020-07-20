import {
	REQUEST,
	SUCCESS,
	ERROR,
	UploadPassport,
	UploadProof,
	UploadSelfi,
	Identity,
} from "../actions/KYC";

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
};

export const KYCReducer = (state = initialState, action) => {
	switch (action.type) {
		case Identity + UploadPassport + REQUEST ||
			Identity + UploadProof + REQUEST ||
			Identity + UploadSelfi + REQUEST:
			return {
				...state,
				isFetching: true,
				error: {
					type: "",
					message: "",
				},
			};
		case Identity + UploadPassport + SUCCESS ||
			Identity + UploadProof + SUCCESS ||
			Identity + UploadSelfi + SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "done",
					message: "",
				},
			};
		case Identity + UploadPassport + ERROR ||
			Identity + UploadProof + ERROR ||
			Identity + UploadSelfi + ERROR:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
