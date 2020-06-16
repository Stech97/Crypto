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

const changePasswordPatch = async({data, id}) => {
	let response = await API('/Identity/RecoveryPassword?Id=' + id, 'patch', data)
	return response
}

const acceptPasswordGet = async(hash) => {
	let response = await API('/Identity/AcceptForgot?Id=' + hash)
	return response
}

export const restorePassword = data => {
	return dispatch => {
		dispatch(restorePasswordRequest())
		
		let response = acceptPasswordGet(data.hash)
		.then(res => {
			switch (res.data.status) {
				case 'Ok':
					if (data.password === data.password2) {
						console.log('RESULT: ####',res)
						localStorage.setItem('token', res.data.token)
						localStorage.setItem('id', res.data.id)
						let change = changePasswordPatch({
							data: {
								username: res.data.username,
								password: data.password,
							},
							id: res.data.id,
						}).then(resp => {
							dispatch(restorePasswordSuccess())
						}).catch(error => {
							dispatch(restorePasswordError({
								type: 'server',
								error: error.message,
							}))
						})
						break
					} else {
						dispatch(restorePasswordError({
							type: 'password2',
							message: 'Passwords must match!'
						}))
					}
				case 'Not found':
					dispatch(restorePasswordError({
						type: 'not found',
						message: 'Link has expired'
					}))
					break
				default:
					dispatch(restorePasswordError({
						type: 'Unknown',
						message: 'Link has expired'
					}))
			}
		}).catch(error => {
			dispatch(restorePasswordError({
				type: 'server accept forgot',
				message: error.message,
			}))
		})
	}
}