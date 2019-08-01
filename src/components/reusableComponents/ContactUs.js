import React ,{useState} from 'react';
import Button from '@material-ui/core/Button';
import history from '../../history';
import { Route, Link, Router, Redirect, Switch } from 'react-router-dom';
import WriteToUs from './WriteToUs';
import App from '../../App';
function ContactUs(props) {
    function writeUs(){
		history.push("/writetous");
	}
    return (
        <div>
            {props.heading}
            <Button onClick={writeUs.bind(this)}>Write to us</Button>
        </div>
    )   
}
export default ContactUs
