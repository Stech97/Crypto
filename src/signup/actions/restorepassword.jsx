import { API } from '../../config'
import emailjs from 'emailjs-com'

export const RESTORE_PASSWORD_REQUEST = 'RESTORE_PASSWORD_REQUEST'
export const RESTORE_PASSWORD_SUCCESS = 'RESTORE_PASSWORD_SUCCESS'
export const RESTORE_PASSWORD_ERROR = 'RESTORE_PASSWORD_ERROR'

const restorePasswordSuccess = () => ({
	type: RESTORE_PASSWORD_SUCCESS,
	payload: false
})

const restorePasswordRequest = () => ({
	type: RESTORE_PASSWORD_REQUEST,
	payload: "Loading..."
})

const restorePasswordError = error => ({
	type: RESTORE_PASSWORD_ERROR,
	payload: error
})

const changePasswordPatch = async(data) => {
	let response = await API('/Identity/ChangePassword?Id=' + data.id, 'post', data)
	return response
}

const acceptPasswordGet = async(hash) => {
	let response = await API('https://defima.io/AcceptForgot?Id=' + hash)
	return response
}

export const restorePassword = data => {
	return dispatch => {
		dispatch(restorePasswordRequest())
		
		let response = acceptPasswordGet(data.hash)
		.then(res => {
			switch (res.data.status) {
				case 'Ok':
					let change = changePasswordPatch()
					break
				case 'No found':
					dispatch(restorePasswordError({
						type: 'not found',
						message: 'Link has expired'
					}))
					break
				default:
					dispatch(restorePasswordError({
						type: 'not found',
						message: 'Link has expired'
					}))
			}
		}).catch(error => {
			dispatch(restorePasswordError({
				type: 'server',
				message: error.message,
			}))
		})


		let res = changePasswordPost({
			username: data.username,
			email: data.password,
		}).then(res => {
			
		}).catch(error => {
			dispatch(restorePasswordError({
				type: 'server',
				message: error.message,
			}))
		})
	}
}