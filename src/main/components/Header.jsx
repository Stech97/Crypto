import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

const orange = "#ed7102";

const OrangeButton = withStyles({
	root: {
		color: orange,
		backgroundColor: "#fff",
		border: "3px solid " + orange,
		borderRadius: "30px",
		paddingLeft: "1rem",
		paddingRight: "1rem",
		"&:hover": {
			color: "#fff",
			backgroundColor: orange,
		},
		"&[disabled]": {
			borderColor: "#838383",
		},
		"&>a": {
			textDecoration: "none",
		},
	},
})(Button);

const useStyles = makeStyles((theme) => ({
	header: {
		borderBottomRightRadius: "35px",
		height: "75px",
		background: "#fff",
		justifyContent: "center",
		width: "100vw",
		left: 0,
	},
	logo: {
		justifySelf: "flex-start",
		alignSelf: "center",
	},
	navbar: {
		justifySelf: "flex-end",
		alignSelf: "center",
		justifyContent: "space-around",
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
	link: {
		alignSelf: "center",
		"& a": {
			textDecoration: "none",
			color: "#005c9f",
			fontFamily: "IBM Plex Sans",
			fontSize: "1.2rem",
			fontWeight: "500",
		},
	},
	button: {
		padding: "10px",
		fontWeight: "500",
		fontSize: "1.2rem",
	},
	menuMobile: {
		display: "none",
		[theme.breakpoints.down("sm")]: {
			display: "flex",
		},
	},
}));

function Header(props) {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar className={classes.header} position="fixed">
			<CssBaseline />
			<Toolbar>
				<Grid justify="space-between" container xs={12}>
					<Grid className={classes.logo} item xs={10} md={2}>
						<Link to="/main">
							<img
								src="./img/logo.png"
								srcSet="./img/logo@2x.png 2x, ./img/logo@3x.png 3x"
								alt="Logo"
								height="50px"
								width="auto"
							/>
						</Link>
					</Grid>
					<Grid className={classes.navbar} container md={6}>
						<Grid className={classes.link} item md={2}>
							<HashLink to={"/main#OurMission"}>About</HashLink>
						</Grid>
						<Grid className={classes.link} item md={2}>
							<HashLink to={"/main#Team"}>Team</HashLink>
						</Grid>
						<Grid className={classes.link} item md={2}>
							<a href="https://members.com/">Blog</a>
						</Grid>
						<Grid className={classes.link} item md={2}>
							<Link to={"/login"}>Login</Link>
						</Grid>
						<Grid item md={3}>
							<OrangeButton component={Link} to={"/signup"}>
								Sign Up
							</OrangeButton>
						</Grid>
					</Grid>
					<Grid className={classes.menuMobile} container xs={2}>
						<IconButton
							aria-controls="simple-menu"
							aria-haspopup="true"
							onClick={handleClick}
						>
							<MenuIcon />
						</IconButton>
					</Grid>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem>
							<HashLink to={"/main#OurMission"}>About</HashLink>
						</MenuItem>
						<MenuItem>
							<HashLink to={"/main#Team"}>Team</HashLink>
						</MenuItem>
						<MenuItem>
							<a href="https://members.com/">Blog</a>
						</MenuItem>
						<MenuItem>
							<Link to={"/login"}>Login</Link>
						</MenuItem>
						<MenuItem>
							<OrangeButton component={Link} to={"/signup"}>
								Sign Up
							</OrangeButton>
						</MenuItem>
					</Menu>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
