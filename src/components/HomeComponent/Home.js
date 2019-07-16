import React, { Component } from 'react'
import AboutUs from '../reusableComponents/AboutUs';
import ContactUs from '../reusableComponents/ContactUs';
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Data from '../../data/home.json';
import { makeStyles } from '@material-ui/core/styles';
import {myContext} from '../../App';
import TableComponent from '../reusableComponents/TableComponent';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Login from '../LoginComponent/Login';
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
            addDialogForm:{
                //1st object
                name:{value:"",id:"name",type:"text",label:"Enter your first name", placeholder:"Enter First Name" ,className:"text-field",margin:"normal",
                helperText:{success:'Enter you First name',fail:'Invalid First Name'},
                status:false,validators:{required:true,minLength:2,email:false,maxLength:20,custom:false},variant:"standard"},
                //2nd object
                surname:{value:"",id:"surname",type:"text",label:"surname", placeholder:"Enter surname",className:"text-field",margin:"normal",
                helperText:{success:'Enter you surname',fail:'Invalid surname'},
                status:false,validators:{required:true,minLength:2,maxLength:8},variant:"standard"},
                //3rd object
                designation:{value:"",id:"designation",type:"text", label:"Enter you designation", placeholder:"Enter designation" ,className:"text-field",margin:"normal",
                helperText:{success:'Enter you designation',fail:'Invalid designation'},
                status:false,validators:{required:true}, variant:"standard"},
                //4th object
                experience:{value:"",id:"experience",type:"text",label:"experience", placeholder:"Enter experience",className:"text-field",margin:"normal",
                helperText:{success:'Enter you experience',fail:'experience is required'},
                status:false,validators:{required:true},variant:"standard"},

                department:{value:"",id:"department",type:"text",label:"department", placeholder:"Enter department",className:"text-field",margin:"normal",
                helperText:{success:'Enter you department',fail:'Enter valid department'},
                status:false,validators:{required:true},variant:"standard"},

                age:{value:"",id:"age",type:"text",label:"age", placeholder:"Enter your age",className:"text-field",margin:"normal",
                helperText:{success:'Enter you age',fail:'Enter valid age'},
                status:false,validators:{maxLength:3},variant:"standard"},

                id:{value:"",id:"id",type:"number",label:"id", placeholder:"Enter your id",className:"text-field",margin:"normal",
                helperText:{success:'Enter you id',fail:'Enter valid id'},
                status:false,validators:{maxLength:10},variant:"standard"}  
            },
            rows:[],
            deletedRowsArray:[],
            columnKeys:[],
            newRow:{},
            updateButtonDisable:true,
            deleteButtonDisable:true
        }
    }
    componentDidMount(){
        if(this.myRef.current){
        this.myRef.current.style.fontSize="25px";
        }
        this.loadEmployeeData();
    }
    loadEmployeeData(){
        let jsonData=[];
        let keys;
        keys=Object.keys(Data.data[0]);
        this.setState({
            rows:Data.data,
            columnKeys:["name","surname","designation","experience","department","age"]
        });
    }
    createData(name, id, surname, designation, experience, department) {
        return { name:name, id:id, surname:surname, designation:designation, experience:experience, department:department }
    }
    static getDerivedStateFromProps(props,state){
        if(props.loginStatus!=state.loginStatus){
            return {
                loginStatus:props.loginStatus
            }
        }
        return null;
    }
    addRow=()=>{
        this.setState({
            dialogStatus: true
          });
    }

    formData=(status,formValue)=>{
         this.setState({
            newRow:{name:formValue.name, id:formValue.id, surname:formValue.surname, designation:formValue.designation, experience:formValue.experience, department:formValue.department, age:formValue.age?formValue.age:null},
            dialogStatus:false
        });
      }

    dialogClosedStatus=()=>{
        this.setState({
            dialogStatus: false
          });
    }

    dialogCustomButtonClick=(status)=>{
        this.setState({
            triggerSubmit:true    
        });
    }
    
    aboutus=()=>{
        this.props.history.push('/aboutus');
    }
    deletedItem=(arrayOfDeletedItem)=>{
        console.log("del",arrayOfDeletedItem);
        this.setState({
            deletedRowsArray:arrayOfDeletedItem,
            deleteButtonDisable:arrayOfDeletedItem.length?false:true
        });
    }

    deleteRows=()=>{
        let arr=[];
        this.state.rows.forEach(obj1=>
            this.state.deletedRowsArray.forEach(obj2=>{
                if(obj1.id!=obj2.id){
                    // if(!arr.includes(obj2)){
                    arr.push(obj2);
                    // }
                }
            })
        )
        this.setState({
            rows:arr  
        });           
    }
    render() {
        const actionButton={text:"ADD data", clickEvent:this.dialogCustomButtonClick}
        return (
            <div>
                <Router>
                    <Route path="/aboutus" render={()=>(<AboutUs heading={this.state.aboutUs}/>)} />
                    <Route path="/contactus" render={()=>(<ContactUs heading={this.state.aboutUs}/>)} />
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/contactus">Contact Us</Link>
                </Router>
                {
                    this.state.loginStatus ?
                    <div>
                    <div ref={this.myRef}>home</div> 
                    </div>
                    :
                    <Link style={LinkStyle} to="/">Sign Up</Link>
                }
                <TableComponent setDeleteItem={this.deletedItem} rows={this.state.rows} column={this.state.columnKeys} size="medium" addData={this.state.newRow}></TableComponent>
                <Button variant="contained" onClick={this.addRow} style={useStyles.button}>ADD</Button>
                <Button variant="contained" color="primary" disabled={this.state.updateButtonDisable} style={useStyles.button}>UPDATE</Button>
                <Button variant="contained" onClick={this.deleteRows} color="secondary" disabled={this.state.deleteButtonDisable} style={useStyles.button}>{this.state.deletedRowsArray.length>1?"DELETE MULTIPLE":"DELETE"}</Button>
                <DialogComponent button={actionButton} dialogTitle="ADD DATA" dialogClosedStatus={this.dialogClosedStatus} content={<Login submit={this.state.triggerSubmit} submitButton={false} submitButtonText="ADD DATA" formOutput={this.formData} form={this.state.addDialogForm}/>} dialogStatus={this.state.dialogStatus}/>
           </div>
        )
    }
}

export default Home
