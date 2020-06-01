import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { formReducer } from '../comingsoon/reducers/comingsoon'
import { sidebarReducer } from '../dashboard/reducers/Sidebar'
import { routerReducer } from 'react-router-redux'

export const rootReducer = combineReducers({
	form: reduxFormReducer, // mounted under "form"
	ComingSoon: formReducer,
	routing: routerReducer,
	Dashboard: sidebarReducer, 
})
