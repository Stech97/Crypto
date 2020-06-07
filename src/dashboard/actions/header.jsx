import { API } from '../../config'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'

const getUserInfo = async() => {
		let resp = await API('/Identity/token', 'post', {
			"username" : "Username",
			"password": "Username",
			"IP": "88.11.22.33",
			"Country": "Russia"
		})
		console.log(resp)
	return resp.data.username;
}

export const setUser = (username) => {
	return dispatch => {
		dispatch({
			type: GET_USER_REQUEST,
			payload: "Loading...",
		})

		let username = getUserInfo()
		.then(username => {
			dispatch({
				type: GET_USER_SUCCESS,
				payload: username,
			})	
		})
	}
}