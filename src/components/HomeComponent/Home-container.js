import Home from './Home';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		loginStatusFromRedux: state.loggedIn,
	};
};

export default connect(mapStateToProps)(Home);