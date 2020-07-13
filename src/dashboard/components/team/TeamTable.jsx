import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTeamTable } from "../../actions/getTeamTable";
import TeamPopup from "./teamPopup";
import clsx from "clsx";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
	profit: {
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
		marginTop: "20px",
	},
	header: {
		position: "sticky",
		background: "linear-gradient(83deg, #123273 0%, #005c9f 100%)",
		"&>div": {
			color: "#fff",
		},
		"& h6": {
			color: "#fff",
		},
		"&>div>div:first-child": {
			borderTopLeftRadius: "2vw",
			[theme.breakpoints.down("sm")]: {
				borderTopLeftRadius: "1rem",
			},
		},
		"&>div>div:last-child": {
			borderTopRightRadius: "2vw",
			[theme.breakpoints.down("sm")]: {
				borderTopRightRadius: "1rem",
			},
		},
	},
	table: {
		boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
		marginBottom: "30px",
		borderRadius: "2vw",
		background: "transparent",

		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem 1rem 0 0",
		},
	},
	container: {
		overflow: "visible",
		borderRadius: "2vw",
		background: "transparent",

		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem 1rem 0 0",
		},
	},
	body: {
		maxHeight: "300px",
		overflow: "scroll",
		borderRadius: "2vw",
		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem",
		},
	},
	row: {
		position: "relative",
		borderRadius: "2vw",
		background: "transparent",

		background: "#fff",
		"&>div": {
			border: "none",
		},
		"& p": {
			color: "#838383",
		},
	},
	cell: {
		width: "calc(100% / 6)",
	},
	cell_start: {
		"&:nth-child(2)": {
			borderTopLeftRadius: "2vw",
		},
		"&:last-child": {
			borderTopRightRadius: "2vw",
		},
	},
	cell_end: {
		"&:nth-child(2)": {
			borderBottomLeftRadius: "2vw",
		},
		"&:last-child": {
			borderBottomRightRadius: "2vw",
		},
	},
	plus: {
		marginLeft: "-3rem",
		marginTop: "1rem",
		"&>div": {
			background: "#fff",
			width: "2rem",
			height: "2rem",
			display: "grid",
			alignItems: "center",
			justifyItems: "center",
			borderRadius: "5px",
			"&>svg": {
				fill: "#838383",
			},
		},
	},
}));

const MemberLevelRow = ({
	obj: {
		boxclass,
		level,
		members,
		totalInvested,
		profitsPaid,
		commission,
		totalEarning,
	},
}) => {
	return (
		<div className="team-table-content-row">
			<h5 className="team-table-content-row-l gray-text">
				{"Level " + level}
			</h5>
			<h5 className="team-table-content-row-m gray-text">{members}</h5>
			<h5 className="team-table-content-row-i gray-text">
				{(totalInvested / 1000).toFixed(3) + "k $"}
			</h5>
			<h5 className="team-table-content-row-p gray-text">
				{(profitsPaid / 1000).toFixed(3) + "k"}
			</h5>
			<h5 className="team-table-content-row-c gray-text">
				{commission * 100 + "%"}
			</h5>
			<h5 className="team-table-content-row-e gray-text">
				{(totalEarning / 1000).toFixed(3) + "k USD"}
			</h5>
		</div>
	);
};

