import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Grid} from "@material-ui/core";




const styles = theme =>( {
  root: {
    marginTop:25,
   display:'flex'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  textField:{
     marginRight: theme.spacing.unit,
  },
    button: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
  },
});

class WebDomain extends React.Component {

  render(){

  const { classes,web,handleChange,formSubmitWeb } = this.props;

     return (
    <div className={classes.root}>
    <Grid container>
    <Grid item xs={12} sm={4}>
    </Grid>
      <Grid item xs={12} sm={4} >
         <ValidatorForm
                ref="formIdeator"
                onSubmit={formSubmitWeb}                
                instantValidate
                onError={errors => console.log(errors)}>
                <TextValidator
                  value={web}
                  name="web"
                  className={classes.textField}
                  margin="dense"
                  variant="outlined"
                  label="Web Domain"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
                  <Button type="submit"
                  variant="contained"
                  onClick={formSubmitWeb}
                  color="primary"
                  className={classes.button}>Submit</Button> 

            </ValidatorForm>
        </Grid>
        <Grid item xs={12} sm={4}>
        </Grid>
    </Grid>
  </div>
  );
   }
}

WebDomain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WebDomain);