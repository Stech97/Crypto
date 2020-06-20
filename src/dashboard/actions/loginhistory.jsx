import { API } from '../../config'

export const GET_LOGIN_HISTORY_SUCCESS = 'GET_LOGIN_HISTORY_SUCCESS'
export const GET_LOGIN_HISTORY_REQUEST = 'GET_LOGIN_HISTORY_REQUEST'
export const GET_LOGIN_HISTORY_ERROR = 'GET_LOGIN_HISTORY_ERROR'

const getLoginHistoryRequest = () => ({
	type: GET_LOGIN_HISTORY_REQUEST,
	payload: true,	
})

const getLoginHistoryError = (error) => ({
	type: GET_LOGIN_HISTORY_ERROR,
	payload: error,
})

const getLoginHistorySuccess = (logins) => ({
	type: GET_LOGIN_HISTORY_SUCCESS,
	payload: logins,
})

const getLoginHistoryFetch = async() => {
	let response = await API('/Dashboard/GetLoginHistory?Id=' + localStorage.getItem('id'))
	return response
}

export const getLoginHistory = () => {
	return dispatch => {
		dispatch(getLoginHistoryRequest)
		let amount = 10
		let res = getLoginHistoryFetch()
		.then(res => {
			let logins = res.data.slice(0, amount)
			logins.forEach((login, i) => {
				let datetime = login.loginTime.split("T")
				let date = datetime[0].split("-")
				let time = datetime[1].split(":")
				logins[i] = {
					...logins[i],
					date: date[2] + "." + date[1],
					time: time[0] + ":" + time[1],
				}
			})
			dispatch(getLoginHistorySuccess(logins))
		}).catch(error => {
			dispatch(getLoginHistoryError({
				type: "server",
				message: error.message,
			}))
		})
	}
}