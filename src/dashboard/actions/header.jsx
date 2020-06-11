import { API } from '../../config'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'

const getUserInfo = async() => {
		let resp = await API('/Identity/GetUser?Id='+localStorage.getItem('id'))
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