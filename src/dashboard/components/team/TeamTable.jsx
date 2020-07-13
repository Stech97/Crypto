import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getTeamTable } from "../../actions/getTeamTable";
import TeamPopupPlus from "./teamPopup";
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
	},
	table: {
		boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
		marginBottom: "30px",
		borderRadius: "2vw",
		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem 1rem 0 0",
		},
	},
	container: {
		borderRadius: "2vw",
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
		borderRadius: "2vw",
		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem",
		},
		background: "#fff",
		"&>div": {
			border: "none",
		},
		"& p": {
			color: "#838383",
		},
	},
	row_start: {
		borderRadius: "2vw",
		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem 1rem 0 0",
		},
	},
	row_end: {
		borderRadius: "2vw",
		[theme.breakpoints.down("sm")]: {
			borderRadius: "0 0 1rem 1rem",
		},
		marginBottom: "20px",
	},
	cell: {
		width: "calc(100% / 6)",
	},
	cell_start: {
		"&:first-child": {
			borderTopLeftRadius: "2vw",
		},
		"&:last-child": {
			borderTopRightRadius: "2vw",
		},
	},
	cell_end: {
		"&:first-child": {
			borderBottomLeftRadius: "2vw",
		},
		"&:last-child": {
			borderBottomRightRadius: "2vw",
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
	const { row, type, level } = props;
	const classes = useStyles();
	if (row === 0) {
		return (
			<TableRow component="div" className={classes.row}>
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
		);
	} else {
		return (
			<TableRow component="div" className={classes.row}>
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
		);
	}
}

function TeamTable(props) {
	useEffect(() => {
		props.teamTableAction();
	}, []);

	const { team } = props;

	const classes = useStyles();

	const parseTeam = (levels) => {
		var array = [];
		var result = [];
		console.log(team.levels);
		if (levels.length < 3) {
			for (let i = 0; i < Math.min(levels.length, 2); i++) {
				array.push(levels[i]);
			}
			result.push(array);
			console.log("levels are less than 2: ", levels.length);
		} else if (levels.length < 6) {
			for (let i = 0; i < Math.min(levels.length, 2); i++) {
				array.push(levels[i]);
			}
			result.push(array);
			for (let i = 2; i < Math.min(levels.length, 5); i++) {
				array.push(levels[i]);
			}
			result.push(array);
			console.log("levels are less than 5: ", levels.length);
		} else {
			for (let i = 0; i < Math.min(levels.length, 2); i++) {
				array.push(levels[i]);
			}
			result.push(array);
			for (let i = 2; i < Math.min(levels.length, 5); i++) {
				array.push(levels[i]);
			}
			result.push(array);
			for (let i = 5; i < levels.length; i++) {
				array.push(levels[i]);
			}
			result.push(array);
			console.log("levels are less than 8: ", levels.length);
		}
		return result;
	};
	console.log("props.team.levels");
	const headers = [
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
