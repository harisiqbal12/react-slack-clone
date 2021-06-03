import React from 'react';
import { connect } from 'react-redux';
import firebase from '../../Firebase/firebase';
import md5 from 'md5';
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
import { createStructuredSelector } from 'reselect';

import {
	selectUserCredential,
	selectIsPasswordConfirmValid,
	selectIsUserEmpty,
	selectPasswordLength,
} from '../../redux/user/selector';
import {
	getUserCredential,
	checkUserValidation,
	checkUserInputEmpty,
	checkUserValidationPasswordLength,
	getAuthenticatedUserFromDatabase,
} from '../../redux/user/action';
import CustomizedSnackbars from '../FrontendUtils/Snackbar';

import './login-register.scss';

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirm: '',
			startTyping: false,
			loading: false,
			errors: [''],
			open: false,
			snackBarSeverity: '',
			userRef: firebase.database().ref('users'),
		};
	}

	handleChange = e => {
		const {
			userCredential,
			validatePasswordConfirm,
			validateUserEmpty,
			validatePasswordLength,
		} = this.props;

		this.setState(
			{
				[e.target.name]: e.target.value,
			},
			() => {
				const user = {
					username: this.state.username,
					email: this.state.email,
					password: this.state.password,
					passwordConfirm: this.state.passwordConfirm,
				};
				userCredential(user);
				validatePasswordConfirm();
				validateUserEmpty();
				validatePasswordLength();
			}
		);

		if (e.target.name === 'password') this.setState({ startTyping: true });
	};

	handleSubmit = async e => {
		e.preventDefault();
		const { isPasswordConfirmValid, isPasswordLessThanEight, authenticatedUser } =
			this.props;

		if (!isPasswordConfirmValid || isPasswordLessThanEight)
			return alert('Error Occured');

		const { email, password } = this.state;

		this.setState({ loading: true });

		try {
			
			const user = await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password);

			await user.user.updateProfile({
				displayName: this.state.username,
				photoURL: `http://gravatar.com/avatar/${md5(
					user.user.email
				)}?d=identicon`,
			});

			//saving user to database
			await this.saveUser(user);
			console.log('user saved to database');

			this.setState({
				loading: false,
				open: true,
				errors: ['Account Created Successfully'],
				snackBarSeverity: 'success',
			});

			authenticatedUser(user);
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

	saveUser = createdUser =>
		this.state.userRef.child(createdUser.user.uid).set({
			name: createdUser.user.displayName,
			avatar: createdUser.user.photoURL,
		});

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({
			open: false,
		});
	};

	render() {
		const { isPasswordConfirmValid, isPasswordLessThanEight } = this.props;

		const { username, email, password, passwordConfirm, loading } = this.state;

		return (
			<Grid textAlign='center' verticalAlign='middle' className='app'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h1' icon style={{ color: '#2a9d8f' }} textAlign='center'>
						<Icon name='puzzle piece' />
						Register For DevChat
					</Header>
					<Form onSubmit={this.handleSubmit} size='large'>
						<Segment stacked className='segment'>
							<Form.Input
								fluid
								required
								name='username'
								icon='user'
								iconPosition='left'
								placeholder='Username'
								type='text'
								onChange={this.handleChange}
								value={username}
								style={{ color: '#2a9d8f' }}
							/>
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
								className={`${
									this.state.errors.some(error =>
										error.toLowerCase().includes('email')
									)
										? 'show-validation'
										: ''
								}`}
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
								className={`${
									this.state.startTyping && isPasswordLessThanEight
										? 'show-validation'
										: ''
								}`}
							/>
							<Form.Input
								fluid
								required
								name='passwordConfirm'
								icon='repeat'
								iconPosition='left'
								placeholder='Confirm Password'
								type='password'
								onChange={this.handleChange}
								value={passwordConfirm}
								style={{ color: '#2a9d8f' }}
								className={`${
									this.state.startTyping && isPasswordLessThanEight
										? 'show-validation'
										: ''
								}`}
							/>

							<Button
								className={loading && 'loading'}
								type='submit'
								fluid
								disabled={loading}
								style={{ backgroundColor: '#2a9d8f' }}>
								Submit
							</Button>
						</Segment>
					</Form>
					<Message>
						Already a user?{' '}
						<Link className='link-to-register' to='/login'>
							Login
						</Link>
					</Message>
					{this.state.startTyping ? (
						<Message>
							{isPasswordConfirmValid && !isPasswordLessThanEight ? (
								<span style={{ color: '#2a9d8f' }}>
									{isPasswordLessThanEight
										? 'Password matched'
										: 'Password Matched'}
								</span>
							) : (
								<span style={{ color: '#e63946' }}>
									{isPasswordLessThanEight
										? 'Password is less than eight'
										: !isPasswordConfirmValid
										? 'Password not matched'
										: 'Password Matched'}
								</span>
							)}
						</Message>
					) : (
						''
					)}
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
	userCredential: user => dispatch(getUserCredential(user)),
	validatePasswordConfirm: () => dispatch(checkUserValidation()),
	validateUserEmpty: () => dispatch(checkUserInputEmpty()),
	validatePasswordLength: () => dispatch(checkUserValidationPasswordLength()),
	authenticatedUser: user => dispatch(getAuthenticatedUserFromDatabase(user)),

});

const mapStateToProps = createStructuredSelector({
	getUser: selectUserCredential,
	isPasswordConfirmValid: selectIsPasswordConfirmValid,
	isUserEmpty: selectIsUserEmpty,
	isPasswordLessThanEight: selectPasswordLength,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
