import React, { memo } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

import { withStyles, makeStyles } from "@material-ui/core/styles";

const orange = "#ed7102";
const darkBlue = "#123273";
const grayText = "#838383";
const lightBlue = "#16428d";

const BlueButton = withStyles({
	root: {
		color: "#fff",
		background: "linear-gradient(77deg, #16428d 0%, #005c9f 100%)",
		border: "none",
		borderRadius: "30px",
		paddingLeft: "1rem",
		paddingRight: "1rem",
		"&:hover": {
			color: lightBlue,
			background: orange,
		},
	},
})(Button);

const goodStyles = makeStyles((theme) => ({
	box: {
		borderRadius: "2vw",
		height: "300px",
		display: "flex",
		flexDirection: "column",
		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem",
		},
	},
	title: {
		justifySelf: "flex-start",
		color: "#fff",
		background: "linear-gradient(247deg, #005c9f 0%, #123273 100%)",
	},
	content: {
		justifyContent: "space-between",
		"& p": {
			color: grayText,
		},
	},
	button: {
		display: "flex",
		justifyContent: "center",
		justifySelf: "flex-end",
	},
	carousel: {
		display: "none",
		[theme.breakpoints.down("sm")]: {
			display: "flex",
		},
	},
	blocks: {
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
	slide: {
		display: "flex",
		justifyContent: "center",
	},
}));

function Good(props) {
	const classes = goodStyles();
	const { title, percent, invest, levels } = props;
	return (
		<Grid item xs={6} md={3} lg={2} align="center">
			<Card className={classes.box}>
				<CardHeader title={title} className={classes.title} />
				<CardContent className={classes.content}>
					<Typography variant="body1">
						{"Monthly Profit of up to " + percent + "% month"}
					</Typography>
					<Typography variant="body1">
						{"Starting  from $" + invest}
					</Typography>
					<Typography variant="body1">
						{"Career commission qualified Level 1-" + levels}
					</Typography>
				</CardContent>
				<CardActions className={classes.button}>
					<BlueButton>Invest</BlueButton>
				</CardActions>
			</Card>
		</Grid>
	);
}

function Goods() {
	const goods = [
		{
			title: "Small",
			percent: 6,
			invest: 100,
			levels: 2,
		},
		{
			title: "Medium",
			percent: 8,
			invest: 5000,
			levels: 4,
		},
		{
			title: "Large",
			percent: 11,
			invest: 10000,
			levels: 7,
		},
	];

	const classes = goodStyles();

	return (
		<Grid item container xs={12} spacing={2} justify="space-around">
			<Grid
				className={classes.blocks}
				item
				container
				xs={12}
				spacing={2}
				justify="space-between"
			>
				{goods.map((good, i) => (
					<Good key={i} {...good} />
				))}
			</Grid>
			<Swiper
				className={classes.carousel}
				slidesPerView={1}
				scrollbar={{ draggable: true }}
			>
				{goods.map((good, i) => (
					<SwiperSlide key={i} className={classes.slide}>
						<Good {...good} />
					</SwiperSlide>
				))}
			</Swiper>
		</Grid>
	);
}

export default Goods;
