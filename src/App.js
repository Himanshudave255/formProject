import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/HeaderComponent/Header';
import RUCforms from './components/RUCformsComponent/RUCforms';
import Home from './components/HomeComponent/Home-container';
import { Route, Link, Router, Redirect, Switch } from 'react-router-dom';
import AboutUs from './components/reusableComponents/AboutUs';
import Data from './data/home.json';
import InputField from './components/reusableComponents/InputField';
import DialogComponent from './components/reusableComponents/DialogComponent';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import * as actionTypes from './store/action';
import Button from '@material-ui/core/Button';
import history from './history';
import WriteToUs from './components/reusableComponents/WriteToUs';

export const myContext = React.createContext();

const styleSheet = {
	issueArray: {
		width: '100%',
		display: 'inline-flex',
	},
	inputField: {
		padding: 10,
	},
	statusLable: {
		marginTop: 37,
	},
};

class App extends Component {
	constructor(props) {
		localStorage.setItem('Data', JSON.stringify(Data.data));
		super(props);
		this.firstRef = React.createRef('hello');
		this.state = {
      customButton:{customActionButtonText:"Add Issue",disable:false},
			dialogStatus: false,
			contentArrayForIssues: undefined,
			issueArrayIndex: null,
			issueArray: undefined,
			heading: 'Sign Up',
			issueObj: {
				label: 'enter your issue',
				placeholder: 'enter your issue',
				value: '',
				name: 'newIssue',
				className: 'input-field-issue',
			},
			loginUserStatus: false,
			form: {
				//1st object
				name: {
					value: '',
					id: 'name',
					type: 'text',
					label: 'Enter you name',
					placeholder: 'Enter Name',
					className: 'text-field',
					margin: 'normal',
					helperText: { success: 'Enter you name', fail: 'Invalid name' },
					status: false,
					validators: { required: false, minLength: 5, maxLength: 20 },
					variant: 'outlined',
				},
				//2nd object

				email: {
					value: '',
					id: 'email',
					type: 'text',
					label: 'Enter Email',
					placeholder: 'Enter Email',
					className: 'text-field',
					margin: 'normal',
					helperText: { success: 'Enter you email id', fail: 'Invalid Email Id' },
					status: false,
					validators: { required: false, minLength: 5, email: true, maxLength: 50, custom: true },
					variant: 'outlined',
				},

				//3rd object
				password: {
					value: '',
					id: 'password',
					type: 'password',
					label: 'Password',
					placeholder: 'Enter Email',
					className: 'text-field',
					margin: 'normal',
					helperText: { success: 'Enter you password', fail: 'Invalid Password' },
					status: false,
					validators: { required: true, minLength: 2, maxLength: 8 },
					variant: 'outlined',
				},

				designation: {
					value: '',
					id: 'designation',
					type: 'text',
					label: 'Enter your designation',
					placeholder: 'Enter designation',
					className: 'text-field',
					margin: 'normal',
					helperText: { success: 'Enter you designation', fail: 'Invalid designation' },
					status: false,
					validators: { required: false, minLength: 2, maxLength: 50, custom: false },
					variant: 'outlined',
				},

				userId: {
					value: '',
					id: 'userId',
					type: 'text',
					label: 'Enter you userId',
					placeholder: 'Enter userId',
					className: 'text-field',
					margin: 'normal',
					helperText: { success: 'Enter you userId', fail: 'User Id should not be registered' },
					status: false,
					validators: { required: true, minLength: 2, maxLength: 10, custom: true },
					variant: 'outlined',
				},

				role: {
					value: '',
					id: 'role',
					type: 'select',
					label: 'Enter you role',
					placeholder: 'Enter role',
					className: 'text-field',
					margin: 'normal',
					helperText: { success: 'Enter you current role', fail: 'Please select a role' },
					options: ['Employee', 'Admin', 'HelpDesk Engineer'],
					status: false,
					validators: { required: true },
					variant: 'outlined',
				},
			},
			loginForm: {
				email: {
					value: '',
					id: 'email',
					type: 'text',
					label: 'Enter Email',
					placeholder: 'Enter Email',
					className: 'text-field',
					margin: 'normal',
					helperText: { success: 'Enter you email id', fail: 'Invalid Email Id' },
					status: false,
					validators: { required: false, minLength: 5, email: true, maxLength: 50, custom: true },
					variant: 'outlined',
				},
				//2nd object
				password: {
					value: '',
					id: 'password',
					type: 'password',
					label: 'Password',
					placeholder: 'Enter Email',
					className: 'text-field',
					margin: 'normal',
					helperText: { success: 'Enter you password', fail: 'Invalid Password' },
					status: false,
					validators: { required: true, minLength: 2, maxLength: 8 },
					variant: 'outlined',
				},
			},
		};
		this.changeEventForAdd = this.changeEventForAdd.bind(this);
	}

