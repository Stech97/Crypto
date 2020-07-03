import React, { Fragment, Component } from "react";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import InDevelopment from "../../InDevelopment";
import RouteWithSubRoutes from "../../Routes";
import Header from "./Header";
import Dashboard from "./components/Dashboard";
import Sidebar from "./Sidebar";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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

function WrapperContent({ component: Component, open, ...rest }) {
  return <Component openStatus={open} {...rest} />;
}
export default function Pages(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        className={clsx(classes.appBar, { [classes.appBarShift]: open })}
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
      {props.routes.map((route, i) => {
        let component = () =>
          WrapperContent({ open: open, component: route.component });
        return (
          <RouteWithSubRoutes
            key={i}
            component={component}
            path={route.path}
            routes={route.routes}
            Private={route.Private}
          />
        );
      })}
    </div>
  );
}
/**/
