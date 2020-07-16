import React, { Component } from "react";
import FooterForm from "./FooterForm";
import { connect } from "react-redux";
import { footerForm } from "../../actions/FooterForm";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	header: {
		color: "#fff",
		fontWeight: "500",
	},
}));

function FooterNewsletter(props) {
	const classes = useStyles();
	const { footerForm } = props;
	return (
		<Grid justify="flex-start" item container xs={12} md={3}>
			<Typography className={classes.header} variant="h5">
				Newsletter
			</Typography>
			<FooterForm
				placeholder="maxmutter@hotmail.com"
				visibility={footerForm.error.type === "done"}
				data={footerForm}
				sendAction={props.footerFormAction}
			/>
			{footerForm.error.type === "done" && (
				<Typography className={classes.header} variant="h5">
					Thank you for your subscription
				</Typography>
			)}
		</Grid>
	);
}

const mapStateToProps = (store) => {
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
