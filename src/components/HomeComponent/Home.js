import React, { Component } from 'react'
import AboutUs from '../reusableComponents/AboutUs';
import ContactUs from '../reusableComponents/ContactUs';
import './Home.css';
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom';
// import Data from '../../data/home.json';
import { makeStyles } from '@material-ui/core/styles';
import {myContext} from '../../App';
import TableComponent from '../reusableComponents/TableComponent';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import RUCforms from '../RUCformsComponent/RUCforms';
import DialogComponent from '../reusableComponents/DialogComponent';
  const LinkStyle = { 
    float: 'right',
    marginTop:-40
  };

  const useStyles={
    button: {
      margin: 20 ,
    },
    input: {
      display: 'none',
    }
  };

class Home extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state={
            dialogStatus:false,
            loginStatus:props.loginStatus,
            aboutUs:props.loginStatus?"For more information Contact: Himanshu 9711046797":"Please Login to see this content",
            triggerSubmit:false,
            addUpdateDialogSubmitStatus:false,
            addDialogForm:{
                //1st object
                name:{value:"",id:"name",type:"text",label:"Enter your first name", placeholder:"Enter First Name" ,className:"text-field",margin:"normal",
                helperText:{success:'Enter you First name',fail:'Invalid First Name'},
                status:false,validators:{required:true,minLength:2,email:false,maxLength:20,custom:false},variant:"standard"},
                //2nd object
                email:{value:"",id:"email",type:"text",label:"Enter Email", placeholder:"Enter Email" ,className:"text-field",margin:"normal",
                helperText:{success:'Enter you email id',fail:'Invalid Email Id'},
                status:false,validators:{required:false,minLength:5,email:true,maxLength:50,custom:true},variant:"standard"},
                //3rd object
                designation:{value:"",id:"designation",type:"text", label:"Enter you designation", placeholder:"Enter designation" ,className:"text-field",margin:"normal",
                helperText:{success:'Enter you designation',fail:'Invalid designation'},
                status:false,validators:{required:true}, variant:"standard"},
                //4th object
                userId:{value:"",id:"userId",type:"text", label:"Enter you userId", placeholder:"Enter userId" ,className:"text-field",margin:"normal",
                helperText:{success:'Enter you userId',fail:'User Id should not be registered'},
                status:false,validators:{required:true,minLength:2,maxLength:10,custom:true}, variant:"standard"},
                //5th object
                role:{value:"",id:"role",type:"select", label:"Enter you role", placeholder:"Enter role" ,className:"text-field",margin:"normal",
                helperText:{success:'Enter you current role',fail:'Please select a role'},
                options:["Employee","Admin","HelpDesk Engineer"],
                status:false,validators:{required:true}, variant:"standard"}  
            },
            intialDialogForm:{},
            dialogTitle:"",
            rows:[],
            deletedRowsArray:[],
            columnKeys:[],
            updateButtonDisable:true,
            deleteButtonDisable:true
        }
    }
    componentDidMount(){
        this.setState({
            intialDialogForm:{...this.state.addDialogForm}
        })
        if(this.myRef.current){
        this.myRef.current.style.fontSize="25px";
        }
        this.loadEmployeeData();
    }
    loadEmployeeData(){
        let jsonData=[];
        this.setState({
            rows:this.getLocalStorageData(),
            columnKeys:["name","email","designation","role","userId","Issues"]
        });
    }
    static getDerivedStateFromProps(props,state){
        if(props.loginStatus!=state.loginStatus){
            return {
                loginStatus:props.loginStatus
            }
        }
        return null;
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.rows.length!=0 && JSON.stringify(this.state.rows)!=JSON.stringify(prevState.rows)){
            localStorage.setItem("Data",JSON.stringify(this.state.rows));
        }
    }
    addRow=()=>{
        this.setState({
            addDialogForm:{...this.state.intialDialogForm},
            dialogStatus: true,
            deleteButtonDisable:true,
            triggerSubmit:false,
            updateButtonDisable:true,
            dialogTitle:"ADD DATA",
            submitButtonText:"ADD"
          });
    }

    updateRow=()=>{
        this.setState({
            dialogStatus:true,
            triggerSubmit:false,
            deleteButtonDisable:true,
            dialogTitle:"UPDATE DATA",
            submitButtonText:"UPDATE"
        })
    }

    formData=(status,formValue)=>{
        if(formValue && status){
        let updatedArray=[];
        let obj={
            name:formValue.name,
            userId:formValue.userId,
            designation:formValue.designation,
            password:formValue.password,
            email:formValue.email,
            role:formValue.role
         };
         if(!this.state.updateButtonDisable){
            updatedArray=this.state.rows.map(res=>{
                 if(res.userId===formValue.userId){
                     return obj;
                 }
                 else{
                     return res;
                 }
             });
             this.setState({
                rows:[...updatedArray],
                dialogStatus:false,
                updateButtonDisable:true,
                addUpdateDialogSubmitStatus:false
            }); 
         }
         else{
         this.setState({
            rows:[...this.state.rows,obj],
            dialogStatus:false,
            addUpdateDialogSubmitStatus:false,
            updateButtonDisable:true
        });
      }
     }
     else{
         this.setState({
             addUpdateDialogSubmitStatus:true
         });
     }
    }

    dialogClosedStatus=()=>{
        this.setState({
            dialogStatus: false
          });
    }

    dialogCustomButtonClick=(status)=>{
        if(this.state.addUpdateDialogSubmitStatus && this.state.triggerSubmit){
            this.setState({
                triggerSubmit:false,
                addUpdateDialogSubmitStatus:false
            });
        }
        else{
            this.setState({
                triggerSubmit:true    
            }); 
        }       
    }
    
    logout=()=>{
        localStorage.removeItem("currentLogin");
        this.props.logoutStatus(true);
    }
    routeToIssue(index){
        let obj=JSON.parse(localStorage.getItem("Data"))[index];
        this.props.openIssue(obj,index);
    }
    deletedItem=(arrayOfDeletedItem)=>{
        let formData={...this.state.addDialogForm}
        let length=arrayOfDeletedItem.length;
        this.setState({
            deletedRowsArray:arrayOfDeletedItem,
            deleteButtonDisable:length?false:true,
            updateButtonDisable:length===1?false:true
        });
        if(length===1){
            this.setState({
                addDialogForm:{
                ...formData,
                name:{...formData.name,value:arrayOfDeletedItem[0].name},
                email:{...formData.email,value:arrayOfDeletedItem[0].email},
                designation:{...formData.designation,value:arrayOfDeletedItem[0].designation},
                role:{...formData.role,value:arrayOfDeletedItem[0].role,disable:true},
                userId:{...formData.userId,value:arrayOfDeletedItem[0].userId,disable:true,validators:{}}
             }
            })
        }
    }

    customEmailvalidation=(value)=>{
        if(value.includes(".co.in")){
          return false;
        }
        else{
          return true;
        }
      }
      customUserIdValidation=(value)=>{
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

      //code for selection of user
      getLocalStorageData(){
        let dataArray=[];
        let newDataArray=[];
        let currentLoginUser=JSON.parse(localStorage.getItem("currentLogin"));
        dataArray=JSON.parse(localStorage.getItem("Data"));
        if(currentLoginUser && currentLoginUser.role==="Employee"){
            newDataArray=dataArray.filter((res,index)=>{
                if(res.email===currentLoginUser.email){
                    res.Issues=<Link onClick={this.routeToIssue.bind(this,index)} to={`/home/${res.userId}`}>Click here</Link>
                    return res
                }
            });
            return newDataArray
        }
        else if(currentLoginUser && currentLoginUser.role==="HelpDesk Engineer"){
            newDataArray=dataArray.filter((res,index)=>{
                if(res.role!="Admin" && res.role!="HelpDesk Engineer"){
                    res.Issues=<Link onClick={this.routeToIssue.bind(this,index)} to={`/home/${res.userId}`}>Click here</Link>
                    return res
                }
            });
            return newDataArray
        }
        else if(currentLoginUser){
            newDataArray=dataArray.filter((res,index)=>{
                if(res.email!=currentLoginUser.email && res.role!="Admin"){
                    res.Issues=<Link onClick={this.routeToIssue.bind(this,index)} to={`/home/${res.userId}`}>Click here</Link>
                }
                return res
              }
            );
            return newDataArray
        }
        
        else{
            return dataArray;
        }
        // return JSON.parse(localStorage.getItem("Data"));
      }

    deleteRows=()=>{
        let updarray=[...this.state.rows];
        this.state.rows.forEach((obj1,index)=>{
            this.state.deletedRowsArray.forEach(obj2=>{
                if(obj1.userId===obj2.userId){
                    updarray[index]=null;
                }  
            })
        });
        this.setState({
            rows:updarray.filter(res=>{if(res!=null){return res}}),
            deleteButtonDisable:true,
            updateButtonDisable:true
        });                  
    }
    render() {
        let customValidation={email:{function:this.customEmailvalidation.bind(this)},
        userId:{function:this.customUserIdValidation.bind(this)}};
        let actionButton={text:this.state.submitButtonText, clickEvent:this.dialogCustomButtonClick}
        return (
            <div>
                {
                    this.state.loginStatus ?
                    <div>
                    <Link onClick={this.logout} className="logout-user" to="/">Logout</Link>
                    <div ref={this.myRef}>home</div>
                    </div>
                    :
                    <Link style={LinkStyle} to="/">Sign Up</Link>
                }
                <Router>
                    <Route path="/home/aboutus" render={()=>(<AboutUs heading={this.state.aboutUs}/>)} />
                    <Route path="/home/contactus" render={()=>(<ContactUs heading={this.state.aboutUs}/>)} />
                    <Link to="/home/aboutus">About Us</Link>
                    <Link to="/home/contactus">Contact Us</Link>
                </Router>
                <TableComponent setDeleteItem={this.deletedItem} keyProp="userId" rows={this.state.rows} column={this.state.columnKeys} size="medium"></TableComponent>
                {this.state.loginStatus && JSON.parse(localStorage.getItem("currentLogin")).role==="Admin" ?
                <div>
                <Button variant="contained" onClick={this.addRow} style={useStyles.button}>ADD</Button>
                <Button variant="contained" color="primary" onClick={this.updateRow} disabled={this.state.updateButtonDisable} style={useStyles.button}>UPDATE</Button>
                <Button variant="contained" onClick={this.deleteRows} color="secondary" disabled={this.state.deleteButtonDisable}
                style={useStyles.button}>{this.state.deletedRowsArray.length>1?"DELETE MULTIPLE":"DELETE"}</Button></div>
                :
                <div className="crud-text">Please Login to Enable CRUD, OR MAY BE YOU ARE NOT THE ADMIN</div>}
                <DialogComponent button={actionButton} dialogTitle={this.state.dialogTitle} dialogClosedStatus={this.dialogClosedStatus} 
                content={<RUCforms submit={this.state.triggerSubmit} submitButton={false} custom={customValidation} formOutput={this.formData}
                form={this.state.addDialogForm}/>} dialogStatus={this.state.dialogStatus}/>
           </div>
        )
    }
}

export default Home

