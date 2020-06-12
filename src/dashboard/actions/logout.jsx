import { API } from '../../config'

export const GET_LOGOUT_REQUEST = 'GET_LOGOUT_REQUEST'
export const GET_LOGOUT_SUCCESS = 'GET_LOGOUT_SUCCESS'
export const GET_LOGOUT_ERROR = 'GET_LOGOUT_ERROR'

const getLogoutSuccess = () => ({
	type: GET_LOGOUT_SUCCESS,
	payload: false
})

const getLogoutRequest = () => ({
	type: GET_LOGOUT_REQUEST,
	payload: "Loading..."
})

const getLogoutError = error => ({
	type: GET_LOGOUT_ERROR,
	payload: error
})

export const userLogoutGet = ID => {
	return dispatch => {
		dispatch(getLogoutRequest())

		let response = API('/Identity/SignOut?Id='+ID)
		.then(response => {
			localStorage.removeItem('token')
			localStorage.removeItem('Authed')
			localStorage.removeItem('id')
			dispatch(getLogoutSuccess())
		})
		.catch(error => dispatch(getLogoutError(error.message)))
	}
}