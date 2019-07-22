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
import InputField from './components/reusableComponents/InputField';
import DialogComponent from './components/reusableComponents/DialogComponent';
import Checkbox from '@material-ui/core/Checkbox';

export const myContext=React.createContext();

const styleSheet={
  issueArray:{
    width: '100%',
    display: 'inline-flex'
  },
  inputField:{
    padding:10
  }
}

export default class App extends Component {
  constructor(props){
    localStorage.setItem("Data",JSON.stringify(Data.data));
    super(props);
    this.firstRef = React.createRef("hello");
    this.state={
      dialogStatus:false,
      contentArrayForIssues:undefined,
      issueArrayIndex:null,
      issueArray:undefined,
      heading:"Sign Up",
      issueObj:{label:"enter your issue",placeholder:"enter your issue",value:"",name:"newIssue",className:"input-field-issue"},
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
      this.changeEventForAdd= this.changeEventForAdd.bind(this);
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

  navigateToHome(){

  }

  userLoggedOut=(logoutStatus)=>{
    this.setState({
      loginUserStatus:!logoutStatus
    })
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
  dialogClosedStatus=()=>{
    let data=this.getLocalStorageData();
    data[this.state.issueArrayIndex].issueArray=this.state.issueArray.issueArray;
    localStorage.setItem("Data",JSON.stringify(data));
    this.setState({
      dialogStatus:false
    })
  }

  currentOpenIssue=(currentIssueOpenobj,indexForUpdate)=>{
    this.setState({
      issueArray:currentIssueOpenobj,
      issueArrayIndex:indexForUpdate,
      dialogStatus:true
    },()=>{
      this.setNewArrayOfIssues();
    });
  } 
  changeEvent(index,event){
    this.setState({
      issueArray:{...this.state.issueArray,issueArray:this.state.issueArray.issueArray.map((res,index1)=>{
        if(index===index1){
          res[event.target.name]=event.target.type==="checkbox"?event.target.checked:event.target.value
        }
        return res
      })}
    },()=>{
      this.setNewArrayOfIssues();
    })
  }

  changeEventForAdd(event){
    this.setState({
      issueObj:{...this.state.issueObj,value:event.target.value}
    },()=>{
    })
  }

  setNewArrayOfIssues(){
    let loggedInUser=JSON.parse(localStorage.getItem("currentLogin")).role;
    let issueObj;
    this.setState({
      contentArrayForIssues:this.state.issueArray.issueArray.map((res,index)=>{
        issueObj={ issue:{ label:"issue",placeholder:"issue",disable:loggedInUser==="HelpDesk Engineer"?true:false,className:"input-field-issue",name:"issue" },
               assigned:{ label:"assigned person",disable:loggedInUser==="Admin"?false:true,placeholder:"assigner",className:"input-field-issue",name:"assigned" } };
        issueObj["issue"].value=res.issue;
        issueObj["assigned"].value=res.assigned;
        return <div style={styleSheet.issueArray} key={index}>
        <InputField onChange={this.changeEvent.bind(this,index)} config={issueObj.issue} />
        <InputField onChange={this.changeEvent.bind(this,index)} config={issueObj.assigned} />
        <Checkbox name="status" checked={res.status} onChange={this.changeEvent.bind(this,index)} />
        </div>
      })
    })
  }
  dialogCustomButtonClick=(status)=>{
    this.setState({
      contentArrayForIssues:[...this.state.contentArrayForIssues,
        <input type="text" value={this.state.issueObj.value} onChange={this.changeEventForAdd} key={Math.random()}/>]
    });
  }
  render() {
    let actionButton={text:"Add Issue", clickEvent:this.dialogCustomButtonClick}
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
      <Route exact path="/" render={()=>(<div>
      <Link onClick={this.linkToLogin} to="/login">Already a user, Login In</Link>
      <RUCforms submitButtonText="SIGN UP"
      formClass="sign-up-class" custom={customValidation} form={this.state.form} formOutput={this.signupFormData}/>
      </div>
      )}/>
      <myContext.Provider value="this is impetus, an IT company.">
      <Route path="/home" render={()=>(<Home history={this.props.history} openIssue={this.currentOpenIssue} logoutStatus={this.userLoggedOut} loginStatus={this.state.loginUserStatus}/>)} />
      <Route path="/home/:userId" render={()=>(
        <DialogComponent button={actionButton} dialogTitle="My issues" dialogClosedStatus={this.dialogClosedStatus} 
        content={this.state.issueArray?this.state.contentArrayForIssues:null} dialogStatus={this.state.dialogStatus}/>
      )} />
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


