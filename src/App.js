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
    localStorage.setItem("Data",JSON.stringify(Data.data));
    super(props);
    this.state={
      heading:"Sign Up",
      loginUserStatus:false,
      form:{
        //1st object
        name:{value:"",id:"name",type:"text", label:"Enter you name", placeholder:"Enter Name" ,className:"text-field",margin:"normal",
        helperText:{success:'Enter you name',fail:'Invalid name'},
        status:false,validators:{required:false,minLength:5,maxLength:20}, variant:"outlined"},
        //2nd object

        email:{value:"",id:"email",type:"text",label:"Enter Email", placeholder:"Enter Email" ,className:"text-field",margin:"normal",
        helperText:{success:'Enter you email id',fail:'Invalid Email Id'},
        status:false,validators:{required:false,minLength:5,email:true,maxLength:50,custom:true},variant:"outlined"},
        
        //3rd object
        password:{value:"",id:"password",type:"password",label:"Password", placeholder:"Enter Email",className:"text-field",margin:"normal",
        helperText:{success:'Enter you password',fail:'Invalid Password'},
        status:false,validators:{required:true,minLength:2,maxLength:8},variant:"outlined"},

        designation:{value:"",id:"designation",type:"text",label:"Enter your designation", placeholder:"Enter designation" ,className:"text-field",margin:"normal",
        helperText:{success:'Enter you designation',fail:'Invalid designation'},
        status:false,validators:{required:false,minLength:2,maxLength:50,custom:false},variant:"outlined"},
             
        userId:{value:"",id:"userId",type:"text", label:"Enter you userId", placeholder:"Enter userId" ,className:"text-field",margin:"normal",
        helperText:{success:'Enter you userId',fail:'User Id should not be registered'},
        status:false,validators:{required:true,minLength:2,maxLength:10,custom:true}, variant:"outlined"},

        role:{value:"",id:"role",type:"select", label:"Enter you role", placeholder:"Enter role" ,className:"text-field",margin:"normal",
        helperText:{success:'Enter you current role',fail:'Please select a role'},
        options:["Employee","Admin","HelpDesk Engineer"],
        status:false,validators:{required:true}, variant:"outlined"}
       },
       loginForm:{
        email:{value:"",id:"email",type:"text",label:"Enter Email", placeholder:"Enter Email" ,className:"text-field",margin:"normal",
        helperText:{success:'Enter you email id',fail:'Invalid Email Id'},
        status:false,validators:{required:false,minLength:5,email:true,maxLength:50,custom:true},variant:"outlined"},
        //2nd object
        password:{value:"",id:"password",type:"password",label:"Password", placeholder:"Enter Email",className:"text-field",margin:"normal",
        helperText:{success:'Enter you password',fail:'Invalid Password'},
        status:false,validators:{required:true,minLength:2,maxLength:8},variant:"outlined"},
       }
      }
    }
  
  customEmailvalidation(value){
    if(value.includes(".co.in")){
      return false;
    }
    else{
      return true;
    }
  }
  customUserIdValidation(value){
    let data=this.getLocalStorageData();
    let filterData = data.find(res=>{
      if(res.userId===value){
        return res;
      }
    });
    if(filterData){
      return true;
    }else{
      return false;
    }
  }
  
  linkToLogin=()=>{
    this.setState({
      heading:"ENTER LOGIN DETAILS"
    })
  }
  signupFormData=(status,formValue)=>{
    if(formValue){
    let empData=this.getLocalStorageData();
    empData.push(formValue);
    localStorage.setItem("Data",JSON.stringify(empData));
    localStorage.setItem("currentLogin",JSON.stringify(formValue));
    this.setState({
      loginUserStatus:true,
      heading:"Welcome "+formValue.name
    },() => this.navigateToHome());
   }
  }

  getLocalStorageData(){
    return JSON.parse(localStorage.getItem("Data"));
  }

  loginFormOutput=(status,value)=>{
    let findValue;
    if(status){
    let employeeDetailsArray=this.getLocalStorageData();
    findValue = employeeDetailsArray.find(obj=>{
        if(obj.email===value.email && obj.password===value.password){
           return obj
        }
      });
    }
    if(findValue){
      localStorage.setItem("currentLogin",JSON.stringify(findValue));
      this.setState({
        loginUserStatus:true,
        heading:"Welcome "+findValue.name
      });
    }
    else{
      alert("Wrong Email and password");
      this.props.history.push('/');
    }   
  }
  navigateToHome(){
    // this.props.history.push('/home');
  }
  render() {
    let customValidation={email:{function:this.customEmailvalidation.bind(this)},
    userId:{function:this.customUserIdValidation.bind(this)}};
    return (
    <div className="App">
    <Router>
      { 
      this.props.location.pathname!="/login" ?
      <Header heading={this.state.heading}></Header>:<Header heading="ENTER LOGIN DETAILS"></Header>
      }
      <Route path="/login" render={()=>(<RUCforms submitButtonText="LOGIN" formClass="sign-up-class"
      custom={customValidation} form={this.state.loginForm} formOutput={this.loginFormOutput}/>)}/>
      <Route exact path="/" render={()=>(<div><RUCforms submitButtonText="SIGN UP"
      formClass="sign-up-class" custom={customValidation} form={this.state.form} formOutput={this.signupFormData}/>
      <Link onClick={this.linkToLogin} to="/login">Already a user, Login In</Link>
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


