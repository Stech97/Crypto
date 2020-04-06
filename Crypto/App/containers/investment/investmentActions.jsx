import { GET_INVESTMENT_SUCCESS, GET_INVESTMENT_ERROR, DELETE_INVESTMENT_SUCCESS, DELETE_INVESTMENT_ERROR } from './investmentConstants.jsx'
import AuthHelper from '../../Utils/authHelper'
import "isomorphic-fetch"

export function getInvestments(pageIndex = 0) {
    return (dispatch) => {
        let queryTrailer = '?pageIndex=' + pageIndex;
        fetch(window.constants.investPage + queryTrailer)
            .then((response) => {
                return response.json()
            }).then((data) => {
                dispatch({ type: GET_INVESTMENT_SUCCESS, payload: data });
            }).catch((ex) => {
                dispatch({ type: GET_INVESTMENT_ERROR, payload: ex });
            });
    }
}

export function deleteInvestment(investmentId, returnPageIndex) {
    return (dispatch) => {
        let token = AuthHelper.getToken();
        fetch(window.constants.investments + '?investmentId=' + investmentId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            if (response.ok) {
                dispatch({ type: DELETE_INVESTMENT_SUCCESS });
                getInvestments(returnPageIndex)(dispatch);
            } else {
                alert('Ошибка удаления записи');
                dispatch({ type: DELETE_INVESTMENT_ERROR, payload: 'Ошибка удаления записи' });
            }
        }).catch((ex) => {
            dispatch({ type: DELETE_INVESTMENT_ERROR, payload: ex });
        });
    }
}
