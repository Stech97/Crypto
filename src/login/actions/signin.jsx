import { API } from '../../config'
import axios from 'axios'
import React from 'react'

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR'

const loginUserSuccess = userObj => ({
	type: USER_LOGIN_SUCCESS,
	payload: userObj,	
})

const loginUserError = error => ({
	type: USER_LOGIN_ERROR,
	payload: error,
})

export const userPostFetch = user => {
	return dispatch => {
		dispatch({
			type: USER_LOGIN_REQUEST,
			payload: "Loading...",
		})

		let IP = axios.get('https://api.ipify.org?format=json', { mode: 'cors' })
		.then(req => axios.get('https://ipinfo.io/' + req.data.ip + '/?token=7a04a322ea8440'))
		.then(res => {
			let resp = API('/Identity/token', 'post', {
				"username" : user.username,
				"password": user.password,
				"IP": res.data.ip,
				"Country": res.data.country
			}).then(res => {
				console.log(res)
				let userObj = {
					id: res.data.id,
					username: res.data.username,
					firstname: res.data.firstName,
					lastname: res.data.lastName,
					token: res.data.token,
					email: res.data.email,
					isVerified: res.data.isVerified,
				}
				localStorage.setItem("token", res.data.token)
				localStorage.setItem("Authed", true)
				localStorage.setItem("id", res.data.id)				
				dispatch(loginUserSuccess(userObj))
			}).catch(error => {
				dispatch(loginUserError({type: error.status, message: 'Wrong username or password' }))
				localStorage.setItem("Authed", false)
			})
		}).catch(error => {
			dispatch(loginUserError({type: error.status, message: error.message }))
			localStorage.setItem("Authed", false)
		})
	}
}
