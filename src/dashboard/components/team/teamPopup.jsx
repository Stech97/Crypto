import React, { Component, useEffect } from "react";
import { getTeamPopup } from "../../actions/teamPopup";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  header: {
    color: "#123273",
    fontWeight: 500,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography className={classes.header} variant="h6">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    minHeight: "40vh",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

/*
class TeamPopupTable extends Component {
  componentDidMount = () => {
    this.props.getTeamPopupAction(this.props.level + 1);
  };

  render() {
    return (
      <div className="popup-team">
        <div className="popup-team-header">
          <h5>Username</h5>
          <h5>Email</h5>
          <h5>Invested</h5>
          <h5>Your earnings</h5>
        </div>
        <div className="popup-team-box">
          {this.props.table.members &&
            this.props.table.members.map((teammate, id) => (
              <div className="popup-team-row">
                <h5>{teammate.username}</h5>
                <h5>{teammate.email}</h5>
                <h5>{teammate.invested}</h5>
                <h5>{teammate.earnings}</h5>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
*/

const useStyles = makeStyles((theme) => ({
  profit: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    marginTop: "20px",
  },
  header: {
    position: "sticky",
  },
  table: {},
  container: {
    boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
    borderRadius: "2vw",
    padding: "2rem",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "1rem 1rem 0 0",
    },
  },
  body: {
    maxHeight: "300px",
    overflow: "scroll",
  },
  row: {
    background: "#fff",
    "&>div": {
      border: "none",
    },
    "& p": {
      color: "#838383",
    },
  },
  text: {
    color: "#838383",
  },
}));

function TeamPopup(props) {
  const classes = useStyles();
  useEffect(() => {
    props.getTeamPopupAction(props.level);
  }, []);

  return (
    <Dialog
      scroll="paper"
      maxWidth="lg"
      fullWidth
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        paper: classes.container,
      }}
    >
      <DialogTitle onClose={props.handleClose} id="alert-dialog-title">
        {"Team Overview Level " + props.level}
      </DialogTitle>
      <DialogContent>
        <TableContainer component="div">
          <Table component="div" className={classes.table}>
            <TableHead component="div" className={classes.header}>
              <TableRow component="div" className={classes.row}>
                <TableCell component="div">
                  <Typography className={classes.text}>Username</Typography>
                </TableCell>
                <TableCell component="div">
                  <Typography className={classes.text}>Email</Typography>
                </TableCell>
                <TableCell component="div">
                  <Typography className={classes.text}>Invested</Typography>
                </TableCell>
                <TableCell component="div">
                  <Typography className={classes.text}>
                    Your earnings
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody component="div" className={classes.body}>
              {props.table.members.map((teammate, id) => (
                <TableRow component="div" key={id} className={classes.row}>
                  <TableCell component="div">
                    <Typography className={classes.text}>
                      {teammate.username}
                    </Typography>
                  </TableCell>
                  <TableCell component="div">
                    <Typography className={classes.text}>
                      {teammate.email}
                    </Typography>
                  </TableCell>
                  <TableCell component="div">
                    <Typography className={classes.text}>
                      {teammate.invested}
                    </Typography>
                  </TableCell>
                  <TableCell component="div">
                    <Typography className={classes.text}>
                      {teammate.earnings}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (store) => ({
  table: store.teamPopupTable,
});

const mapDispatchToProps = (dispatch) => ({
  getTeamPopupAction: (level) => dispatch(getTeamPopup(level)),
});

export default TeamPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamPopup);

/*
const TeamPopup = (props) => {
  return (
    <div className="popup">
      <div onClick={() => props.closeModal()} className="popup-layer"></div>
      <div className="popup-wrapper-team">
        <div className="popup-wrapper-team-header">
          <h1>{"Team Overview Level " + props.level}</h1>
        </div>
        <div className="popup-wrapper-team-cross">
          <img onClick={() => props.closeModal()} src="/img/close-icon.png" />
        </div>
        <div className="popup-wrapper-team-content">
          <TeamPopupTable level={props.level} />
        </div>
      </div>
    </div>
  );
};

export default class TeamPopupPlus extends Component {
  state = {
    isOpened: false,
  };

  toggleModal = () => {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  };

  render() {
    const { obj } = this.props;
    return (
      <div className="team-table-content-plus">
        <svg
          onClick={() => this.toggleModal()}
          preserveAspectRatio="xMinYMid slice"
          viewBox="0 0 47 44"
        >
          <use href="#plus" />
        </svg>
        {this.state.isOpened && (
          <TeamPopup level={obj.level} closeModal={() => this.toggleModal()} />
        )}
      </div>
    );
  }
}
*/
