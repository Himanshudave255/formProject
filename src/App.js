import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/HeaderComponent/Header';
import Login from './components/LoginComponent/Login'; 
import Home from './components/HomeComponent/Home';
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom';
// import { createBrowserHistory } from "history";
import AboutUs from './components/reusableComponents/AboutUs';
// const history = createBrowserHistory();
export const myContext=React.createContext('bye to');

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      heading:"Sign Up",
      loginUserStatus:false,
      form:{
        //1st object
        email:{value:"",id:"email",type:"text",label:"Enter Email", placeholder:"Enter Email" ,className:"text-field",margin:"normal",
        helperText:{success:'Enter you email id',fail:'Invalid Email Id'},
        status:false,validators:{required:false,minLength:5,email:true,maxLength:20,custom:true},variant:"outlined"},
        //2nd object
        password:{value:"",id:"password",type:"password",label:"Password", placeholder:"Enter Email",className:"text-field",margin:"normal",
        helperText:{success:'Enter you password',fail:'Invalid Password'},
        status:false,validators:{required:true,minLength:2,maxLength:8},variant:"outlined"},
        //3rd object
        name:{value:"",id:"name",type:"text", label:"Enter you name", placeholder:"Enter Name" ,className:"text-field",margin:"normal",
        helperText:{success:'Enter you name',fail:'Invalid name'},
        status:false,validators:{required:false,minLength:5,maxLength:20}, variant:"outlined"},

        surname:{value:"",id:"surname",type:"text", label:"Enter you surname", placeholder:"Enter surname" ,className:"text-field",margin:"normal",
        helperText:{success:'Enter you surname first',fail:'Invalid surname'},
        status:false,validators:{required:true,minLength:2,maxLength:10}, variant:"outlined"}
       }
      }
    }
  
  customEmailvalidation(value){
    if(value.includes(".com")){
      return false;
    }
    else{
      return true;
    }
  }
  formData=(status,formValue)=>{
    this.setState({
      loginUserStatus:true,
      heading:"Welcome "+formValue.name
    },() => this.navigateToHome());
  }
  navigateToHome(){
    // this.props.history.push('/home');
  }
  render() {
    let customValidation={email:{function:this.customEmailvalidation.bind(this)}};
    return (
    <div className="App">
    <Router>
      <Header heading={this.state.heading}></Header>
      <Route exact path="/" render={()=>(<Login custom={customValidation} form={this.state.form} formOutput={this.formData}/>)} />
      <myContext.Provider>
       <Route path="/home" render={()=>(<Home history={this.props.history} loginStatus={this.state.loginUserStatus}/>)} />
      </myContext.Provider>
      {this.state.loginUserStatus?
      <div>
         <Redirect to={{
            pathname: '/home'
        }}
      />
      </div>:null
      }

    </Router>
    </div>
    )
  }
}
