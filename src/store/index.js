import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import { dashInfoReducer } from "../pages/account/reducers/dashinfo"

export const rootReducer = combineReducers({
	form: reduxFormReducer, // mounted under "form"
	routing: routerReducer,
	DashInfo: dashInfoReducer,
});
