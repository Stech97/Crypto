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
import {
	GetNewsAction,
	PatchNewsAction,
	DeleteNewsAction,
} from "../../actions/news";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexGrow: 1,
		width: "100%",
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "100%",
		},
	},
	accordion: {
		width: "100%",
	},
}));

const renderTextField = ({
	label,
	placeholder,
	input,
	meta: { touched, invalid, error },
	...custom
}) => (
	<Grid component={Box} item container xs={12}>
		<TextField
			placeholder={placeholder}
			error={touched && invalid}
			helperText={touched && error}
			required={true}
			{...input}
			{...custom}
		/>
	</Grid>
);
const required = (value) => (value ? undefined : "Required");

function Post(props) {
	const {
		handleSubmit,
		invalid,
		pristine,
		reset,
		submitting,
		header,
		description,
		body,
	} = props;

	const [state, setState] = useState({
		header,
		description,
		body,
	});

	const classes = useStyles();

	const submit = (values) => {
		props.UpdateAction();
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
					<Grid container xs={12}>
						<Typography>{header}</Typography>
					</Grid>
					<Grid container xs={12}>
						<Typography>{description}</Typography>
					</Grid>
					<Grid container xs={12}>
						<Typography>{body}</Typography>
					</Grid>
					<Grid container xs={12}>
						<IconButton aria-label="delete">
							<DeleteIcon
								onClick={() => props.DeleteAction(header)}
							/>
						</IconButton>
					</Grid>
				</AccordionSummary>
				<AccordionDetails className={classes.details}>
					<Grid component={Box} item container xs={12}>
						<Field
							component={renderTextField}
							name="header"
							label="Title"
							placeholder={header}
							multiline
							rowsMax={4}
							variant="outlined"
							validate={required}
							defaultValue={header}
						/>
						<Field
							component={renderTextField}
							name="description"
							label="Description"
							placeholder={description}
							multiline
							rowsMax={4}
							variant="outlined"
							validate={required}
							defaultValue={description}
						/>
						<Field
							component={renderTextField}
							name="body"
							label="Text"
							placeholder={body}
							multiline
							rowsMax={4}
							variant="outlined"
							validate={required}
							defaultValue={body}
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
	UpdateAction: (data) => dispatch(PatchNewsAction(data)),
	GetAction: () => dispatch(GetNewsAction()),
	DeleteAction: (data) => dispatch(DeleteNewsAction(data)),
});

Post = connect(mapStateToProps, mapDispatchToProps)(Post);

export default reduxForm({
	form: "Post",
})(Post);
