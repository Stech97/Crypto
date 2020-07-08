import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../actions/header';
import { userLogoutGet } from '../actions/logout';
import { Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { BurgerIcon } from '../svg/iconComponents';
import {
  Container,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Fab,
  Grid,
  Typography,
  CssBaseline,
  Box,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@material-ui/core';

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { UserIcon, SettingsIcon } from '../svg/iconComponents';

import { sidebarWidth } from '../NewDash';
export const darkBlue = '#123273';
export const gradient = 'linear-gradient(50deg, #123273 0%, #005c9f 100%)';
export const grayText = '#838383';
export const grayBack = '#efefef';
export const orange = '#ed7102';
export const lightBlue = '#16428d';
export const whitebox = '#efefef';
export const contentBack = '#f5fbff';

const headerTheme = createMuiTheme({
  palette: {
    primary: {
      main: contentBack,
      contrastText: darkBlue,
    },
    secondary: {
      main: darkBlue,
      contrastText: '#ffffff',
    },
    warning: {
      main: '#fff',
      dark: orange,
    },
  },
  typography: {
    fontFamily: ['IBM Plex Sans'],
  },
});

const useStyles = makeStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    height: '75px',
    margin: 0,
    boxShadow: 'none',
    transition: 'none',
    minWidth: '430px',
  },
  user: {
    color: darkBlue,
    width: '200px',
    '&:hover, &:focus': {
      fill: orange,
      stroke: orange,
      color: orange,
      '& .MuiFab-label>svg': {
        fill: orange,
        stroke: orange,
      },
    },
    '& .MuiFab-label>svg': {
      fill: '#fff',
      stroke: '#fff',
    },
  },
  headerModal: {
    position: 'absolute',
    top: '75px',
    width: '200px',
    right: '1rem',
    background: '#ffffff',
    cursor: 'pointer',
    border: '1px solid #efefef',
    borderTop: 'none',
    borderRadius: '0 0 1rem 1rem',
    boxShadow: '0 20px 20px rgba(0, 0, 0, 0.06)',
    justifyContent: 'flex-start',
    '&>ul': {
      width: '100%',
    },
  },
  headerModalClose: {
    display: 'none',
    transition: theme.transitions.create('display', {
      easing: theme.transitions.easing.fade,
      duration: theme.transitions.duration.complex,
    }),
  },
  headerModalOpen: {
    display: 'flex',
    transition: theme.transitions.create('display', {
      easing: theme.transitions.easing.fade,
      duration: theme.transitions.duration.complex,
    }),
  },
  headerModalItem: {
    width: '100%',
    justifyContent: 'space-around',
    color: grayText,
    '&:first-child': {
      borderBottom: '1px solid #efefef',
    },
    '& svg': {
      justifySelf: 'center',
      fill: grayText,
      stroke: grayText,
    },
    '&:hover': {
      color: orange,
      '&+svg': {
        fill: orange,
        stroke: orange,
      },
    },
  },
  userIcon: {
    background: 'linear-gradient(50deg, #123273 0%, #005c9f 100%)',
  },
  toolbar: {
    position: 'relative',
    paddingLeft: theme.spacing(4),
  },
  logo: {
    width: sidebarWidth / 3,
    maxHeight: '50%',
  },
  burgerIcon: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      fill: '#cccccc',
      stroke: '#cccccc',
    },
  },
  username: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const HeaderMenuItem = withStyles({
  root: {
    cursor: 'pointer',
    borderBottom: '0.125rem solid #efefef',
  },
})(MenuItem);

function Header(props) {
  const [menuStatus, setMenuStatus] = useState(null);

  const handleClick = (open) => {
    setMenuStatus(!open);
  };

  const classes = useStyles();
  const { open, handleDrawerToggle } = props;

  return (
    <ThemeProvider theme={headerTheme}>
      <AppBar color="common.white" position="sticky" className={classes.header}>
        <CssBaseline />
        <Grid
          xs={12}
          container
          alignItems="center"
          justify="space-between"
          className={classes.toolbar}
        >
          <Grid className={classes.burgerIcon} item xs="auto">
            <IconButton onClick={() => handleDrawerToggle(open)}>
              <BurgerIcon />
            </IconButton>
          </Grid>
          <Grid item xs="auto" md={2}>
            <img
              src="/img/logo.png"
              title="Defima.io"
              className={classes.logo}
            />
          </Grid>
          <Grid
            aria-controls="header-menu"
            aria-haspopup="true"
            spacing={2}
            item
            container
            justify="center"
            alignItems="center"
            onClick={() => handleClick(menuStatus)}
            className={classes.user}
          >
            <Grid color="primary" item>
              <Fab className={classes.userIcon} size="small" component="div">
                <UserIcon viewBox="-2 0 35 37" />
              </Fab>
            </Grid>
            <HeaderUserName className={classes.username} />
            <Grid item className={classes.username}>
              <KeyboardArrowDownIcon />
            </Grid>
          </Grid>
          <Grid
            spacing={2}
            item
            container
            justify="center"
            alignItems="center"
            className={clsx(classes.headerModal, {
              [classes.headerModalOpen]: menuStatus,
              [classes.headerModalClose]: !menuStatus,
            })}
          >
            <List>
              <ListItem className={classes.headerModalItem}>
                <ListItemIcon>
                  <SettingsIcon viewBox="0 0 37 37" />
                </ListItemIcon>
                <ListItemText variant="subtitle2" primary="Settings" />
              </ListItem>
              <ListItem className={classes.headerModalItem}>
                <ListItemIcon>
                  <UserIcon />
                </ListItemIcon>
                <ListItemText variant="subtitle2" primary="Logout" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </AppBar>
    </ThemeProvider>
  );
}

function HeaderUserName({ user, setUserAction, ...rest }) {
  useEffect(() => {
    if (user.user.username === '') {
      setUserAction();
    }
  });

  return (
    <Grid item {...rest}>
      <Typography variant="subtitle2">{user.user.username}</Typography>
    </Grid>
  );
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserAction: (username) => dispatch(setUser(username)),
    getUserLogoutAction: () => dispatch(userLogoutGet()),
  };
};

HeaderUserName = memo(
  connect(mapStateToProps, mapDispatchToProps)(HeaderUserName),
);

export default memo(Header);