	componentDidUpdate(x, y) {
		// this.prop.history.location="/"
	}

	customEmailvalidation(value) {
		if (value.includes('.co.in')) {
			return false;
		} else {
			return true;
		}
	}
	customUserIdValidation(value) {
		let data = this.getLocalStorageData();
		let filterData = data.find(res => {
			if (res.userId === value) {
				return res;
			}
		});
		if (filterData) {
			return true;
		} else {
			return false;
		}
	}

	linkToLogin = () => {
		this.setState({
			heading: 'ENTER LOGIN DETAILS',
		});
	};

	signupFormData = (status, formValue) => {
		if (formValue) {
			let empData = this.getLocalStorageData();
			empData.push(formValue);
			localStorage.setItem('Data', JSON.stringify(empData));
			localStorage.setItem('currentLogin', JSON.stringify(formValue));
			this.props.onLoggedIn(true);
			this.setState(
				{
					loginUserStatus: true,
					heading: 'Welcome ' + formValue.name,
				},
				() => this.navigateToHome()
			);
		}
	};

	navigateToHome() {}

	userLoggedOut = logoutStatus => {
		this.props.onLoggedOut(false);
		this.setState({
			loginUserStatus: !logoutStatus,
			heading: 'Sign Up',
		});
	};

	getLocalStorageData() {
		return JSON.parse(localStorage.getItem('Data'));
	}

	loginFormOutput = (status, value) => {
		let findValue;
		if (status) {
			let employeeDetailsArray = this.getLocalStorageData();
			findValue = employeeDetailsArray.find(obj => {
				if (obj.email === value.email && obj.password === value.password) {
					return obj;
				}
			});
		}
		if (findValue) {
			localStorage.setItem('currentLogin', JSON.stringify(findValue));
			this.props.onLoggedIn(true);
			this.setState({
				loginUserStatus: true,
				heading: 'Welcome ' + findValue.name,
			});
		} else {
			alert('Wrong Email and password');
			history.push('/');
		}
	};
	dialogClosedStatus = () => {
		this.setState({
			dialogStatus: false,
			issueObj: { ...this.state.issueObj, value: '' },
		});
	};

	currentOpenIssue = (currentIssueOpenobj, indexForUpdate) => {
		this.setState(
			{
				issueArray: currentIssueOpenobj.issueArray
					? currentIssueOpenobj
					: { ...currentIssueOpenobj, issueArray: [] },
				issueArrayIndex: indexForUpdate,
				dialogStatus: true,
			},
			() => {
				this.setNewArrayOfIssues();
			}
		);
	};
	changeEvent(index, event) {
		this.setState(
			{
				issueArray: {
					...this.state.issueArray,
					issueArray: this.state.issueArray.issueArray.map((res, index1) => {
						if (index === index1) {
							res[event.target.name] =
								event.target.type === 'checkbox' ? event.target.checked : event.target.value;
						}
						return res;
					}),
				},
			},
			() => {
				this.setNewArrayOfIssues();
			}
		);
	}

	changeEventForAdd(event) { 
		this.setState(
			{
        issueObj: { ...this.state.issueObj, value: event.target.value },
        customButton:{...this.state.customButton,customActionButtonText:event.target.value?"UPDATE ISSUES":"ADD ISSUE",disable:event.target.value?false:true},
			},
			() => {
				this.setState({
					contentArrayForIssues: this.state.contentArrayForIssues.map((res, index) => {
						if (index === this.state.contentArrayForIssues.length - 1) {
							res = (
								<InputField
									key={index}
									onChange={this.changeEventForAdd.bind(this)}
									config={this.state.issueObj}
								/>
							);
						}
						return res;
					}),
				});
			}
		);
	}

