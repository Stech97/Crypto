import { API } from '../../config'

export const CONFIRM_EMAIL_REQUEST = 'CONFIRM_EMAIL_REQUEST'
export const CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS'
export const CONFIRM_EMAIL_ERROR = 'CONFIRM_EMAIL_ERROR'

const confirmEmailGet = async(hash) => {
	let response = await API('/Identity/ConfirmEmail?Id=' + hash)
	return response
}

const confirmEmailSuccess = isVerified => ({
	type: CONFIRM_EMAIL_SUCCESS,
	payload: isVerified,
})

const confirmEmailError = error => ({
	type: CONFIRM_EMAIL_ERROR,
	payload: error,
})

const confirmEmailRequest = () => ({
	type: CONFIRM_EMAIL_REQUEST,
	payload: "Loading...",
})

export const confirmEmail = hash => {
	return dispatch => {
		dispatch(confirmEmailRequest)
		let res = confirmEmailGet(hash)
		.then(res => {
			console.log(res)
			if (res.ok) {
				console.log("ЧЕ ЗА ХУЙНЯ???")
			} else {
				switch (res.error.status) {
					case 400:
						dispatch(confirmEmailError({
							type: 'user',
							message: 'Link has expired',
						}))
						break
					case 404:
						dispatch(confirmEmailSuccess(true))
						break
					default:
						dispatch(confirmEmailError({
							type: 'server',
							message: 'Unknown error',
						}))
				}
			}
		}).catch(error => {
			console.log(error)
			dispatch(confirmEmailError({
				type: 'server',
				message: error.message,
			}))
		})
	}
}
