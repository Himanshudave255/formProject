import React, { Component } from 'react'
import AboutUs from '../reusableComponents/AboutUs';
import ContactUs from '../reusableComponents/ContactUs';
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom';
import {myContext} from '../../App';
const LinkStyle = {
    float: 'right',
    marginTop: -40
  };
class Home extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state={
            loginStatus:props.loginStatus,
            aboutUs:props.loginStatus?"We are an IT company since 1996":"Please Login to see this content"
        }
    }
    componentDidMount(){
        if(this.myRef.current){
        this.myRef.current.style.fontSize="50px";
        }
    }
    static getDerivedStateFromProps(props,state){
        if(props.loginStatus!=state.loginStatus){
            return {
                loginStatus:props.loginStatus
            }
        }
        return null;
    }
    aboutus=()=>{
        this.props.history.push('/aboutus');
    }
    render() {
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
           </div>
        )
    }
}

export default Home
