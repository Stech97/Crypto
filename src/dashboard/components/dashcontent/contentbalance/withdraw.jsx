import React, { Fragment, useState, useEffect } from "react";
import {
  Field,
  formValueSelector,
  SubmissionError,
  reduxForm,
} from "redux-form";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import OrangeButton from "../../Buttons";
import { MinusIcon, PlusIcon } from "../../../svg/iconComponents";
import { WithdrawCash } from "../../../actions/CashBTC";
import { getBTCRate } from "../../../actions/getBalance";

const orange = "#ed7102";

const useStyles = makeStyles((theme) => ({
  btcMinus: {
    borderLeft: "1px solid #ffffff",
    width: "50%",
    height: "100%",
    padding: 0,
    margin: "0!important",
    "& svg": {
      fill: "#ffffff",
      stroke: "#ffffff",
      width: "60%",
      height: "auto",
    },
    borderRadius: 0,
    "&:hover": {
      backgroundColor: orange,
    },
    [theme.breakpoints.down("sm")]: {
      "& svg": {
        height: "auto",
        width: "2rem",
      },
    },
  },
  dialog: {
    "&>div>.MuiPaper-root": {
      borderRadius: "40px",
      padding: "20px",
    },
  },
  header: {
    color: "#123273",
    fontWeight: "500",
    margin: "auto 0",
  },
  text: {
    color: "#838383",
  },
}));

const CustomField = withStyles({
  root: {
    "& .MuiInput-root": {
      color: "#fff",
      height: "1rem",
      "&:before": {
        borderBottomColor: "#fff",
      },
      "&:hover:not(.Mui-disabled):before": {
        borderBottom: "none",
      },
      "&>input:-webkit-autofill": {
        WebkitTextFillColor: "#838383",
      },
    },
    "& input": {
      padding: "10px 12px",
    },
    width: "60%",
  },
})(TextField);

function inputField({
  input,
  classes,
  label,
  type,
  meta: { touched, error, warning },
  ...custom
}) {
  return (
    <Grid item xs={12} justify="center" direction="column">
      <Typography className={classes.header} align="left">
        {label}
      </Typography>
      <CustomField
        type={type}
        variant="filled"
        error={touched && error}
        disableUnderline
        InputProps={{ ...input, ...custom, disableUnderline: true }}
        helperText={touched && error ? error : ""}
      />
    </Grid>
  );
}

function Withdraw(props) {
  const { handleSubmit, submitting, withdraw, rate } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.RateAction();
  }, []);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const submit = (values) => {
    console.log("amount", Number(values.amount) * rate.b2u);
    if (Number(values.amount) * rate.b2u >= 10) {
      props.WithdrawAction({
        BTC: (Number(values.amount) * -1).toString(),
        Wallet: values.address,
      });
    } else {
      throw new SubmissionError({ amount: "Too low value" });
    }
  };

  return (
    <Fragment>
      <Button className={classes.btcMinus} onClick={handleClickOpen}>
        <MinusIcon />
      </Button>
      <Dialog
        className={classes.dialog}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="max-width-dialog-title">
          <Grid justify="space-between" container xs={12}>
            <Grid container item xs={10}>
              <Typography variant="h4" className={classes.header}>
                Withdraw Bitcoin
              </Typography>
            </Grid>
            <Grid container justify="flex-end" item xs={2}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid
            onSubmit={handleSubmit(submit)}
            component="form"
            spacing={2}
            item
            container
            xs={12}
          >
            <Grid component={Box} my={2} item container xs={12}>
              <Typography className={classes.text} variant="body1">
                To withdraw bitcoin, please let us know your bitcoin address
                below and your exact amount you want to withdraw. Withdraw
                requests will be executed every Monday and credited on your
                wallet within 72 hours.
              </Typography>
            </Grid>

            <Grid
              component={Box}
              my={2}
              spacing={2}
              justify="flex-start"
              alignContent="center"
              item
              container
              xs={12}
            >
              <Box mx={3}>
                <img
                  src="/img/add-funds-icon.png"
                  alt="coins"
                  height="100%"
                  width="auto"
                />
              </Box>
              <Typography className={classes.header}>
                Min. withdraw $10
              </Typography>
            </Grid>
            <Field
              name="address"
              classes={classes}
              label="Your bitcoin address"
              component={inputField}
              type="text"
            />
            <Field
              type="number"
              step="any"
              name="amount"
              classes={classes}
              label="Insert Withdraw amount"
              component={inputField}
            />
            <Grid component={Box} justify="flex-start" item container xs={12}>
              <OrangeButton type="submit">
                {withdraw.isFetching || submitting
                  ? "Loading..."
                  : withdraw.error.type === "done"
                  ? "Success"
                  : "Withdraw Now"}
              </OrangeButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

const mapStateToProps = (store) => ({
  withdraw: store.withdraw,
  rate: store.Balance.rate,
});

const mapDispatchToProps = (dispatch) => ({
  WithdrawAction: (data) => dispatch(WithdrawCash(data)),
  RateAction: () => dispatch(getBTCRate()),
});

Withdraw = connect(mapStateToProps, mapDispatchToProps)(Withdraw);

Withdraw = reduxForm({
  form: "Withdraw",
})(Withdraw);

export default Withdraw;
