import {
	FOOTER_FORM_SUCCESS,
	FOOTER_FORM_REQUEST,
	FOOTER_FORM_ERROR,
} from "../actions/FooterForm";

const initialState = {
	isFetching: false,
	error: {
		type: "",
		message: "",
	},
};

export const FooterFormReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOOTER_FORM_REQUEST:
			return {
				...state,
				isFetching: true,
				error: {
					type: "",
					message: "",
				},
			};
		case FOOTER_FORM_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: {
					type: "done",
					message: "",
				},
			};
		case FOOTER_FORM_ERROR:
			return {
				isFetching: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
