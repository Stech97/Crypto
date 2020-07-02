import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import {
  DashboardIcon,
  FinanceIcon,
  UsersIcon,
  FilesIcon,
  HomescreenIcon,
  OurMissionIcon,
  HowItWorksIcon,
  PortfolioIcon,
  CareerTeamIcon,
  DefimaTokenIcon,
  AboutUsIcon,
  JoinDefimaIcon,
  FAQIcon,
  TermsIcon,
  NewsIcon,
} from './svg';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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

export default function PagesContent() {
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
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            {
              text: 'Dashboard',
              Svg: DashboardIcon,
            },
          ].map((tab, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                <tab.Svg />
              </ListItemIcon>
              <ListItemText primary={tab.text} />
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {[
            {
              text: 'Finance',
              Svg: FinanceIcon,
            },
            {
              text: 'Users',
              Svg: UsersIcon,
            },
            {
              text: 'Files',
              Svg: FilesIcon,
            },
          ].map((tab, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                <tab.Svg />
              </ListItemIcon>
              <ListItemText primary={tab.text} />
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {[
            {
              text: 'Homescreen',
              Svg: HomescreenIcon,
            },
            {
              text: 'Our Mission',
              Svg: OurMissionIcon,
            },
            {
              text: 'How it works',
              Svg: HowItWorksIcon,
            },
            {
              text: 'Portfolio',
              Svg: PortfolioIcon,
            },
            {
              text: 'Career Team',
              Svg: CareerTeamIcon,
            },
            {
              text: 'Defima Token',
              Svg: DefimaTokenIcon,
            },
            {
              text: 'About Us',
              Svg: AboutUsIcon,
            },
            {
              text: 'Join Defima',
              Svg: JoinDefimaIcon,
            },
            {
              text: 'FAQ',
              Svg: FAQIcon,
            },
            {
              text: 'Terms',
              Svg: TermsIcon,
            },
            {
              text: 'Privacy',
              Svg: TermsIcon,
            },
          ].map((tab, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                <tab.Svg />
              </ListItemIcon>
              <ListItemText primary={tab.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Divider />
        <List>
          {[
            {
              text: 'News',
              Svg: NewsIcon,
            },
          ].map((tab, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                <tab.Svg />
              </ListItemIcon>
              <ListItemText primary={tab.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                variant="h4"
                component="h2"
                gutterBottom
              >
                Added Funds
              </Typography>
              <Typography variant="p" component="h2">
                BTC 1.02
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                variant="h4"
                component="h2"
                gutterBottom
              >
                Invested Ammount
              </Typography>
              <Typography variant="p" component="h2">
                BTC 1.02
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                variant="h4"
                component="h2"
                gutterBottom
              >
                Registered Users
              </Typography>
              <Typography variant="p" component="h2">
                100500
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                variant="h4"
                component="h2"
                gutterBottom
              >
                Users with investments
              </Typography>
              <Typography variant="p" component="h2">
                50250
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                variant="h4"
                component="h2"
                gutterBottom
              >
                Withdrawn amount
              </Typography>
              <Typography variant="p" component="h2">
                BTC 0.521
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                variant="h4"
                component="h2"
                gutterBottom
              >
                User Balance
              </Typography>
              <Typography variant="p" component="h2">
                BTC 0.521
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                variant="h4"
                component="h2"
                gutterBottom
              >
                Comission payed to users
              </Typography>
              <Typography variant="p" component="h2">
                DET 100500
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </main>
    </div>
  );
}
