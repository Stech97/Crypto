import {
	REQUEST,
	SUCCESS,
	ERROR,
	GetKYC,
	AcceptKYC,
	DiscardKYC,
	AcceptAllKYC,
	GetPassportPicture,
	GetProofPicture,
	GetSelfiPicture,
} from "../actions/kyc";

const initialState = {
	isFetching: {
		get: false,
		current: false,
		decision: false,
		acceptAll: false,
	},
	error: {
		get: {
			type: "",
			message: "",
		},
		current: {
			type: "",
			message: "",
		},
		decision: {
			type: "",
			message: "",
		},
		acceptAll: {
			type: "",
			message: "",
		},
	},
	status: {
		get: false,
		current: false,
		decision: false,
		acceptAll: false,
	},
	data: [],
};

const types = {
	[GetPassportPicture]: "passport",
	[GetProofPicture]: "proof",
	[GetSelfiPicture]: "selfie",
};

const parseAction = (type) => (type = "/" + type.split("/")[1]);

const parseStatus = (type) => (type = "/" + type.split("/")[2]);

const typeConverter = (type) => types[parseAction(type)];

const PictureSuccessReducer = (state, action) => {
	return state.data.map((element) =>
		element.id === action.payload.id
			? {
					...element,
					[typeConverter(action.type)]: action.payload.image,
			  }
			: element
	);
};

const DecisionSuccessReducer = (state, action) =>
	state.data.map((element) =>
		element.id === action.payload.id
			? {
					...element,
					status: action.payload.status,
			  }
			: element
	);

export const KYCReducer = (state = initialState, action) => {
	var status = parseStatus(action.type);
	var event = parseAction(action.type);
	switch (event) {
		case GetPassportPicture:
			switch (status) {
				case REQUEST:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							current: true,
						},
						status: {
							...state.status,
							current: false,
						},
					};
				case ERROR:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							current: false,
						},
						status: {
							...state.status,
							current: false,
						},
						error: {
							...state.error,
							current: action.payload,
						},
					};
				case SUCCESS:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							current: false,
						},
						status: {
							...state.status,
							current: false,
						},
						data: PictureSuccessReducer(state, action),
					};
			}
		case GetProofPicture:
			switch (status) {
				case REQUEST:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							current: true,
						},
						status: {
							...state.status,
							current: false,
						},
					};
				case ERROR:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							current: false,
						},
						status: {
							...state.status,
							current: false,
						},
						error: {
							...state.error,
							current: action.payload,
						},
					};
				case SUCCESS:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							current: false,
						},
						status: {
							...state.status,
							current: false,
						},
						data: PictureSuccessReducer(state, action),
					};
			}
		case GetSelfiPicture:
			switch (status) {
				case REQUEST:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							current: true,
						},
						status: {
							...state.status,
							current: false,
						},
					};
				case ERROR:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							current: false,
						},
						status: {
							...state.status,
							current: false,
						},
						error: {
							...state.error,
							current: action.payload,
						},
					};
				case SUCCESS:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							current: false,
						},
						status: {
							...state.status,
							current: true,
						},
						data: PictureSuccessReducer(state, action),
					};
			}
		case GetKYC:
			switch (status) {
				case REQUEST:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							get: true,
						},
						data: [],
					};
				case ERROR:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							get: false,
						},
						error: {
							...state.error,
							get: action.payload,
						},
					};
				case SUCCESS:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							get: false,
						},
						data: action.payload,
					};
			}
		case AcceptKYC || DiscardKYC:
			switch (status) {
				case REQUEST:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							decision: true,
						},
					};
				case ERROR:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							decision: false,
						},
						error: {
							...state.error,
							decision: action.payload,
						},
					};
				case SUCCESS:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							decision: false,
						},
						data: DecisionSuccessReducer(state, action),
					};
			}
		case AcceptAllKYC:
			switch (status) {
				case REQUEST:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							acceptAll: true,
						},
					};
				case ERROR:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							acceptAll: false,
						},
						error: {
							...state.error,
							acceptAll: action.payload,
						},
					};
				case SUCCESS:
					return {
						...state,
						isFetching: {
							...state.isFetching,
							acceptAll: false,
						},
						data: state.data.map((element) => ({
							...element,
							status: true,
						})),
					};
			}
		default:
			return state;
	}
};
