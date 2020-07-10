import React, { memo } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "../Buttons";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

import { makeStyles } from "@material-ui/core/styles";

const darkBlue = "#123273";
const grayText = "#838383";
const lightBlue = "#16428d";

const useStyles = makeStyles((theme) => ({
	whitebox: {
		boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
		border: "1px solid #efefef",
		backgroundColor: "#ffffff",
		borderRadius: "2vw",
		[theme.breakpoints.down("sm")]: {
			display: "none",
			borderRadius: "1rem",
		},
	},
	carousel: {
		display: "none",
		[theme.breakpoints.down("sm")]: {
			display: "flex",
			"&>*": {
				justifyContent: "center",
			},
		},
	},
	header: {
		color: darkBlue,
		fontWeight: "500",
		marginBottom: "1rem",
	},
	post: {
		borderBottom: "2px solid" + grayText,
		margin: 0,
		"&:last-child": {
			border: "none",
		},
		border: "none",
		display: "flex",
		justifySelf: "flex-start",
		"&>div": {
			boxShadow: "none!important",
		},
		[theme.breakpoints.down("sm")]: {
			boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
			border: "1px solid #efefef",
			backgroundColor: "#ffffff",
			borderRadius: "2vw",
		},
	},
	title: {
		color: lightBlue,
		textAlign: "left",
	},
	text: {
		color: grayText,
		textAlign: "left",
	},
	action: {
		marginTop: "1rem",
		marginBottom: "1rem",
	},
}));

const news = [
	{
		title: "Heading 1",
		text:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero incidunt, molestias reiciendis necessitatibus porro. Fugiat nisi, quibusdam eveniet impedit ullam exercitationem voluptates veniam a repellat ea suscipit temporibus velit sit vitae unde distinctio consequuntur amet est. Itaque, minima consequuntur nam qui ut, eveniet doloremque debitis beatae excepturi tempora cumque totam.",
	},
	{
		title: "Heading 2",
		text:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero incidunt, molestias reiciendis necessitatibus porro. Fugiat nisi, quibusdam eveniet impedit ullam exercitationem voluptates veniam a repellat ea suscipit temporibus velit sit vitae unde distinctio consequuntur amet est. Itaque, minima consequuntur nam qui ut, eveniet doloremque debitis beatae excepturi tempora cumque totam.",
	},
	{
		title: "Heading 3",
		text:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero incidunt, molestias reiciendis necessitatibus porro. Fugiat nisi, quibusdam eveniet impedit ullam exercitationem voluptates veniam a repellat ea suscipit temporibus velit sit vitae unde distinctio consequuntur amet est. Itaque, minima consequuntur nam qui ut, eveniet doloremque debitis beatae excepturi tempora cumque totam.",
	},
	{
		title: "Heading 4",
		text:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero incidunt, molestias reiciendis necessitatibus porro. Fugiat nisi, quibusdam eveniet impedit ullam exercitationem voluptates veniam a repellat ea suscipit temporibus velit sit vitae unde distinctio consequuntur amet est. Itaque, minima consequuntur nam qui ut, eveniet doloremque debitis beatae excepturi tempora cumque totam.",
	},
	{
		title: "Heading 5",
		text:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero incidunt, molestias reiciendis necessitatibus porro. Fugiat nisi, quibusdam eveniet impedit ullam exercitationem voluptates veniam a repellat ea suscipit temporibus velit sit vitae unde distinctio consequuntur amet est. Itaque, minima consequuntur nam qui ut, eveniet doloremque debitis beatae excepturi tempora cumque totam.",
	},
];

const NewsPost = memo(function NewsPost(props) {
	const [expanded, setExpanded] = React.useState(false);
	const classes = useStyles();
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Grid
			container
			item
			xs={10}
			className={classes.post}
			align="flex-start"
		>
			<Card>
				<CardHeader title={props.title} className={classes.title} />
				<Collapse in={expanded} timeout="auto" collapsedHeight="100px">
					<CardContent>
						<Typography className={classes.text}>
							{props.text}
						</Typography>
					</CardContent>
				</Collapse>
				<CardActions className={classes.action}>
					<Button
						aria-expanded={expanded}
						aria-label="show more"
						onClick={handleExpandClick}
					>
						{expanded ? "Hide" : "View More"}
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
});

export default function News(props) {
	const classes = useStyles();
	return (
		<Grid item container xs={12} spacing={2}>
			<Typography variant="h5" className={classes.header}>
				News
			</Typography>
			<Grid item md={12} className={classes.whitebox} align="center">
				{news.map((post, index) => (
					<NewsPost key={index} {...post} />
				))}
			</Grid>
			<Swiper
				className={classes.carousel}
				slidesPerView={1}
				scrollbar={{ draggable: true }}
			>
				{news.map((post, index) => (
					<SwiperSlide key={index}>
						<NewsPost {...post} />
					</SwiperSlide>
				))}
			</Swiper>
		</Grid>
	);
}
