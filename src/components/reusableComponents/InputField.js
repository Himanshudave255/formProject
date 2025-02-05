import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';

class InputField extends Component {
    constructor(props){
        super(props);
        this.state={
            config:this.props.config
        }
    }
    render() {
        return (
            <React.Fragment>
            <TextField
                type={this.props.config.type? this.props.config.type :"text"}
                id={this.props.config.id?this.props.config.id:""}
                error={this.props.config.error?this.props.config.error:false}
                label={this.props.config.label?this.props.config.label:""}
                fullWidth
                disabled={this.props.config.disable?this.props.config.disable:false}
                placeholder={this.props.config.placeholder?this.props.config.placeholder:""}
                className={this.props.config.className?this.props.config.className:""}
                onChange={this.props.onChange}
                value={this.props.config.value?this.props.config.value:""}
                name={this.props.config.name?this.props.config.name:""}
                margin="normal"
                helperText={this.props.config.helperText?this.props.config.helperText:""}
                variant={this.props.config.variant?this.props.config.variant:"outlined"}
                />
        </React.Fragment>
        )
    }
}

export default InputField

