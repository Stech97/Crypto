import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/styles";
import clsx from "clsx";
import { NavLink, Switch } from "react-router-dom";
import { API } from "../../config";
import RouteWithSubRoutes from "../../Routes";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import {
	UserIcon,
	BurgerIcon,
	InvestmentIcon,
	MarketingIcon,
	HistoryIcon,
	SupportIcon,
	TeamIcon,
} from "../svg/iconComponents";

import {
	List,
	Typography,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
	Grid,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
export const darkBlue = "#123273";
export const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
export const grayText = "#838383";
export const grayBack = "#efefef";
export const orange = "#ed7102";
export const lightBlue = "#16428d";
export const whitebox = "#efefef";
export const contentBack = "#f5fbff";

const sidebarTheme = createMuiTheme({
	palette: {
		primary: {
			main: contentBack,
			contrastText: darkBlue,
		},
		secondary: {
			main: darkBlue,
			contrastText: "#ffffff",
		},
		warning: {
			main: "#fff",
			dark: orange,
		},
	},
	typography: {
		fontFamily: ["IBM Plex Sans"],
	},
});

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: "none",
	},
	drawer: {
		flexShrink: 0,
		whiteSpace: "nowrap",
		background: "linear-gradient(19deg, #0b1f48 0%, #005c9f 100%)",
		minHeight: "calc(97.5vh - 75px)",
		overflowX: "hidden",
	},
	drawerOpen: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.complex,
		}),
		width: "230px",
		[theme.breakpoints.down("sm")]: {
			position: "fixed",
			left: "0",
			top: "75px",
			height: "100vh",
		},
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.complex,
		}),
		width: "60px",
		[theme.breakpoints.down("sm")]: {
			position: "fixed",
			left: "0",
			top: "75px",
			width: "0",
			height: "100vh",
		},
	},
	list: {
		justifyContent: "center",
		color: "#ffffff",
		"& svg": {
			fill: "#fff",
			stroke: "#fff",
		},
	},
	listItem: {
		"&:hover": {
			background: "#ffffff",
			color: darkBlue,
			"& svg": {
				fill: darkBlue,
				stroke: darkBlue,
			},
		},
		height: "3rem",
	},
	listItemIcon: {
		justifyContent: "flex-start",
	},
	listItemIconOpen: {
		opacity: 1,
		transition: theme.transitions.create("opacity", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.complex,
		}),
	},
	listItemIconClose: {
		opacity: 0,
		transition: theme.transitions.create("opacity", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.complex,
		}),
	},
	listItemText: {
		justifyContent: "flex-end",
	},
	listItemTextOpen: {
		opacity: 1,
		transition: theme.transitions.create("opacity", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.complex,
		}),
	},
	listItemTextClose: {
		opacity: 0,
		transition: theme.transitions.create("opacity", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.complex,
		}),
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		fill: "#ffffff",
		stroke: "#ffffff",
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
	wrapper: {
		minHeight: "calc(100vh - 75px)",
	},
	contentOpen: {
		flexGrow: 1,
		padding: theme.spacing(3),
		width: "calc(100% - 230px)",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
	},
	contentClose: {
		flexGrow: 1,
		padding: theme.spacing(3),
		width: "calc(100% - 60px)",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
	},
}));

function Navtab(props) {
	const { Icon, name, path, open, classes, color } = props;

	const CustomLink = (props) => (
		<NavLink to={"/account/" + path} {...props} />
	);

	return (
		<ListItem
			button
			component={CustomLink}
			className={clsx(classes.listItem, {
				[classes.listItemOpen]: open,
				[classes.listItemClose]: !open,
			})}
		>
			<ListItemIcon className={classes.listItemIcon}>
				<Icon />
			</ListItemIcon>
			<ListItemText
				className={clsx(classes.listItemText, {
					[classes.listItemTextOpen]: open,
					[classes.listItemTextClose]: !open,
				})}
				primary={name}
				color={color}
			/>

			<ListItemIcon
				className={clsx(classes.listItemIcon, {
					[classes.listItemIconOpen]: open,
					[classes.listItemIconClose]: !open,
				})}
			>
				<ChevronRightIcon />
			</ListItemIcon>
		</ListItem>
	);
}

function SidebarTime() {
	const [state, setState] = useState("Connecting...");
	async function getTime() {
		await API("/Dashboard/GetTime")
			.then((res) => {
				if (res.ok) {
					setState(res.data.time);
				} else {
					setState("Server Error");
				}
			})
			.catch((error) => {
				setState("Server Error");
			});
	}
	useEffect(() => {
		const interval = setInterval(() => getTime(), 1000);
		return () => clearInterval(interval);
	}, [useState]);

	return <Typography>{"Server Time: " + state}</Typography>;
}

function Sidebar(props) {
	const classes = useStyles();
	const theme = useTheme();
	const { open, handleDrawerToggle } = props;
	const NavTabs = [
		{
			name: "Dashboard",
			path: "dashboard",
			Icon: () => UserIcon(),
		},
		{
			name: "Investment",
			path: "investment",
			Icon: () => InvestmentIcon(),
		},
		{
			name: "Team",
			path: "team",
			Icon: () => TeamIcon(),
		},
		{
			name: "Marketing",
			path: "marketing",
			Icon: () => MarketingIcon(),
		},
		{
			name: "History",
			path: "history",
			Icon: () => HistoryIcon(),
		},
		{
			name: "Support",
			path: "faq",
			Icon: () => SupportIcon(),
		},
	];

	return (
		<ThemeProvider theme={sidebarTheme}>
			<Grid className={classes.wrapper} container xs={12}>
				<Grid
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					})}
					item
				>
					<div className={classes.toolbar}>
						<IconButton onClick={() => handleDrawerToggle(open)}>
							<BurgerIcon />
						</IconButton>
					</div>
					<List className={classes.list}>
						{NavTabs.map((tab, i) => (
							<Navtab
								classes={classes}
								open={open}
								key={i}
								{...tab}
							/>
						))}
						<ListItem>
							<SidebarTime />
						</ListItem>
					</List>
				</Grid>
				<Grid
					item
					container
					className={clsx(classes.content, {
						[classes.contentOpen]: open,
						[classes.contentClose]: !open,
					})}
				>
					<Grid item container xs={12}>
						<Switch>
							{props.routes.map((route, i) => (
								<RouteWithSubRoutes key={i} {...route} />
							))}
						</Switch>
					</Grid>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}

export default Sidebar;