function CustomTableRow(props) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const { row, type, level } = props;
	const classes = useStyles();
	if (row === 0) {
		return (
			<Fragment>
				<TableRow component="div" className={classes.row}>
					<div className={classes.plus}>
						<div>
							<AddIcon onClick={handleClickOpen} />
						</div>
					</div>
					<TableCell
						className={clsx(classes.cell, classes["cell_" + type])}
						component="div"
					>
						<Typography align="center" variant="body1">
							{"Level " + level}
						</Typography>
					</TableCell>
					<TableCell
						className={clsx(classes.cell, classes["cell_" + type])}
						component="div"
					>
						<Typography align="center" variant="body1">
							0
						</Typography>
					</TableCell>
					<TableCell
						className={clsx(classes.cell, classes["cell_" + type])}
						component="div"
					>
						<Typography align="center" variant="body1">
							0
						</Typography>
					</TableCell>
					<TableCell
						className={clsx(classes.cell, classes["cell_" + type])}
						component="div"
					>
						<Typography align="center" variant="body1">
							0
						</Typography>
					</TableCell>
					<TableCell
						className={clsx(classes.cell, classes["cell_" + type])}
						component="div"
					>
						<Typography align="center" variant="body1">
							0
						</Typography>
					</TableCell>
					<TableCell
						className={clsx(classes.cell, classes["cell_" + type])}
						component="div"
					>
						<Typography align="center" variant="body1">
							0
						</Typography>
					</TableCell>
				</TableRow>
			</Fragment>
		);
	} else {
		return (
			<Fragment>
				<TableRow component="div" className={classes.row}>
					<div className={classes.plus}>
						<div>
							<AddIcon onClick={handleClickOpen} />
						</div>
					</div>
					<TableCell
						className={clsx(classes.cell, classes["cell_" + type])}
						component="div"
					>
						<Typography align="center" variant="body1">
							{"Level " + level}
						</Typography>
					</TableCell>
					<TableCell
						className={clsx(classes.cell, classes["cell_" + type])}
						component="div"
					>
						<Typography align="center" variant="body1">
							{row.members}
						</Typography>
					</TableCell>
					<TableCell
						className={clsx(classes.cell, classes["cell_" + type])}
						component="div"
					>
						<Typography align="center" variant="body1">
							{row.totalInvested.toFixed(2)}
						</Typography>
					</TableCell>
					<TableCell
						className={clsx(classes.cell, classes["cell_" + type])}
						component="div"
					>
						<Typography align="center" variant="body1">
							{row.profitsPaid.toFixed(2)}
						</Typography>
					</TableCell>
					<TableCell
						className={clsx(classes.cell, classes["cell_" + type])}
						component="div"
					>
						<Typography align="center" variant="body1">
							{row.commission * 100 + "%"}
						</Typography>
					</TableCell>
					<TableCell
						className={clsx(classes.cell, classes["cell_" + type])}
						component="div"
					>
						<Typography align="center" variant="body1">
							{row.totalEarning.toFixed(2)}
						</Typography>
					</TableCell>
				</TableRow>
				<TeamPopup
					open={open}
					handleClose={handleClose}
					level={level}
				/>
			</Fragment>
		);
	}
}

function TeamTable(props) {
	useEffect(() => {
		props.teamTableAction();
	}, []);

	const { team } = props;

	const classes = useStyles();

	console.log("props.team.levels");
	const headers = [
		"",
		"Level",
		"Members",
		"Total Invested",
		"Profits Paid",
		"Comission",
		"Total earned",
	];

	return (
		<Grid item container xs={12}>
			<TableContainer component="div" className={classes.container}>
				<Table
					component="div"
					className={classes.table}
					aria-label="customized table"
				>
					<TableHead component="div" className={classes.header}>
						<TableRow component="div">
							{headers.map((header, index) => (
								<TableCell
									component="div"
									key={index}
									align="center"
								>
									<Typography variant="subtitle1">
										{header}
									</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody component="div" className={classes.body}>
						<CustomTableRow
							level={1}
							row={team.levels[0] ? team.levels[0] : 0}
							type="middle"
						/>
						<CustomTableRow
							level={2}
							row={team.levels[1] ? team.levels[1] : 0}
							type="end"
						/>
					</TableBody>
				</Table>
			</TableContainer>
			<TableContainer component="div" className={classes.container}>
				<Table
					component="div"
					className={classes.table}
					aria-label="customized table"
				>
					<TableBody component="div" className={classes.body}>
						<CustomTableRow
							level={3}
							row={team.levels[2] ? team.levels[2] : 0}
							type="start"
						/>
						<CustomTableRow
							level={4}
							row={team.levels[3] ? team.levels[3] : 0}
							type="end"
						/>
					</TableBody>
				</Table>
			</TableContainer>
			<TableContainer component="div" className={classes.container}>
				<Table
					component="div"
					className={classes.table}
					aria-label="customized table"
				>
					<TableBody component="div" className={classes.body}>
						<CustomTableRow
							level={5}
							row={team.levels[4] ? team.levels[4] : 0}
							type="start"
						/>
						<CustomTableRow
							level={6}
							row={team.levels[5] ? team.levels[5] : 0}
							type="middle"
						/>
						<CustomTableRow
							level={7}
							row={team.levels[6] ? team.levels[6] : 0}
							type="end"
						/>
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
}

const mapStateToProps = (store) => ({
	team: store.TeamTable,
});

const mapDispatchToProps = (dispatch) => {
	return {
		teamTableAction: () => dispatch(getTeamTable()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamTable);
