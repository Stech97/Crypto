import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import { Field, reduxForm } from "redux-form";
import { GetNewsAction, AddNewsAction } from "../../actions/news";
import { connect } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 650,
	},
	root: {
		display: "flex",
		flexGrow: 1,
		width: "100%",
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "100%",
		},
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	icon: {
		verticalAlign: "bottom",
		height: 20,
		width: 20,
	},
	details: {
		alignItems: "center",
	},
	column: {
		flexBasis: "33.33%",
	},
	helper: {
		borderLeft: `2px solid ${theme.palette.divider}`,
		padding: theme.spacing(1, 2),
	},
	link: {
		color: theme.palette.primary.main,
		textDecoration: "none",
		"&:hover": {
			textDecoration: "underline",
		},
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	accordion: {
		width: "100%",
	},
}));

const renderTextField = ({
	label,
	input,
	meta: { touched, invalid, error },
	...custom
}) => (
	<Grid component={Box} item container xs={12}>
		<TextField
			label={label}
			placeholder={label}
			error={touched && invalid}
			helperText={touched && error}
			required={true}
			{...input}
			{...custom}
		/>
	</Grid>
);
const required = (value) => (value ? undefined : "Required");

function AddPost(props) {
	const classes = useStyles();
	const theme = useTheme();
	const { handleSubmit, invalid, pristine, reset, submitting } = props;

	const submit = (values) => {
		props.AddAction({
			header: values.header,
			body: values.body,
			description: values.description,
		});
		props.GetAction();
	};

	return (
		<Grid
			item
			container
			xs={12}
			component="form"
			className={classes.root}
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit(submit)}
		>
			<Accordion className={classes.accordion} defaultExpanded={false}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1c-content"
					id="panel1c-header"
				>
					<div className={classes.column}>
						<Chip color="secondary" label="Add News" />
					</div>
				</AccordionSummary>
				<AccordionDetails className={classes.details}>
					<Grid component={Box} item container xs={12}>
						<Field
							component={renderTextField}
							name="header"
							label="Title"
							multiline
							rowsMax={4}
							variant="outlined"
							validate={required}
						/>
						<Field
							component={renderTextField}
							name="description"
							label="Description"
							multiline
							rowsMax={4}
							variant="outlined"
							validate={required}
						/>
						<Field
							component={renderTextField}
							name="body"
							label="Text"
							multiline
							rowsMax={4}
							variant="outlined"
							validate={required}
						/>
					</Grid>
				</AccordionDetails>
				<Divider />
				<AccordionActions>
					<Button
						size="small"
						type="button"
						disabled={pristine || submitting}
						onClick={reset}
					>
						Cancel
					</Button>
					<Button
						size="small"
						type="submit"
						disabled={invalid || pristine || submitting}
						color="secondary"
					>
						Apply
					</Button>
				</AccordionActions>
			</Accordion>
		</Grid>
	);
}

const mapStateToProps = (state) => ({
	News: state.News,
});

const mapDispatchToProps = (dispatch) => ({
	AddAction: (data) => dispatch(AddNewsAction(data)),
	GetAction: () => dispatch(GetNewsAction()),
});

AddPost = connect(mapStateToProps, mapDispatchToProps)(AddPost);

export default reduxForm({
	form: "AddPost",
})(AddPost);
