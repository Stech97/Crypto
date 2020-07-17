import React from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
	    display: "flex",
	    flexGrow: 1,
	},
}))

function Whitebox(props) {
	const {header, text, data } = props
	const classes = useStyles()

	return (
		<Grid item xs={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                variant="h5"
                component="p"
                gutterBottom
              >
                {header}
              </Typography>
              <Typography variant="p" component="h2">
                {text + data}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
	)
}

export default Whitebox