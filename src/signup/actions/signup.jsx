import { API } from '../../config'
import emailjs from 'emailjs-com'

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR'

const validateEmail = (check) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  	return re.test(String(check).toLowerCase())
}

const validateLogin = (login) => {
	const re = /^[a-zA-z]{1}[a-zA-Z1-9]{3,20}$/
	return re.test(String(login))
}

const validatePassword = (password) => {
	/* Описываем, что должно быть в пароле, с меткой НЕ (^). 
	По уму, эту строку надо вынести из функции в глобальную область, чтобы регулярное выражение создавалось только
	 один раз, будет шустрее.
	*/
	var r=/[^A-Z-a-z-0-9]/g; 
	var error = ""
	if(r.test(password)){
		error = "Only latin symbols and numbers allowed!";
	  	return (error);
	}
	if (password.length<6){
	  	error = "At least 6 symbols!";
	  	return (error);
	}
	if (password.length>20){
	  	error = "Max 20 symbols!";
	  	return (error);
	}
	return(true);
}

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

const checkUserGetFetch = async(user) => {
	let response = await API('/Identity/CheckInfo', 'post', user)
	return response
}

const createUserPostRequest = async(user) => {
	let response = await API('/Identity/CreateLogin', 'post', user)
	console.log(response)
	return response
}

export const createUserPostFetch = values => {
	return dispatch => {
		if (validateLogin(values.username)) {
			if (validateEmail(values.email)) {
				let response = checkUserGetFetch({
					Username: values.username,
					Email: values.email
				}).then(response => {
					console.log(response)
					if (response.data) {
						if (response.data.username) {
							dispatch(createUserError({
								type: 'username',
								message: 'Username is already used. Try another.'
							}))
						} else {
							dispatch(createUserError({
								type: 'email',
								message: 'Email is already used. Try another.'
							}))
						}
					} else {
						if (!validatePassword(values.password)) {
							dispatch(createUserError({
								type: 'password',
								message: validatePassword(values.password),
							}))
						} else if (!(values.password == values.password2)) {
							dispatch(createUserError({
								type: 'password2',
								message: 'Passwords must match!',
							}))
						} else {
							let userObj = {
								username: values.username,
								password: values.password,
								Email: values.email,
								FirstName: values.firstname,
								LastName: values.lastname,
							}
							let response = createUserPostRequest(userObj)
							.then(response => {
								let confirmLink = 'https://defima.io/confirmEmail/'+response.data.hash
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
							}).catch(error => {
								dispatch(createUserError({ type: 'server', message: error.message }))
							})	
						}
					}
				}).catch(error => {
					dispatch(createUserError({ type: 'server', message: error.message }))
				})
			} else {
				dispatch(createUserError({ type: 'email', message: 'Email is wrong' }))
			}
		} else {
			dispatch(createUserError({ type: 'username', message: 'Username is wrong' }))
		}
	}
}