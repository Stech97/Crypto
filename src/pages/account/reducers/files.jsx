import {
	REQUEST,
	SUCCESS,
	ERROR,
	UploadFiles,
	DownloadFiles,
	fileNames,
} from "../actions/files";

let ArrToObj = {
	error: {
		type: "",
		message: "",
	},
};

fileNames.forEach(
	(element) =>
		(ArrToObj = {
			...ArrToObj,
			[element]: { isFetching: false, file: null },
		})
);

const initialState = ArrToObj;

const parseAction = (type) => (type = "/" + type.split("/")[1]);

const parseStatus = (type) => (type = "/" + type.split("/")[2]);

export const FileReducer = (state = initialState, action) => {
	const status = parseStatus(action.type);
	const event = parseAction(action.type);
	const payload = action.payload;
	switch (event) {
		case DownloadFiles:
			switch (status) {
				case REQUEST:
					return {
						...state,
						[payload]: {
							...state[payload],
							isFetching: true,
						},
					};
				case ERROR:
					return {
						...state,
						error: payload.error,
						[payload.content]: {
							...state[payload.content],
							isFetching: false,
						},
					};
				case SUCCESS:
					let { content, file } = payload;
					return {
						...state,
						[content]: {
							isFetching: false,
							file,
						},
					};
				default:
					return state;
			}
		case UploadFiles:
			switch (status) {
				case REQUEST:
					return {
						...state,
						[payload]: {
							...state[payload],
							isFetching: true,
						},
					};
				case ERROR:
					return {
						...state,
						error: payload.error,
						[payload.content]: {
							...state[payload.content],
							isFetching: false,
						},
					};
				case SUCCESS:
					return {
						...state,
						[payload]: {
							...state[payload],
							isFetching: false,
						},
					};
				default:
					return state;
			}
		default:
			return state;
	}
};
