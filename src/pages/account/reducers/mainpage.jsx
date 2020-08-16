import {
	REQUEST,
	SUCCESS,
	ERROR,
	GetSingleTextInfo,
	UpdateSingleTextInfo,
	UpdatePic,
	GetPic,
	GetFAQ,
	UpdateFAQ,
	GetAbout,
	UpdateAbout,
	GetPicAbout,
	homescreen,
	career,
	defima_token,
	how_it_works,
	join_us,
	our_mission,
	portfolio,
	about_us,
	faq,
} from "../actions/mainpage";

const initialState = {
	error: {
		type: "",
		message: "",
	},
	status: false,
	homescreen: {
		data: {
			isFetching: false,
		},
		image: {
			isFetching: false,
		},
	},
	career: {
		data: {
			isFetching: false,
		},
		image: {
			isFetching: false,
		},
	},
	defima_token: {
		data: {
			isFetching: false,
		},
		image: {
			isFetching: false,
		},
	},
	how_it_works: {
		data: {
			isFetching: false,
		},
		image: {
			isFetching: false,
		},
	},
	join_us: {
		data: {
			isFetching: false,
		},
		image: {
			isFetching: false,
		},
	},
	our_mission: {
		data: {
			isFetching: false,
		},
		image: {
			isFetching: false,
		},
	},
	portfolio: {
		data: {
			isFetching: false,
		},
		image: {
			isFetching: false,
		},
	},
	about_us: {
		data: {
			isFetching: false,
		},
		images: {
			isFetching: false,
			image1: null,
			image2: null,
		},
	},
	faq: {
		data: {
			isFetching: false,
		},
	},
	terms: {
		data: {
			isFetching: false,
		},
	},
	privacy: {
		data: {
			isFetching: false,
		},
	},
};

const parseAction = (type) => (type = "/" + type.split("/")[1]);

const parseStatus = (type) => (type = "/" + type.split("/")[2]);

