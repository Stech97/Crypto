import React, { Fragment, useMemo, forwardRef } from "react";
import FluidContainer from "../Content";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FooterNewsletter from "./footer/FooterNewsletter";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const darkBlue = "#123273";
const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
const grayText = "#838383";
const grayBack = "#efefef";
const orange = "#ed7102";
const lightBlue = "#16428d";
const whitebox = "#efefef";
const contentBack = "#f5fbff";

const useStyles = makeStyles((theme) => ({
	column: {
		"& h4": {
			marginTop: "15px",
			color: "#fff",
		},
		"& span": {
			color: "#fff",
		},
		"& a": {
			paddingLeft: 0,
		},
		[theme.breakpoints.down("sm")]: {
			borderTop: "1px solid #123273",
			borderBottom: "1px solid #123273",
			alignContent: "flex-start",
		},
	},
	borderbox: {
		borderRight: "1px solid #123273",
		borderLeft: "1px solid #123273",
		borderTop: "0",
		borderBottom: "0",
		[theme.breakpoints.down("sm")]: {
			borderRight: "0",
			borderLeft: "0",
		},
	},
}));

function ListItemLink(props) {
	const classes = useStyles();
	const { primary, to, type } = props;

	const CustomLink = useMemo(
		() =>
			forwardRef((linkProps, ref) => (
				<Link ref={ref} to={to} {...linkProps} />
			)),
		[to]
	);

	const CustomHashLink = useMemo(
		() =>
			forwardRef((linkProps, ref) => (
				<HashLink ref={ref} to={to} {...linkProps} />
			)),
		[to]
	);

	switch (type) {
		case "link":
			return (
				<li>
					<ListItem component={CustomLink}>
						<ListItemText primary={primary} />
					</ListItem>
				</li>
			);
		case "hashlink":
			return (
				<li>
					<ListItem component={CustomHashLink}>
						<ListItemText primary={primary} />
					</ListItem>
				</li>
			);
		case "file":
			return (
				<li>
					<ListItem component="a" href={to} download>
						<ListItemText primary={primary} />
					</ListItem>
				</li>
			); //TODO file download
		case "outsource":
			return (
				<li>
					<ListItem component="a" href={to}>
						<ListItemText primary={primary} />
					</ListItem>
				</li>
			);
		default:
			return (
				<li>
					<ListItem component={CustomLink}>
						<ListItemText primary={primary} />
					</ListItem>
				</li>
			);
	}
}

const FooterNavColumn = ({ header, tabs, ...rest }) => {
	const classes = useStyles();
	return (
		<Grid
			direction="column"
			className={classes.column}
			item
			container
			alignContent="center"
			md={4}
			xs={12}
		>
			<Typography align="left" variant="h4">
				{header}
			</Typography>
			<List className={classes.list}>
				{tabs.map((tab) => {
					return (
						<ListItemLink
							key={tab.id}
							primary={tab.text}
							to={tab.path}
							type={tab.type}
						/>
					);
				})}
			</List>
		</Grid>
	);
};

function FooterNav() {
	const footerNavigation = {
		columns: [
			{
				id: 1,
				header: "Company",
				tabs: [
					{
						id: 1,
						text: "Get started",
						path: "/signup",
						type: "link",
					},
					{
						id: 2,
						text: "Our mission",
						path: "/main#OurMission",
						type: "hashlink",
					},
					{
						id: 3,
						text: "Team",
						path: "/main#Team",
						type: "hashlink",
					},
					{
						id: 4,
						text: "Terms of Service",
						path: "/terms&conditions",
						type: "hashlink",
					},
					{
						id: 5,
						text: "Privacy Policy",
						path: "privacy",
						type: "hashlink",
					},
				],
			},
			{
				id: 2,
				header: "News",
				tabs: [
					{
						id: 1,
						text: "Blog",
						path: "https://medium.com/",
						type: "outsource",
					},
					{
						id: 2,
						text: "News Channel",
						path: "https://telegram.org/",
						type: "outsource",
					},
				],
			},
			{
				id: 3,
				header: "Help & Support",
				tabs: [
					{
						id: 1,
						text: "E-Mail",
						path: "mailto:support@defima.io",
						type: "outsource",
					},
					{
						id: 2,
						text: "Telegram",
						path: "https://telegram.org/",
						type: "outsource",
					},
					{
						id: 3,
						text: "Presentation",
						path: "/files/Business_presentation.pptx",
						type: "file",
					},
				],
			},
		],
	};

	return (
		<Fragment>
			{footerNavigation.columns.map((column) => (
				<FooterNavColumn
					key={column.id}
					header={column.header}
					tabs={column.tabs}
				/>
			))}
		</Fragment>
	);
}

function Footer() {
	const classes = useStyles();
	return (
		<FluidContainer background="#0b1f48" radius="0 0 75px 0">
			<Grid container spacing={3} xs={12}>
				<Grid justify="center" item container xs={12} md={3}>
					<img
						width="201"
						height="61"
						src="img/Logo-footer.png"
						alt="logo-footer"
					/>
				</Grid>
				<Grid
					justify="flex-start"
					className={classes.borderbox}
					item
					container
					xs={12}
					md={6}
				>
					<FooterNav />
				</Grid>
				<FooterNewsletter />
			</Grid>
		</FluidContainer>
	);
}

export default Footer;