	setNewArrayOfIssues() {
		let user = this.loggedInUserRole();
		let loggedInUser = user.role;
		let issueObj;
		this.setState({
			contentArrayForIssues: this.state.issueArray.issueArray.map((res, index) => {
				issueObj = {
					issue: {
						label: 'issue',
						placeholder: 'issue',
						disable: loggedInUser === 'HelpDesk Engineer' ? true : false,
						className: 'input-field-issue',
						name: 'issue',
					},
					assigned: {
						label: 'assigned person',
						disable: loggedInUser === 'Admin' ? false : true,
						placeholder: 'assigner',
						className: 'input-field-issue',
						name: 'assigned',
					},
					status: {
						disable: res.assigned != user.name && loggedInUser === 'HelpDesk Engineer' ? true : false,
					},
				};
				issueObj['issue'].value = res.issue;
				issueObj['assigned'].value = res.assigned;
				return (
					<div style={styleSheet.issueArray} key={index}>
						<InputField onChange={this.changeEvent.bind(this, index)} config={issueObj.issue} />
						<InputField onChange={this.changeEvent.bind(this, index)} config={issueObj.assigned} />
						<Checkbox
							name="status"
							disabled={issueObj.status.disable}
							checked={res.status}
							onChange={this.changeEvent.bind(this, index)}
						/>
						<label style={styleSheet.statusLable}>{res.status ? 'OPEN' : 'CLOSED'}</label>
					</div>
				);
			}),
		});
	}
	loggedInUserRole() {
		return JSON.parse(localStorage.getItem('currentLogin'));
	}
	linkToHome() {
		history.push('/home');
  }
  addDataToLocalStorage(){
  let data = this.getLocalStorageData();
		if (this.state.issueObj.value) {
			this.state.issueArray.issueArray = [
				...this.state.issueArray.issueArray,
				{ issue: this.state.issueObj.value, status: true, assigned: '' },
			];
		}
    data[this.state.issueArrayIndex].issueArray = this.state.issueArray.issueArray;
    localStorage.setItem('Data', JSON.stringify(data));
  }

	dialogCustomButtonClick = (text) => {
    if(text==="Add Issue"){
		this.setState({
      customButton:{...this.state.customButton,disable:true},
			contentArrayForIssues: [
        ...this.state.contentArrayForIssues,
				<InputField
					onChange={this.changeEventForAdd.bind(this)}
					key={this.state.contentArrayForIssues.length}
					config={this.state.issueObj}
				/>,
			],
    });
  }
  else{
    debugger
    this.setState({
      customButton:{...this.state.customButton,customActionButtonText:"Add Issue"},
      issueObj:{...this.state.issueObj,value:""}
    });
    this.addDataToLocalStorage();
  }
	};
	render() {
		let actionButton = { text: this.state.customButton.customActionButtonText,disable:this.state.customButton.disable,clickEvent: this.dialogCustomButtonClick.bind(this,this.state.customButton.customActionButtonText) };
		let customValidation = {
			email: { function: this.customEmailvalidation.bind(this) },
			userId: { function: this.customUserIdValidation.bind(this) },
		};
		return (
			<div className="App">
				{this.props.location.pathname != '/login' ? (
					<Header heading={this.state.heading} />
				) : (
					<Header heading="ENTER LOGIN DETAILS" />
				)}
				<Router history={history}>
        <Route path="/writetous" render={()=>(<WriteToUs counterValue=""/>)} />
					<Route
						path="/login"
						render={() => (
							<div>
								<RUCforms
									submitButtonText="LOGIN"
									formClass="sign-up-class"
									custom={customValidation}
									form={this.state.loginForm}
									formOutput={this.loginFormOutput}
								/>
								<Button onClick={this.linkToHome.bind(this)} color="primary">
									Skip SignIn For Now
								</Button>
							</div>
						)}
					/>
					<Route
						exact
						path="/"
						render={() => (
							<div>
								<Link onClick={this.linkToLogin} to="/login">
									Already a user, Login In
								</Link>
								<RUCforms
									submitButtonText="SIGN UP"
									formClass="sign-up-class"
									custom={customValidation}
									form={this.state.form}
									formOutput={this.signupFormData}
								/>
							</div>
						)}
					/>
					<myContext.Provider value="this is impetus, an IT company.">
						<Route
							path="/home"
							render={() => (
								<Home
									history={this.props.history}
									openIssue={this.currentOpenIssue}
									logoutStatus={this.userLoggedOut}
									loginStatus={this.props.loggedInState}
								/>
							)}
						/>
						<Route
							exact
							path="/home/:userId"
							render={() => (
								<DialogComponent
									button={this.loggedInUserRole().role === 'Employee' ? actionButton : null}
									dialogTitle="My issues"
									dialogClosedStatus={this.dialogClosedStatus}
									content={
										this.state.issueArray &&
										this.state.contentArrayForIssues &&
										this.state.contentArrayForIssues.length != 0 ? (
											this.state.contentArrayForIssues
										) : (
											<div>No current Issues</div>
										)
									}
									dialogStatus={this.state.dialogStatus}
								/>
							)}
						/>
					</myContext.Provider>
					{this.props.loggedInState ? (
						<div>
							<Redirect
								to={{
									pathname: '/home',
								}}
							/>
						</div>
					) : null}
				</Router>
			</div>
		);
	}
}

export default App;
