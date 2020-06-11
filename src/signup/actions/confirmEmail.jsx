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
	console.log(hash)
	return dispatch => {
		dispatch(confirmEmailRequest)
		let res = confirmEmailGet(localStorage.getItem('hash'))
		.then(res => {
			localStorage.removeItem('hash')
			if (res.ok) {
				console.log(res)
				switch(res.data.status) {
					case 'Ok':
						dispatch(confirmEmailSuccess(true))
					case 'No login':
						dispatch(confirmEmailSuccess(true))
					case 'No user':
						localStorage.removeItem('hash')
						dispatch(confirmEmailError({
							type: 'user',
							message: 'Link has expired'
						}))
					default:
						dispatch(confirmEmailError({
							type: 'server',
							message: 'Unknown error'
						}))

				}
			}
		}).catch(error => {
			dispatch(confirmEmailError({
				type: 'server',
				message: error.message,
			}))
		})
	}
}
