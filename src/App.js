import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/HeaderComponent/Header';
import RUCforms from './components/RUCformsComponent/RUCforms'; 
import Home from './components/HomeComponent/Home';
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom';
// import { createBrowserHistory } from "history";
import AboutUs from './components/reusableComponents/AboutUs';
import Data from './data/home.json';
export const myContext=React.createContext();

export default class App extends Component {
  constructor(props){
    localStorage.setItem("Employee",JSON.stringify(Data.data));
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
       },
       loginForm:{
        email:{value:"",id:"email",type:"text",label:"Enter Email", placeholder:"Enter Email" ,className:"text-field",margin:"normal",
        helperText:{success:'Enter you email id',fail:'Invalid Email Id'},
        status:false,validators:{required:false,minLength:5,email:true,maxLength:20,custom:true},variant:"outlined"},
        //2nd object
        password:{value:"",id:"password",type:"password",label:"Password", placeholder:"Enter Email",className:"text-field",margin:"normal",
        helperText:{success:'Enter you password',fail:'Invalid Password'},
        status:false,validators:{required:true,minLength:2,maxLength:8},variant:"outlined"},
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
  linkToLogin=()=>{
    this.setState({
      heading:"ENTER LOGIN DETAILS"
    })
  }
  signupFormData=(status,formValue)=>{
    if(formValue){
    this.setState({
      loginUserStatus:true,
      heading:"Welcome "+formValue.name
    },() => this.navigateToHome());
   }
  }

  loginFormOutput=(status,value)=>{
    let findValue;
    if(status){
    let employeeDetails = localStorage.getItem("Employee");
    let employeeDetailsArray=JSON.parse(employeeDetails);
    findValue= employeeDetailsArray.find(obj=>{
        if(obj.email===value.email && obj.password===value.surname){
           return obj
        }
      });
    }
    if(findValue){
      this.setState({
        loginUserStatus:true
      });
    }   
  }
  navigateToHome(){
    // this.props.history.push('/home');
  }
  render() {
    let customValidation={email:{function:this.customEmailvalidation.bind(this)}};
    return (
    <div className="App">
    <Router>
      { 
      this.props.location.pathname!="/login" ?
      <Header heading={this.state.heading}></Header>:<Header heading="ENTER LOGIN DETAILS"></Header>
      }
      <Route path="/login" render={()=>(<RUCforms submitButtonText="LOGIN" formClass="sign-up-class" custom={customValidation} form={this.state.loginForm} formOutput={this.loginFormOutput}/>)}/>
      <Route exact path="/" render={()=>(<div><RUCforms submitButtonText="SIGN UP" formClass="sign-up-class" custom={customValidation} form={this.state.form} formOutput={this.signupFormData}/>
      <Link onClick={this.linkToLogin} to="/login">Already a user, LoginIN</Link>
      </div>
      )}/>
      <myContext.Provider value="this is impetus, an IT company.">
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
