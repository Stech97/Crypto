import { GET_INVESTMENT_SUCCESS, GET_INVESTMENT_ERROR, DELETE_INVESTMENT_SUCCESS, DELETE_INVESTMENT_ERROR } from './investmentConstants.jsx'

const initialState = {
    data: { currentPage: 0, totalPages: 0, pageSize: 0, records: [] },
    error: ''
}

export default function investment(state = initialState, action) {
    switch (action.type) {
        case GET_INVESTMENT_SUCCESS:
            return { ...state, data: action.payload, error: '' }

        case GET_INVESTMENT_ERROR:
            return { ...state, error: action.error }

        case DELETE_INVESTMENT_SUCCESS:
            return { ...state }

        case DELETE_INVESTMENT_ERROR:
            return { ...state, error: action.error }

        default:
            return state;
    }
}