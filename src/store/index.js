import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { loginReducer } from "../login/reducers/login";
import { signupReducer } from "../signup/reducers/signup";
import { formReducer } from "../comingsoon/reducers/comingsoon";
import { forgotPasswordReducer } from "../signup/reducers/forgotpassword";
import { routerReducer } from "react-router-redux";
import { dashHeaderReducer } from "../dashboard/reducers/header";
import { BalanceReducer } from "../dashboard/reducers/contentBalance";
import { BTCRateReducer } from "../dashboard/reducers/ContentBalanceBTC";
import { USDRateReducer } from "../dashboard/reducers/ContentBalanceUSD";
import { DETRateReducer } from "../dashboard/reducers/ContentBalanceDET";
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
	ContentBalanceContainer: BalanceReducer,
	BTCSquare: BTCRateReducer,
	USDSquare: USDRateReducer,
	DETSquare: DETRateReducer,
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
});
