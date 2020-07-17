import {
	DASH_INFO_REQUEST,
	DASH_INFO_SUCCESS,
	DASH_INFO_ERROR,
	GetAddedFounds,
	GetInvestedAmount,
	GetCountUser,
	GetCountUserWithInvest,
	GetWithdrawnAmount,
	GetAllUsersBalance,
	GetAllCommission
} from '../actions/dashInfo'

const initialState = {
	funds: {
		isFetching: false,
		data: 0,
		error: {
			type: '',
			message: '',
		}
	},
	investedAmount: {
		isFetching: false,
		data: 0,
		error: {
			type: '',
			message: '',
		}
	},
	registeredUsers: {
		isFetching: false,
		data: 0,
		error: {
			type: '',
			message: '',
		}
	},
	usersWithInvestments: {
		isFetching: false,
		data: 0,
		error: {
			type: '',
			message: '',
		}
	},
	withdrawnAmount: {
		isFetching: false,
		data: 0,
		error: {
			type: '',
			message: '',
		}
	},
	userBalance: {
		isFetching: false,
		usd: 0,
		det: 0,
		error: {
			type: '',
			message: '',
		}
	},
	allCommission: {
		isFetching: false,
		data: 0,
		error: {
			type: '',
			message: '',
		}
	},
}

export const dashInfoReducer = (state = initialState, action) => {
	switch (action.type) {
		case DASH_INFO_REQUEST:
			switch (action.payload.type) {
				case GetAddedFounds:
					return {
						...state,
						funds: {
							...state.funds,
							isFetching: true,
							error: {
								type: '',
								message: '',
							},
						},
					}
				case GetInvestedAmount:
					return {
						...state,
						investedAmount: {
							...state.investedAmount,
							isFetching: true,
							error: {
								type: '',
								message: '',
							},
						},
					}
				case GetCountUser:
					return {
						...state,
						registeredUsers: {
							...state.registeredUsers,
							isFetching: true,
							error: {
								type: '',
								message: '',
							},
						},
					}
				case GetCountUserWithInvest:
					return {
						...state,
						usersWithInvestments: {
							...state.usersWithInvestments,
							isFetching: true,
							error: {
								type: '',
								message: '',
							},
						},
					}
				case GetWithdrawnAmount:
					return {
						...state,
						withdrawnAmount: {
							...state.withdrawnAmount,
							isFetching: true,
							error: {
								type: '',
								message: '',
							},
						},
					}
				case GetAllUsersBalance:
					return {
						...state,
						userBalance: {
							...state.userBalance,
							isFetching: true,
							error: {
								type: '',
								message: '',
							},
						},
					}
				case GetAllCommission:
					return {
						...state,
						allCommission: {
							...state.allCommission,
							isFetching: true,
							error: {
								type: '',
								message: '',
							},
						},
					}
				default: {
					return state
				}
			}
		case DASH_INFO_ERROR:
			switch (action.payload.type) {
				case GetAddedFounds:
					return {
						...state,
						funds: {
							...state.funds,
							isFetching: false,
							error: action.payload.error,
						},
					}
				case GetInvestedAmount:
					return {
						...state,
						investedAmount: {
							...state.investedAmount,
							isFetching: false,
							error: action.payload.error,
						},
					}
				case GetCountUser:
					return {
						...state,
						registeredUsers: {
							...state.registeredUsers,
							isFetching: false,
							error: action.payload.error,
						},
					}
				case GetCountUserWithInvest:
					return {
						...state,
						usersWithInvestments: {
							...state.usersWithInvestments,
							isFetching: false,
							error: action.payload.error,
						},
					}
				case GetWithdrawnAmount:
					return {
						...state,
						withdrawnAmount: {
							...state.withdrawnAmount,
							isFetching: false,
							error: action.payload.error,
						},
					}
				case GetAllUsersBalance:
					return {
						...state,
						userBalance: {
							...state.userBalance,
							isFetching: false,
							error: action.payload.error,
						},
					}
				case GetAllCommission:
					return {
						...state,
						allCommission: {
							...state.allCommission,
							isFetching: false,
							error: action.payload.error,
						},
					}
				default: {
					return state
				}
			}
		case DASH_INFO_SUCCESS:
			switch (action.payload.type) {
				case GetAddedFounds:
					return {
						...state,
						funds: {
							...state.funds,
							isFetching: false,
							data: action.payload.data.addedFound,
							error: {
								type: 'done',
								message: '',
							},
						},
					}
				case GetInvestedAmount:
					return {
						...state,
						investedAmount: {
							...state.investedAmount,
							isFetching: false,
							usd: action.payload.data.usd,
							det: action.payload.data.det,
							error: {
								type: 'done',
								message: '',
							},
						},
					}
				case GetCountUser:
					return {
						...state,
						registeredUsers: {
							...state.registeredUsers,
							isFetching: false,
							data: action.payload.data.countUser,
							error: {
								type: 'done',
								message: '',
							},
						},
					}
				case GetCountUserWithInvest:
					return {
						...state,
						usersWithInvestments: {
							...state.usersWithInvestments,
							isFetching: false,
							data: action.payload.data.countUserWithInvest,
							error: {
								type: 'done',
								message: '',
							},
						},
					}
				case GetWithdrawnAmount:
					return {
						...state,
						withdrawnAmount: {
							...state.withdrawnAmount,
							isFetching: false,
							data: action.payload.data.withdrawnAmount,
							error: {
								type: 'done',
								message: '',
							},
						},
					}
				case GetAllUsersBalance:
					return {
						...state,
						userBalance: {
							...state.userBalance,
							isFetching: false,
							usd: action.payload.data.usd,
							det: action.payload.data.det,
							error: {
								type: 'done',
								message: '',
							},
						},
					}
				case GetAllCommission:
					return {
						...state,
						allCommission: {
							...state.allCommission,
							isFetching: false,
							data: action.payload.data.allCommission,
							error: {
								type: 'done',
								message: '',
							},
						},
					}
				default: {
					return state
				}
			}
		default:
			return state
	}
}