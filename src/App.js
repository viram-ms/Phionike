import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import SignInForm from './components/SignInForm';
import WebDomain from './components/WebDomain';
import Typography from '@material-ui/core/Typography';
import md5 from 'md5';
import isUrl from 'is-url';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme =>( {
image:{
  margin:'20px auto',
  width:'300px'
},
logo:{
  margin:'auto',
  justifyContent:'center',
  display:'flex'
},
item:{
  margin:theme.spacing.unit
}
});


class App extends Component {
  state={
    email:'',
    url:'',
    value:'',
    web:'',
    answer:[],
    webUrl:'',
    display:false

  }

  formSubmit = async (event) =>{
    event.preventDefault();

    console.log('form');
    console.log(this.state.email);
    console.log(this.state.email.trim().toLowerCase());
    let hash = this.state.email.trim().toLowerCase()
    console.log(md5(hash));
    let code = md5(hash);
      const res1 = await fetch(`https://www.gravatar.com/avatar/${code}/?s=200`);
      console.log(res1);
      console.log(res1.url);
      this.setState({
        url:res1.url
      })
      console.log(this.state.url);

      const res2 = await fetch(`https://www.gravatar.com/${code}`);
      console.log(res2);
  }

    formSubmitWeb = async (event) =>{
    event.preventDefault();
    console.log('form');
   
      // const res1 = await fetch(`https://logo.clearbit.com/${this.state.web}`);
      // console.log(res1);
      //   console.log(res1.url);
      // this.setState({
      //   url:res1.url
      // });
      const res2 = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=:${this.state.web}`);
    console.log(res2);

    const answer = await res2.json();

    console.log(answer);
    this.setState({
      answer
    });
    if(this.state.answer.length!==0){
      this.setState({
        display:false
      })
    }
    else{
      this.setState({
        display:true
      })
    }



  }

  // company = async (event,domain,name) => {
  //   // event.preventDefault();
  //    const res1 = await fetch(`https://logo.clearbit.com/${domain}`);
  //     console.log(res1);
  //       console.log(res1.url);
  //     this.setState({
  //       webUrl:res1.url
  //     });
  // }

  handleChange = async (event) => {
    event.preventDefault();
    console.log('hi');
    this.setState({
      [event.target.name]:event.target.value
    });

    console.log(isUrl(this.state.web));

    


  }
  render() {
    const {classes} = this.props;
    const {value,email,web,answer,webUrl,display,url}=this.state;
    return (
      <div className="App">
        <Navbar />
        <div className={classes.image}>
          <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Select your choice</FormLabel>
          <RadioGroup
          row
            aria-label="Gender"
            name="value"
            className={classes.group}
            value={value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="Email" control={<Radio />} label="Email" />
            <FormControlLabel value="Web" control={<Radio />} label="We Domain" />
            
          </RadioGroup>
        </FormControl>
        </div>

        { value==='Email' && <SignInForm email={email} handleChange={this.handleChange} formSubmit={this.formSubmit}/>}
        { value==='Web' && <WebDomain web={web} handleChange={this.handleChange} formSubmitWeb={this.formSubmitWeb}/>}
        {value==='Email' && 
            <div className={classes.image}>
        {url.length!==0 && <img src={`${url}`}  alt="image" /> }
        {webUrl.length!==0 && <img src={`${webUrl}`}  alt="image" /> }
        </div>
          }
      
        {value==='Web' && 
        <div className={classes.logo}>
        {answer.length!==0 && answer.map((company,id) => <div key={id} className={classes.item}>
          
          <img src={`${company.logo}`} alt="image"  />
          <Typography variant="h6">NAME: {company.name}</Typography> 
          <a href={`www.${company.domain}`} target="_blank"><Typography variant="h6">DOMAIN: {company.domain}</Typography></a> 

        </div>)
      }
      {
        display && <Typography variant="h6">Domain Not Found</Typography>
      }

      </div>
    }
      </div>

    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