export const MainpageReducer = (state = initialState, action) => {
	const status = parseStatus(action.type);
	const event = parseAction(action.type);
	const payload = action.payload;
	switch (event) {
		case GetSingleTextInfo:
			switch (status) {
				case REQUEST:
					return {
						...state,
						[payload]: {
							...state[payload],
							upload: false,
							data: {
								...state[payload].data,
								isFetching: true,
							},
						},
					};
				case ERROR:
					return {
						...state,
						error: payload.error,
						[payload.block]: {
							...state[payload.block],
							data: {
								...state[payload.block].data,
								isFetching: false,
							},
						},
					};
				case SUCCESS:
					let { component, ...data } = payload;
					return {
						...state,
						[component]: {
							...state[component],
							upload: true,
							data: {
								isFetching: false,
								...data,
							},
						},
					};
				default:
					return state;
			}
		case GetPic:
			switch (status) {
				case REQUEST:
					return {
						...state,
						[payload]: {
							...state[payload],
							image: {
								...state[payload].image,
								isFetching: true,
							},
						},
					};
				case ERROR:
					return {
						...state,
						error: payload.error,
						[payload.block]: {
							...state[payload.block],
							image: {
								...state[payload.block].image,
								isFetching: false,
							},
						},
					};
				case SUCCESS:
					let { component, image } = payload;
					return {
						...state,
						[component]: {
							...state[component],
							image: {
								isFetching: false,
								image,
							},
						},
					};
				default:
					return state;
			}
		case UpdateSingleTextInfo:
			switch (status) {
				case REQUEST:
					return {
						...state,
						[payload]: {
							...state[payload],
							data: {
								...state[payload].data,
								isFetching: true,
							},
						},
					};
				case ERROR:
					return {
						...state,
						error: payload.error,
						[payload.block]: {
							...state[payload.block],
							data: {
								...state[payload.block].data,
								isFetching: false,
							},
						},
					};
				case SUCCESS:
					return {
						...state,
						[payload]: {
							...state[payload],
							upload: false,
							data: {
								...state[payload].data,
								isFetching: false,
							},
						},
					};
				default:
					return state;
			}
		case UpdatePic:
			switch (status) {
				case REQUEST:
					return {
						...state,
						[payload]: {
							...state[payload],
							image: {
								...state[payload].image,
								isFetching: true,
							},
						},
					};
				case ERROR:
					return {
						...state,
						error: payload.error,
						[payload.block]: {
							...state[payload.block],
							image: {
								...state[payload.block].image,
								isFetching: false,
							},
						},
					};
				case SUCCESS:
					return {
						...state,
						[payload]: {
							...state[payload],
							image: {
								...state[payload].image,
								isFetching: false,
							},
						},
					};
				default:
					return state;
			}
		case GetFAQ:
			switch (status) {
				case REQUEST:
					return {
						...state,
						faq: {
							...state.faq,
							upload: false,
							data: {
								...state.faq.data,
								isFetching: true,
							},
						},
					};
				case ERROR:
					return {
						...state,
						error: payload.error,
						faq: {
							...state.faq,
							data: {
								...state.faq.data,
								isFetching: false,
							},
						},
					};
				case SUCCESS:
					let { component, ...data } = payload;
					return {
						...state,
						faq: {
							...state.faq,
							upload: true,
							data: {
								...data,
								isFetching: false,
							},
						},
					};
				default:
					return state;
			}
		case UpdateFAQ:
			switch (status) {
				case REQUEST:
					return {
						...state,
						faq: {
							...state.faq,
							data: {
								...state.faq.data,
								isFetching: true,
							},
						},
					};
				case ERROR:
					return {
						...state,
						error: payload.error,
						faq: {
							...state.faq,
							data: {
								...state.faq.data,
								isFetching: false,
							},
						},
					};
				case SUCCESS:
					return {
						...state,
						faq: {
							...state.faq,
							upload: false,
							data: {
								...state.faq.data,
								isFetching: false,
							},
						},
					};
				default:
					return state;
			}
		case GetAbout:
			switch (status) {
				case REQUEST:
					return {
						...state,
						about_us: {
							...state.about_us,
							upload: false,
							data: {
								...state.about_us.data,
								isFetching: true,
							},
						},
					};
				case ERROR:
					return {
						...state,
						error: payload.error,
						about_us: {
							...state.about_us,
							data: {
								...state.about_us.data,
								isFetching: false,
							},
						},
					};
				case SUCCESS:
					let { component, ...data } = payload;
					return {
						...state,
						about_us: {
							...state.about_us,
							upload: true,
							data: {
								...data,
								isFetching: false,
							},
						},
					};
				default:
					return state;
			}
		case UpdateAbout:
			switch (status) {
				case REQUEST:
					return {
						...state,
						about_us: {
							...state.about_us,
							data: {
								...state.about_us.data,
								isFetching: true,
							},
						},
					};
				case ERROR:
					return {
						...state,
						error: payload.error,
						about_us: {
							...state.about_us,
							data: {
								...state.about_us.data,
								isFetching: false,
							},
						},
					};
				case SUCCESS:
					return {
						...state,
						about_us: {
							...state.about_us,
							upload: false,
							data: {
								...state.about_us.data,
								isFetching: false,
							},
						},
					};
				default:
					return state;
			}
		case GetPicAbout:
			switch (status) {
				case REQUEST:
					return {
						...state,
						about_us: {
							...state.about_us,
							images: {
								...state.about_us.images,
								isFetching: true,
							},
						},
					};
				case ERROR:
					return {
						...state,
						error: payload.error,
						about_us: {
							...state.about_us,
							images: {
								...state.about_us.images,
								isFetching: false,
							},
						},
					};
				case SUCCESS:
					let { index, image } = payload;
					return {
						...state,
						about_us: {
							...state.about_us,
							images: {
								...state.about_us.images,
								isFetching: false,
								["image" + index]: image,
							},
						},
					};
				default:
					return state;
			}
		default:
			return state;
	}
};
