import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { updateView, updateViewError } from '../actions/ComingsoonForm';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { SvgIcon } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Box } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const darkBlue = '#123273';
export const gradient = 'linear-gradient(50deg, #123273 0%, #005c9f 100%)';
export const grayText = '#838383';
export const grayBack = '#efefef';
export const orange = '#ed7102';
export const lightBlue = '#16428d';
export const whitebox = '#efefef';
export const contentBack = '#f5fbff';

const renderField = ({ input, placeholder, className, type }) => {
  return (
    <input
      {...input}
      className={className}
      placeholder={placeholder}
      type={type}
    />
  );
};

class ComingSoonForm extends Component {
  render() {
    const {
      handleSubmit,
      submitting,
      reset,
      sendError,
      placeholder,
    } = this.props;

    const validateEmail = (check) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(check).toLowerCase());
    };

    const submit = (values) => {
      /*
        	window.alert(JSON.stringify({
				method: 'post',
				headers: {
                	'Content-Type': 'application/json',
            	},
				body: JSON.stringify({ Email : 'test' + values.email })
			}))
			
			let variables = {message_html: values.email};
			fetch("http://10.0.0.50/api/Email/AddEmail", {
				method: 'post',
				headers: {
                	'Content-Type': 'application/json',
            	},
				body: JSON.stringify({ Email : 'test' + values.email })
			}).then(function(response) {
				if (response.ok) {
	                alert('Успех!')			
	            } else {
	                alert(response.e)
	            }
	        }).catch((ex) => {
	    		alert('Ъуъ')
	        })

			emailjs.send(
			  	'gmail', templateId,
			  	variables, 'user_jIExVfMX1Oha7HaXMmsBs'
		  	).then(res => {
		    	console.log('Email successfully sent!')
				this.props.dispatch(updateViewSuccess())
		  	})
		  	// Handle errors here however you like, or use a React error boundary
		  	.catch(err => {
		  		console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
				this.props.dispatch(updateViewError())
			})
			*/
      console.log(values.email, validateEmail(values.email));
      if (validateEmail(values.email)) {
        this.props.dispatch(updateView(), values.email);
      } else {
        this.props.dispatch(updateViewError());
      }
      this.props.reset();
    };

    return (
      <form
        className={sendError ? 'comingsoon-form-box' : 'none'}
        onSubmit={handleSubmit(submit)}
      >
        <Field
          component={renderField}
          name="email"
          className="commingsoon-input-text"
          type="text"
          placeholder={placeholder}
        />
        <Button
          style={{
            margin: 'auto',
            color: '#ffffff',
            width: '8.0rem',
            height: '100%',
            background: orange,
            margin: 'auto',
            borderRadius: '1.5625rem',
            textTransform: 'capitalize',
            '&:hover': {
              background: '#ffffff',
              color: orange,
            },
          }}
          type="submit"
          disabled={submitting}
          className="comingsoon-input-button"
        >
          Notify Me
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'TESTFORM', // a unique identifier for this form
})(ComingSoonForm);
