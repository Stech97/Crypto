import React from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
	root: {
	    display: "flex",
	    flexGrow: 1,
	},
}))

function Whitebox(props) {
	const {header, text, data, isFetching } = props
	const classes = useStyles()

	return (
		<Grid item xs={3}>
      <Card className={classes.root}>
          { isFetching
            ? <CardContent>
                <Loader
                  type="Rings"
                  color="#F9A732"
                  height={80}
                  width={80}
                />
              </CardContent>
            :
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
          }
      </Card>
    </Grid>
	)
}

export default Whitebox