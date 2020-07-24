import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import SearchIcon from "@material-ui/icons/Search";
import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import CsvDownload from "react-json-to-csv";
import { GetUsers } from "../actions/users";
import { connect } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    minWidth: 650,
  },
  root: {
    display: "flex",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function createData_users(
  { name, email, phone, total_added, total_com, total_team_com, withdrawn },
  super_user
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

function Users(props) {
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    props.GetUsersAction();
  }, []);

  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const rows_users = props.users.data.map((user) =>
    createData_users(
      user,
      <Checkbox inputProps={{ "aria-label": "primary checkbox" }} />
    )
  );

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: props.open,
      })}
    >
      <div className={classes.drawerHeader} />
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography
            className={classes.title}
            variant="h5"
            component="p"
            gutterBottom
          >
            User Overview
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Grid>
        <Grid item xs={3}>
          {/* <Button variant="contained" color="secondary">
            Download csv
          </Button> */}
          <CsvDownload
            data={rows_users}
            filename="users.csv"
            style={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              border: 0,
              borderRadius: 3,
              boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
              color: "white",
              height: 48,
              padding: "0 30px",
            }}
          >
            DOWNLOAD CSV
          </CsvDownload>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">E-mail</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">Total added</TableCell>
                  <TableCell align="right">Total comissions</TableCell>
                  <TableCell align="right">Total team comissions</TableCell>
                  <TableCell align="right">Withdrawn</TableCell>
                  <TableCell align="right">Super User</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows_users.map((rows_users) => (
                  <TableRow key={rows_users.name}>
                    <TableCell align="right">{rows_users.name}</TableCell>
                    <TableCell align="right">{rows_users.email}</TableCell>
                    <TableCell align="right">{rows_users.phone}</TableCell>
                    <TableCell align="right">
                      {rows_users.total_added}
                    </TableCell>
                    <TableCell align="right">{rows_users.total_com}</TableCell>
                    <TableCell align="right">
                      {rows_users.total_team_com}
                    </TableCell>
                    <TableCell align="right">{rows_users.withdrawn}</TableCell>
                    <TableCell align="right">{rows_users.super_user}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </main>
  );
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  GetUsersAction: () => dispatch(GetUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
