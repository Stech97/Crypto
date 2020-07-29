import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core/";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import MenuIcon from "@material-ui/icons/Menu";
import { userLogoutGet } from "./actions/users";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { className, handleDrawerOpen, iconClassName, header } = props;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let history = useHistory();
  const handleLogout = () => {
    props.getUserLogoutAction();
    history.push("/login");
  };

  return (
    <AppBar position="fixed" className={className}>
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <IconButton
              color="#inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={iconClassName}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h6" noWrap>
              {header}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              startIcon={<AssignmentIndIcon />}
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Username
            </Button>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </StyledMenuItem>
            </StyledMenu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (store) => {};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserLogoutAction: () => dispatch(userLogoutGet()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
