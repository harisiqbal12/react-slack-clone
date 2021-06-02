import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import firebase from './Firebase/firebase';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import Homepage from './Components/Homepage/Homepage';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import { selectAuthenticatedUser, selectLoader } from './redux/user/selector';
import {
	getAuthenticatedUserFromDatabase,
	setLoaderFalse,
	clearUser,
} from './redux/user/action';
import Spinner from './Components/FrontendUtils/Spinner';

import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
	componentDidMount() {
		const { setAuthenticatedUser, setLoadingToFalse } = this.props;

		firebase.auth().onAuthStateChanged(user => {
			if (!user) {
				this.props.history.push('/login');
				setLoadingToFalse();
				return;
			}

			console.log('true there is user');
			setTimeout(() => {
				this.props.history.push('/');
				setAuthenticatedUser();
				setLoadingToFalse();
			}, 1200);
		});
	}
	render() {
		return this.props.isLoading ? (
			<Spinner />
		) : (
			<Switch>
				<Route exact path='/' component={Homepage} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
			</Switch>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	setAuthenticatedUser: user => dispatch(getAuthenticatedUserFromDatabase(user)),
	setLoadingToFalse: () => dispatch(setLoaderFalse()),
	clearUser: () => dispatch(clearUser()),
});

const mapStateToProps = createStructuredSelector({
	authenticatedUser: selectAuthenticatedUser,
	isLoading: selectLoader,
});

const AppWithAuth = withRouter(App);

export default connect(mapStateToProps, mapDispatchToProps)(AppWithAuth);
