import React, { Component } from "react";
import FooterForm from "./FooterForm";
import { connect } from "react-redux";
import { footerForm } from "../../actions/FooterForm";

class FooterNewsletter extends Component {
	render() {
		const { footerForm } = this.props;
		return (
			<div className="footer-newsletter">
				<div className="footer-newsletter-header">
					<h2>Newsletter</h2>
				</div>
				<FooterForm
					placeholder="maxmutter@hotmail.com"
					visibility={footerForm.error.type === "done"}
					data={footerForm}
					sendAction={(email) => this.props.footerFormAction(email)}
				/>
				<div
					className={
						footerForm.error.type === "done"
							? "footer-newsletter-thanks"
							: "none"
					}
				>
					<h3>Thank you for your subscription!</h3>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (store) => {
	console.log(store);
	return {
		footerForm: store.footerForm,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		footerFormAction: (email) => dispatch(footerForm(email)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterNewsletter);
