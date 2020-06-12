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
		let res = confirmEmailGet(hash.hash)
		.then(res => {
			if (res.ok) {
				console.log(res)
				switch(res.data.status) {
					case 'Ok':
						dispatch(confirmEmailSuccess(true))
						break
					case 'No login':
						dispatch(confirmEmailSuccess(true))
						break
					case 'No user':
						localStorage.removeItem('hash')
						dispatch(confirmEmailError({
							type: 'user',
							message: 'Link has expired'
						}))
						break
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
