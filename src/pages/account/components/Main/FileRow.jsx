import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { GetFile, UpdateFile } from "../../actions/files";
import { connect } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	input: {
		display: "none",
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
}));

function FileRow(props) {
	const classes = useStyles();
	const { name, data } = props;

	const [file, setFile] = useState(null);

	useEffect(() => {
		props.GetAction();
	}, [data.file === null]);

	const onFileChange = (e) => {
		e.preventDefault();
		// Update the state
		let reader = new FileReader();
		let file = e.target.files[0];
		let id = e.target.id;
		const formData = new FormData();
		formData.append(id, file);
		setFile(formData);
	};

	const FileUpload = () => {
		props.UpdateAction(file);
		props.GetAction();
	};

	return (
		<Grid
			container
			spacing={3}
			container
			direction="row"
			justify="center"
			alignItems="flex-start"
		>
			<Grid item xs={3}>
				<Typography
					className={classes.title}
					variant="h5"
					component="p"
					gutterBottom
				>
					{name}
				</Typography>
			</Grid>
			<Grid item xs={3}>
				{data.file === null ? (
					<Typography>No File Uploaded</Typography>
				) : (
					<Button
						variant="contained"
						color="primary"
						component="a"
						href={URL.createObjectURL(data.file)}
						download={`${name}.${data.file.type}`}
					>
						View current
					</Button>
				)}
			</Grid>
			<Grid item xs={3}>
				<label htmlFor="contained-button-file">
					<input
						accept="*"
						className={classes.input}
						id="contained-button-file"
						multiple
						type="file"
						onChange={onFileChange}
					/>
					<Button variant="contained" color="grey" component="span">
						Select file
					</Button>
				</label>
			</Grid>
			<Grid item xs={3}>
				<Button
					disabled={file === null}
					variant="contained"
					color="secondary"
					onClick={FileUpload}
				>
					Apply
				</Button>
			</Grid>
		</Grid>
	);
}

const mapStateToProps = (state, props) => ({
	data: state.files[props.name],
});

const mapDispatchToProps = (dispatch, state) => ({
	GetAction: () => dispatch(GetFile(state.name)),
	UpdateAction: (file) => dispatch(UpdateFile(file, state.name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileRow);
