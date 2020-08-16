import React, { memo, Fragment, useState, useEffect } from "react";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import RouteWithSubRoutes from "../../Routes";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Switch } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { connect } from "react-redux";
import { relogUser } from "./actions/logout";

const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F9A732",
    },
    secondary: {
      main: "#0DA300",
    },
  },

  typography: {
    fontFamily: ["IBM Plex Sans"],
  },
});

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: "#F9A732",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#ffffff",
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
    backgroundImage: "linear-gradient(25deg, #f12711, #f5af19);",
    color: "counter",
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
    // color: 'counter',
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function WrapperContent({ component: Component, open, ...rest }) {
  return <Component openStatus={open} {...rest} />;
}

function Pages(props) {
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      props.relogAction();
    }, 200000);
    return () => clearInterval(interval);
  }, [useState]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          handleDrawerOpen={handleDrawerOpen}
          iconClassName={clsx(classes.menuButton, open && classes.hide)}
        />
        <Sidebar
          openStatus={open}
          drawerClass={classes.drawer}
          drawerPaperClass={classes.drawerPaper}
          drawerHeaderClass={classes.drawerHeader}
          handleDrawerClose={handleDrawerClose}
          theme={theme}
        />
        <Switch>
          {props.routes.map((route, i) => {
            return (
              <RouteWithSubRoutes
                open={open}
                classes={classes}
                theme={theme}
                key={i}
                {...route}
              />
            );
          })}
        </Switch>
      </ThemeProvider>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  relogAction: () => dispatch(relogUser()),
});

export default connect(null, mapDispatchToProps)(Pages);
