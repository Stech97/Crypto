import { API, DOMAIN_URL } from '../../config'
import emailjs from 'emailjs-com'

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR'

const createUserSuccess = userObj => ({
	type: CREATE_USER_SUCCESS,
	payload: userObj,
})

const createUserError = error => ({
	type: CREATE_USER_ERROR,
	payload: error,
})

const createUserRequest = () => ({
	type: CREATE_USER_REQUEST,
	payload: "Loading...",
})

const createUserPostRequest = async(user) => {
	let response = await API('/Identity/CreateLogin', 'post', user)
	console.log(response)
	return response
}

export const createUserPostFetch = values => {
	return dispatch => {
		dispatch(createUserRequest)

		let userObj = {
			username: values.username,
			password: values.password,
			ConfirmPassword: values.password2,
			Email: values.email,
			FirstName: values.firstname,
			LastName: values.lastname,
		}
		let response = createUserPostRequest(userObj)
		.then(response => {
			console.log(response)
			if (response.ok) {
				let confirmLink = DOMAIN_URL + '/confirmEmail/'+response.data.hash  // TODO
				emailjs.send(
					'gmail',
					'confirmEmail',
					{
						to_name: values.firstname + " " + values.lastname,
						message_html: confirmLink,
						send_to: values.email
					},
					'user_jIExVfMX1Oha7HaXMmsBs'
				)
				.then((userObj, res) => {
					dispatch(createUserSuccess(userObj))
				}).catch(error => {
					dispatch(createUserError({ type: 'confirmEmail', message: error.message }))
				})	
			} else {
				dispatch(createUserError({ type: 'user', message: 'User exists!' }))
			}
		}).catch(error => {
			dispatch(createUserError({ type: error.status, message: error.message }))
		})	
	}
}