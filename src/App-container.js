import { connect } from 'react-redux';
import App from './App';
import * as actionTypes from './store/action';

const mapStateToProps = state => {
	return {
		loggedInState: state.loggedIn,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLoggedIn: status => dispatch({ type: actionTypes.ADD_CURRENT_USER }),
		onLoggedOut: status => dispatch({ type: actionTypes.REMOVE_CURRENT_USER }),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);