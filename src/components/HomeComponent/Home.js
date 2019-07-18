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
import RUCforms from '../RUCformsComponent/RUCforms';
import DialogComponent from '../reusableComponents/DialogComponent';
// import AutoComplete  from '@material-ui/AutoComplete';
// import SearchBar from 'material-ui-search-bar';
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
                surname:{value:"",id:"surname",type:"text",label:"surname", placeholder:"Enter surname",className:"text-field",margin:"normal",
                helperText:{success:'Enter you surname',fail:'Invalid surname'},
                status:false,validators:{required:true,minLength:2},variant:"standard"},
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
        let obj={name:formValue.name, id:formValue.id, surname:formValue.surname, designation:formValue.designation,
            experience:formValue.experience, department:formValue.department, age:formValue.age?formValue.age:""};
         if(!this.state.updateButtonDisable){
            updatedArray=this.state.rows.map(res=>{
                 if(res.id===formValue.id){
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
    
    aboutus=()=>{
        this.props.history.push('/aboutus');
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
                addDialogForm:{...formData,
                name:{...formData.name,value:arrayOfDeletedItem[0].name},
                surname:{...formData.surname,value:arrayOfDeletedItem[0].surname},
                designation:{...formData.designation,value:arrayOfDeletedItem[0].designation},
                experience:{...formData.experience,value:arrayOfDeletedItem[0].experience},
                department:{...formData.department,value:arrayOfDeletedItem[0].department},
                age:{...formData.age,value:arrayOfDeletedItem[0].age},
                id:{...formData.id,value:arrayOfDeletedItem[0].id,disable:true}
            }
            })
        }
    }

    deleteRows=()=>{
        let updarray=[...this.state.rows];
        this.state.rows.forEach((obj1,index)=>{
            this.state.deletedRowsArray.forEach(obj2=>{
                if(obj1.id===obj2.id){
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
        let actionButton={text:this.state.submitButtonText, clickEvent:this.dialogCustomButtonClick}
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
                {/* <SearchBar onChange={() => console.log('onChange')} onRequestSearch={() => console.log('onRequestSearch')}/> */}
                <TableComponent setDeleteItem={this.deletedItem} rows={this.state.rows} column={this.state.columnKeys} size="medium"></TableComponent>
                <Button variant="contained" onClick={this.addRow} style={useStyles.button}>ADD</Button>
                <Button variant="contained" color="primary" onClick={this.updateRow} disabled={this.state.updateButtonDisable} style={useStyles.button}>UPDATE</Button>
                <Button variant="contained" onClick={this.deleteRows} color="secondary" disabled={this.state.deleteButtonDisable} style={useStyles.button}>{this.state.deletedRowsArray.length>1?"DELETE MULTIPLE":"DELETE"}</Button>
                <DialogComponent button={actionButton} dialogTitle={this.state.dialogTitle} dialogClosedStatus={this.dialogClosedStatus} 
                content={<RUCforms submit={this.state.triggerSubmit} submitButton={false} formOutput={this.formData}
                form={this.state.addDialogForm}/>} dialogStatus={this.state.dialogStatus}/>
           </div>
        )
    }
}

export default Home

