import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  value,
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={value}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const TeamComissions = (props) => {
  const { handleSubmit, pristine, reset, submitting, classes } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="level1"
          component={renderTextField}
          label="Level 1"
          value="30%"
        />
      </div>
      <div>
        <Field
          name="level2"
          component={renderTextField}
          label="Level 2"
          value="30%"
        />
      </div>
      <div>
        <Field
          name="level3"
          component={renderTextField}
          label="Level 3"
          value="30%"
        />
      </div>
      <div>
        <Field
          name="level4"
          component={renderTextField}
          label="Level 4"
          value="30%"
        />
      </div>
      <div>
        <Field
          name="level5"
          component={renderTextField}
          label="Level 5"
          value="30%"
        />
      </div>
      <div>
        <Field
          name="level6"
          component={renderTextField}
          label="Level 6"
          value="30%"
        />
      </div>
      <div>
        <Field
          name="level7"
          component={renderTextField}
          label="Level 7"
          value="30%"
        />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'TeamComissions', // a unique identifier for this form
})(TeamComissions);
