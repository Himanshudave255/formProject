import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputField from '../reusableComponents/InputField';
import './Login.css';
const styles={
    button:{
        margin:10
    }
};
class Login extends Component {
    constructor (props) {
        super(props);
        this.state={
            valid:false,
            formValues:{},
            form:props.form,
            elements:[]
         }
         this.setFormObject();
    }
    static getDerivedStateFromProps(props,state){
        return null;
    }
    setFormObject(){
        const states = {...this.state.form } ;
        for(let i=0;i<Object.keys(states).length;i++){
            let key=Object.keys(states)[i];
            this.state.elements.push({
            config:{
            id:states[key].id,
            error:states[key].status || false,
            type:states[key].type,
            label:states[key].label,
            placeholder:states[key].placeholder,
            className:states[key].className,
            value:states[key].value,
            margin:states[key].margin,
            helperText:!states[key].status?states[key].helperText.success:states[key].helperText.fail,
            variant:states[key].variant,
            validators:states[key].validators,status:states[key].status
            },
            eventChange:states[key].id
         });
        }
    }
    submit=(event)=>{
        let key="";
        let counter=0;
        let updatedStatus=true;
        event.preventDefault();
        for(let i=0;i<this.state.elements.length;i++){
            key =this.state.elements[i].config.id;
            updatedStatus = this.checkValidation(this.state.elements[i].config.id,this.state.elements[i].config.value);
            this.setFormState(updatedStatus,this.state.elements[i].eventChange,this.state.elements[i].config.value);
            this.state.formValues[key]=this.state.elements[i].config.value;
            if(!updatedStatus){
                counter++;
            }
        }
        this.setFormValidStatus(counter);        
    }

    setFormValidStatus(counter){
        if(counter === this.state.elements.length){
            this.setState({
                valid:true
            },()=>{
                this.props.formOutput(true,this.state.formValues);
            });
        }
    }

    changeEvent(type,event){
        let updatedStatus=this.checkValidation(type,event.currentTarget.value);
        this.setFormState(updatedStatus,type,event.currentTarget.value);
    }

    setFormState(updatedStatus,type,value){
        const arr= this.state.elements.map(item=>{
            if(item.config.id === type){
                 item.config.value=value;
                 item.config.status=updatedStatus;
                 item.config.error=updatedStatus || false;
                 item.config.helperText=!item.config.error?this.state.form[type].helperText.success:this.state.form[type].helperText.fail;
            }
            return item;
        });
       this.setState({
           elements:arr
       });
    }

    checkValidation(type,value){
        let status=false;
        let validators=this.state.form[type].validators;
        if(Object.keys(validators).length){
            if(validators.required){
                if(value.length>0){
                    status=false;
                }
                else{
                    return true;
                }
            }
            if(validators.email && value.length!==0){
                if(value.includes("@")){
                    status=false;
                }
                else{
                    return true;
                }
            }
            if(validators.minLength && value.length!==0){
                if(value.length>validators.minLength){
                      status=false;
                 }
                 else{
                     return true;
                 }
            }
            if(validators.maxLength && value.length!==0){
                if(value.length<validators.maxLength){
                       status=false;
                 }
                 else{
                     return true;
                 }
            }
            if(validators.custom){
                status = this.props.custom[type].function(value);
            }
        }
        return status;
    }

    render() {
        return (
            <div>
                <div className="login">
                <form className="form">
                {this.state.elements.map((value,index) => {
                    return <InputField key={index} config={value.config} onChange={this.changeEvent.bind(this,value.eventChange)}></InputField>
                })}
                <Button type="submit" onClick={this.submit} variant="contained" style={styles.button} className="text-field" color="primary">Submit</Button>
                </form>
                </div>
            </div>
        )
    }
}
export default  Login