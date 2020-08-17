import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { getRefs } from "../../actions/getRefs";
import { fileNames, GetFile } from "../../actions/files";

import { makeStyles } from "@material-ui/core/styles";

const lightBlue = "#16428d";

const WhiteboxStyles = makeStyles((theme) => ({
	whitebox: {
		boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
		border: "1px solid #efefef",
		backgroundColor: "#ffffff",
		borderRadius: "2vw",
		margin: "8px",
		color: lightBlue,
		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem",
		},
		[theme.breakpoints.down("xs")]: {
			"& h6": {
				fontSize: "10px",
			},
		},
	},

	row: {
		[theme.breakpoints.down("sm")]: {
			borderBottom: "1px solid #efefef",
			"&:last-child": {
				borderBottom: "none",
			},
		},
	},
	link: {
		textDecoration: "none",
		color: "#16428d",
	},
}));

function Links(props) {
	const [state, setState] = useState({ refId: "", refString: "" });
	const { Refs, files } = props;

	useEffect(() => {
		props.getRefsAction();
		props.GetAction(fileNames[1]);
		props.GetAction(fileNames[6]);
		props.GetAction(fileNames[7]);
	}, [files[fileNames[1]].file === null]);

	const classes = WhiteboxStyles();
	return (
		<Grid xs={12} item container spacing={2} justify="center">
			<Grid
				xs={12}
				item
				container
				justify="center"
				spacing={2}
				direction="row"
				className={classes.whitebox}
			>
				<Grid item xs={12} md={6} className={classes.row}>
					<Typography variant="h6" align="center">
						{"REF Link https://defima.io/referal/" +
							(Refs.refs !== null && Refs.refs.refId)}
					</Typography>
				</Grid>
				<Grid item xs={12} md={6} className={classes.row}>
					<Typography variant="h6" align="center">
						{"REF Link https://defima.io/referal/" +
							(Refs.refs !== null && Refs.refs.refString)}
					</Typography>
				</Grid>
			</Grid>
			<Grid
				xs={12}
				item
				container
				justify="center"
				spacing={2}
				direction="row"
				className={classes.whitebox}
			>
				<Grid
					container
					justify="center"
					item
					xs={12}
					md={4}
					className={classes.row}
				>
					{files[fileNames[1]].file === null ? (
						<Typography variant="h6" align="center">
							Business Presentation PDF
						</Typography>
					) : (
						<Typography
							className={classes.link}
							component="a"
							href={URL.createObjectURL(files[fileNames[1]].file)}
							download={`${fileNames[1]}.${
								files[fileNames[1]].file.type
							}`}
							variant="h6"
							align="center"
						>
							Business Presentation PDF
						</Typography>
					)}
				</Grid>
				<Grid
					container
					justify="center"
					item
					xs={12}
					md={4}
					className={classes.row}
				>
					{files[fileNames[6]].file === null ? (
						<Typography variant="h6" align="center">
							Image Video
						</Typography>
					) : (
						<Typography
							className={classes.link}
							component="a"
							href={URL.createObjectURL(files[fileNames[6]].file)}
							download={`${fileNames[6]}.${
								files[fileNames[6]].file.type
							}`}
							variant="h6"
							align="center"
						>
							Image Video
						</Typography>
					)}
				</Grid>
				<Grid
					container
					justify="center"
					item
					xs={12}
					md={4}
					className={classes.row}
				>
					{files[fileNames[7]].file === null ? (
						<Typography variant="h6" align="center">
							Tutorial PDF
						</Typography>
					) : (
						<Typography
							className={classes.link}
							component="a"
							href={URL.createObjectURL(files[fileNames[7]].file)}
							download={`${fileNames[7]}.${
								files[fileNames[7]].file.type
							}`}
							variant="h6"
							align="center"
						>
							Tutorial PDF
						</Typography>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
}

const mapStateToProps = (store) => {
	return {
		Refs: store.Refs,
		files: store.files,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getRefsAction: () => dispatch(getRefs()),
		GetAction: (name) => dispatch(GetFile(name)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Links);
