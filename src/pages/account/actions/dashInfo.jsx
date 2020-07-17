import { API } from "../../../config";
export const DASH_INFO_REQUEST = "DASH_INFO_REQUEST";
export const DASH_INFO_SUCCESS = "DASH_INFO_SUCCESS";
export const DASH_INFO_ERROR = "DASH_INFO_ERROR";
export const GetAddedFounds = 'GetAddedFounds';
export const GetInvestedAmount = 'GetInvestedAmount';
export const GetCountUser = 'GetCountUser';
export const GetCountUserWithInvest = 'GetCountUserWithInvest';
export const GetWithdrawnAmount = 'GetWithdrawnAmount';
export const GetAllUsersBalance = 'GetAllUsersBalance';
export const GetAllCommission = 'GetAllCommission';

const DashInfoFetch = async(type) => {
	let response = await API('/Administrator/' + type)
	return response
}

const DashInfoRequest = (type) => ({
	type: DASH_INFO_REQUEST,
	payload: {
		type,
	}
})

const DashInfoError = (type, error) => ({
	type: DASH_INFO_ERROR,
	payload: {
		type,
		error,
	}
})

const DashInfoSuccess = (type, data) => ({
	type: DASH_INFO_SUCCESS,
	payload: {
		type,
		data,
	}
})

const DashInfoAction = (type, dispatch) => {
		console.log('type', type)
		dispatch(DashInfoRequest(type))
		DashInfoFetch(type).then(res => {
			if (res.ok) {
				dispatch(DashInfoSuccess(type, res.data))
			} else {
				dispatch(DashInfoError(type, {type: res.error.status, message: res.error.message }))
			}
		}).catch(error =>{
			dispatch(DashInfoError(type, {type: error.status, message: error.message }))
		})
}

export const getDashInfo = () => {
	return (dispatch) => {
		let actions = [
			GetAddedFounds,
			GetInvestedAmount,
			GetCountUser,
			GetCountUserWithInvest,
			GetWithdrawnAmount,
			GetAllUsersBalance,
			GetAllCommission
		]

		for (const type of actions) {
			DashInfoAction(type, dispatch)
		}
	}
}