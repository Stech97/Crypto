import { API, DOMAIN_URL } from '../../config'
import emailjs from 'emailjs-com'

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR'

const forgotPasswordSuccess = () => ({
	type: FORGOT_PASSWORD_SUCCESS,
	payload: false
})

const forgotPasswordRequest = () => ({
	type: FORGOT_PASSWORD_REQUEST,
	payload: "Loading..."
})

const forgotPasswordError = error => ({
	type: FORGOT_PASSWORD_ERROR,
	payload: error
})

const forgotPasswordPost = async(data) => {
	let response = await API('/Identity/ForgotPassword', 'post', data)
	return response
}

const forgotPasswordLink = async(data) => {
	let confirmLink = DOMAIN_URL + '/restorePassword/' + data.hash
	let response = emailjs.send(
		'gmail',
		'confirmEmail',
		{
			to_name: "User",
			message_html: confirmLink,
			send_to: data.email
		},
		'user_jIExVfMX1Oha7HaXMmsBs'
	)
	return response
}

export const forgotPassword = data => {
	return dispatch => {
		dispatch(forgotPasswordRequest())

		let res = forgotPasswordPost({
			username: data.username,
			email: data.email,
		}).then(res => {
			if (res.data) {
				if (res.data.status === 'Ok') {
					let mail = forgotPasswordLink({
						hash: res.data.hash,
						email: res.data.email,
					}).then(mail => {
						dispatch(forgotPasswordSuccess())
					}).catch(error => {
						dispatch(forgotPasswordError({
							type: 'mail',
							message: error.message,
						}))
					})
				} else if (res.data.status === 'No found') { 
					dispatch(forgotPasswordError({
						type: 'incorrect data',
						message: 'Email or username not found'
					}))
				} else {
					dispatch(forgotPasswordError({
						type: 'unknown',
						message: 'Email or username not found'
					}))
				}
			} else {
				dispatch(forgotPasswordError({
					type: 'server',
					message: res,
				}))
			}
		}).catch(error => {
			dispatch(forgotPasswordError({
				type: 'server',
				message: error.message,
			}))
		})
	}
}