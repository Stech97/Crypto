export const EARNINGS_REQUEST = "EARNINGS_REQUEST";
export const EARNINGS_ERROR = "EARNINGS_ERROR";
export const EARNINGS_SUCCESS = "EARNINGS_SUCCESS";
export const totalInvestment = "totalInvestment";
export const totalMembers = "totalMembers";
export const profitFromInvest = "profitFromInvest";
export const teamEarnings = "teamEarnings";
export const lastWeekProfits = "lastWeekProfits";

const initialState = {
	[totalInvestment]: {
		isFetching: false,

		error: {
			type: "",
			message: "",
		},

		data: {
			btc: 0,
			usd: 0,
		},
	},

	[totalMembers]: {
		isFetching: false,

		error: {
			type: "",
			message: "",
		},

		data: {
			TotalMember: 0,
		},
	},

	[profitFromInvest]: {
		isFetching: false,

		error: {
			type: "",
			message: "",
		},

		data: {
			det: 0,
			usd: 0,
		},
	},

	[teamEarnings]: {
		isFetching: false,

		error: {
			type: "",
			message: "",
		},

		data: {
			det: 0,
			usd: 0,
		},
	},

	[lastWeekProfits]: {
		isFetching: false,

		error: {
			type: "",
			message: "",
		},

		data: {
			det: 0,
			usd: 0,
		},
	},
};

export const EarningsReducer = (state = initialState, action) => {
	switch (action.type) {
		case EARNINGS_REQUEST:
			return {
				...state,
				[action.payload.block]: {
					...[action.payload.block],
					isFetching: true,
				},
			};

		case EARNINGS_ERROR:
			return {
				...state,
				[action.payload.block]: {
					...[action.payload.block],
					isFetching: false,
					error: action.payload.error,
				},
			};

		case EARNINGS_SUCCESS:
			return {
				...state,
				[action.payload.block]: {
					...[action.payload.block],
					isFetching: false,
					data: action.payload.data,
					error: {
						type: "done",
						message: "",
					},
				},
			};

		default:
			return state;
	}
};
