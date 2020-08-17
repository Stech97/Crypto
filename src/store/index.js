import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { loginReducer } from "../login/reducers/login";
import { signupReducer } from "../signup/reducers/signup";
import { formReducer } from "../comingsoon/reducers/comingsoon";
import { forgotPasswordReducer } from "../signup/reducers/forgotpassword";
import { routerReducer } from "react-router-redux";
import { dashHeaderReducer } from "../dashboard/reducers/header";
import { BalanceReducer } from "../dashboard/reducers/contentBalance";
import { NewsReducer } from "../dashboard/reducers/news";
import { loginHistoryReducer } from "../dashboard/reducers/loginHistory";
import { ExchangeReducer } from "../dashboard/reducers/ExchangeForm";
import { RefsReducer } from "../dashboard/reducers/RefLinks";
import { EarningsReducer } from "../dashboard/reducers/contentEarnings";
import { FooterFormReducer } from "../main/reducers/FooterForm";
import { InvestPopupReducer } from "../dashboard/reducers/investForm";
import { teamTableReducer } from "../dashboard/reducers/teamTable";
import { investmentTableReducer } from "../dashboard//reducers/investmentTable";
import { historyTableReducer } from "../dashboard/reducers/historyTable";
import { teamPopupReducer } from "../dashboard/reducers/teamPopup";
import { changePasswordReducer } from "../dashboard/reducers/changePassword";
import { userInfoReducer } from "../dashboard/reducers/AccountInfo";
import { KYCReducer } from "../dashboard/reducers/kyc";
import { AddFundsReducer } from "../dashboard/reducers/CashBTC";
import { WithdrawReducer } from "../dashboard/reducers/withdraw";
import { MainpageReducer } from "../main/reducers/mainpage";
import { FileReducer } from "../dashboard/reducers/files";

export const rootReducer = combineReducers({
	form: reduxFormReducer, // mounted under "form"
	routing: routerReducer, // routing

	ComingSoon: formReducer,
	footerForm: FooterFormReducer,

	login: loginReducer,
	createUser: signupReducer,
	forgot: forgotPasswordReducer,

	changePassword: changePasswordReducer,

	user: dashHeaderReducer,
	userInfo: userInfoReducer,
	Balance: BalanceReducer,
	News: NewsReducer,
	loginHistory: loginHistoryReducer,
	Exchange: ExchangeReducer,
	Refs: RefsReducer,
	Earnings: EarningsReducer,
	InvestPopup: InvestPopupReducer,
	TeamTable: teamTableReducer,
	investmentTable: investmentTableReducer,
	historyTable: historyTableReducer,
	teamPopupTable: teamPopupReducer,
	kyc: KYCReducer,
	addfunds: AddFundsReducer,
	withdraw: WithdrawReducer,
	Mainpage: MainpageReducer,
	files: FileReducer,
});
