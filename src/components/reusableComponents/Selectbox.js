import React, { Component } from 'react'
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const style={
    formControl: {
        width: '100%',
      }
}
class Selectbox extends Component {
    constructor(props){
        super(props);
        this.state={
            config:this.props.config
        }
    }
    render() {
        return (
            <React.Fragment>
            <FormControl
            margin="normal"
            variant={this.props.config.variant?this.props.config.variant:"outlined"}
            id={this.props.config.id?this.props.config.id:""}
            style={style.formControl} className={this.props.config.className?this.props.config.className:""}
            disabled={this.props.config.disable?this.props.config.disable:false}
            error={this.props.config.error?this.props.config.error:false}>
            <InputLabel>{this.props.config.label?this.props.config.label:""}</InputLabel>
            <Select
            value={this.props.config.value?this.props.config.value:""}
            onChange={this.props.onChange}
            input={this.props.config.variant==="outlined"?<OutlinedInput name={this.props.config.name?this.props.config.name:this.props.config.id}/>
            :<Input name={this.props.config.name?this.props.config.name:this.props.config.id}/>}
            >
            {
                this.props.config.placeholder ? <MenuItem value="" disabled>{this.props.config.placeholder}</MenuItem>:null
            }
            {
                this.props.config.options?
                this.props.config.options.map((value,index)=>{
                    return <MenuItem key={index} value={value}>{value}</MenuItem>
                }):null
            }
            </Select>
            <FormHelperText>{this.props.config.helperText?this.props.config.helperText:""}</FormHelperText>
            </FormControl>    
            </React.Fragment>
        )
    }
}

export default Selectbox

