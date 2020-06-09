import { API } from '../../config'
import axios from 'axios'
import { useHistory } from "react-router-dom";

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR'

const loginUser = userObj => ({
	type: USER_LOGIN_SUCCESS,
	payload: userObj,	
})

const getUserInfo = async(user) => {
	axios.get('https://api.ipify.org?format=json', { mode: 'cors' })
		.then((req) => axios.get('https://ipinfo.io/' + req.data.ip + '/?token=7a04a322ea8440'))
		.then((res) => {
		let resp = API('/Identity/token', 'post', {
			"username" : user.username,
			"password": user.password,
			"IP": res.data.ip,
			"Country": res.data.country
		})
		console.log(resp)
		return resp.data;
		}).catch((error) => {
			return error
		})
}

export const userPostFetch = async(user) => {
	return dispatch => {
		user = getUserInfo(user)
		if (user.id) {
			localStorage.setItem("token", user.token)
	        dispatch(loginUser(user))
	        let history = useHistory()
	        history.push('/dashboard')
	    } else {
	    	dispatch({
	    		type: USER_LOGIN_ERROR,
	    		payload: user
	    	})
	    }
	}
}
