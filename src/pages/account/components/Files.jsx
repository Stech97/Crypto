import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import CsvDownload from 'react-json-to-csv';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'primary',
  },

  root: {
    display: 'flex',
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },

    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    minWidth: 650,
  },
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function createData_users(
  name,
  email,
  phone,
  total_added,
  total_com,
  total_team_com,
  withdrawn,
  super_user,
) {
  return {
    name,
    email,
    phone,
    total_added,
    total_com,
    total_team_com,
    withdrawn,
    super_user,
  };
}

const rows_users = [
  createData_users(
    'Vagina Dickson',
    'vg@di.com',
    '+7392031231',
    'BTC 0.1',
    'DET 3',
    'DET 103',
    'BTC 1.3',
    <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} />,
  ),
];

export default function Dashboard(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const theme = useTheme();

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: props.open,
      })}
    >
      {/* Тут лучше какую-то mapping function применить я думаю, что бы не плодить лишнего отсавляю как есть */}
      <div className={classes.drawerHeader} />
      <Grid
        container
        spacing={3}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={3}>
          <Typography
            className={classes.title}
            variant="h5"
            component="p"
            gutterBottom
          >
            Business presentation
          </Typography>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" onClick={handleOpen}>
              View current
            </Button>
          </label>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="/static/pirate.jpg"
                      title="Pirate"
                    />
                  </CardActionArea>
                </Card>
              </div>
            </Fade>
          </Modal>
          {/* <Button variant="contained" color="primary">
            View current
          </Button> */}
        </Grid>
        <Grid item xs={3}>
          {' '}
          <input
            accept="*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="grey" component="span">
              Select file
            </Button>
          </label>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button variant="contained" color="secondary">
            Apply
          </Button>
        </Grid>
      </Grid>
    </main>
  );
}
