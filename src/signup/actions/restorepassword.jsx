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

const changePasswordPost = async({data, id}) => {
	let response = await API('/Identity/RecoveryPassword?Id=' + id, 'post', data)
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
			if (res.status === 200) {
				console.log('RESULT: ####',res)
				localStorage.setItem('id', res.data.id)
				let change = changePasswordPost({
					data: {
						username: res.data.username,
						password: data.password,
						ConfirmPassword: data.password2
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
			} else if (res.status === 204) {
				dispatch(restorePasswordError({
					type: 'link',
					message: 'Link has expired',
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