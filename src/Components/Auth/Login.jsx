import React from 'react';
import firebase from '../../Firebase/firebase';
import { connect } from 'react-redux';
import {
	Grid,
	Form,
	Segment,
	Button,
	Header,
	Message,
	Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import CustomizedSnackbars from '../FrontendUtils/Snackbar';
import {
	getAuthenticatedUserFromDatabase,
	setLoaderFalse,
	setLoaderTrue,
} from '../../redux/user/action';
import './login-register.scss';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			loading: false,
			errors: [''],
			open: false,
			snackBarSeverity: '',
			userRef: firebase.database().ref('users'),
		};
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = async e => {
		e.preventDefault();
		this.setState({ loading: true });

		const { email, password } = this.state;

		const { authenticatedUser } = this.props;
		try {
			//saving user to database
			const signedInUser = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password);
			this.setState({
				loading: false,
				open: true,
				errors: ['Account Login Successfully'],
				snackBarSeverity: 'success',
			});

			authenticatedUser(signedInUser);
			// console.log(user);
		} catch (err) {
			console.log(err);
			this.setState({
				errors: [err.message],
				loading: false,
				open: true,
				snackBarSeverity: 'error',
			});
		}
	};

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({
			open: false,
		});
	};

	render() {
		const { email, password, loading } = this.state;

		return (
			<Grid textAlign='center' verticalAlign='middle' className='app login-form'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h1' icon style={{ color: '#2a9d8f' }} textAlign='center'>
						<Icon name='code branch' />
						Login To DevChat
					</Header>
					<Form onSubmit={this.handleSubmit} size='large'>
						<Segment stacked className='segment'>
							<Form.Input
								fluid
								required
								name='email'
								icon='mail'
								iconPosition='left'
								placeholder='email address'
								type='email'
								onChange={this.handleChange}
								value={email}
								style={{ color: '#2a9d8f' }}
							/>
							<Form.Input
								fluid
								required
								name='password'
								icon='lock'
								iconPosition='left'
								placeholder='Password'
								type='password'
								onChange={this.handleChange}
								value={password}
								style={{ color: '#2a9d8f' }}
							/>

							<Button
								className={loading && 'loading'}
								type='submit'
								style={{ backgroundColor: '#2a9d8f', color: 'white' }}
								fluid
								disabled={loading}>
								Submit
							</Button>
						</Segment>
					</Form>
					<Message>
						Create A Account?{' '}
						<Link className='link-to-register' to='/register'>
							Register
						</Link>
					</Message>

					<CustomizedSnackbars
						open={this.state.open}
						message={this.state.errors[0]}
						handleClose={this.handleClose}
						snackBarSeverity={this.state.snackBarSeverity}
					/>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	authenticatedUser: user => dispatch(getAuthenticatedUserFromDatabase(user)),
	setLoadingToTrue: () => dispatch(setLoaderTrue()),
	setLoadingToFalse: () => dispatch(setLoaderFalse()),
});

export default connect(null, mapDispatchToProps)(Login);
