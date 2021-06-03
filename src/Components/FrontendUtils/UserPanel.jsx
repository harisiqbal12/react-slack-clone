import React from 'react';
import firebase from '../../Firebase/firebase';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';

import CustomizedSnackbars from './Snackbar';
import { selectAuthenticatedUser, selectLoader } from '../../redux/user/selector';
import {
	setLoaderTrue,
	clearUser,
	setLoaderFalse,
} from '../../redux/user/action';

import './frontEndUtils.scss';


class UserPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			message: [''],
			snackBarSeverit: '',
		};
	}

	dropdownOptions = user => [
		{
			key: user,
			text: (
				<span>
					Signed in as <strong>{user}</strong>
				</span>
			),
			disabled: true,
		},
		{
			key: 'avatar',
			text: <span>Change Avatar</span>,
		},
		{
			key: 'signout',
			text: <span onClick={this.handleSignout}>Sign out</span>,
		},
	];

	handleSignout = async () => {
		try {
			this.props.setLoadingTrue();
			await firebase.auth().signOut();
			this.props.setClearUser();
			this.props.setLoadingFalse();
		} catch (err) {
			console.log('Handle signout');
			console.log(err);
			this.setState({
				open: true,
				message: [err.message],
				snackBarSeverit: 'error',
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
		let selectAuthenticatedUser = '';
		this.props.selectAuthenticatedUser.user
			? (selectAuthenticatedUser = this.props.selectAuthenticatedUser.user)
			: (selectAuthenticatedUser = this.props.selectAuthenticatedUser);
		console.log(selectAuthenticatedUser);

		const { displayName, photoURL } = selectAuthenticatedUser;
		console.log(this.props.displayName);

		return (
			<Grid style={{ background: '#4c3c4c' }}>
				<Grid.Column>
					<Grid.Row style={{ padding: '1.2rem', margin: 0 }}>
						<Header inverted floated='left' as='h2'>
							<Icon name='code' />
							<Header.Content>Dev Chat</Header.Content>
						</Header>

						<Header style={{ padding: '0.25rem' }} as='h4' inverted>
							<Dropdown
								trigger={
									<span>
										<Image src={photoURL} spaced='right' avatar />
										{displayName}
									</span>
								}
								options={this.dropdownOptions(displayName)}
							/>
						</Header>
					</Grid.Row>

					<CustomizedSnackbars
						open={this.state.open}
						message={this.state.message[0]}
						handleClose={this.handleClose}
						snackBarSeverit={this.state.snackBarSeverit}
					/>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	isLoading: selectLoader,
	selectAuthenticatedUser: selectAuthenticatedUser,
});

const mapDispatchToprops = dispatch => ({
	setLoadingTrue: () => dispatch(setLoaderTrue()),
	setLoadingFalse: () => dispatch(setLoaderFalse()),
	setClearUser: () => dispatch(clearUser()),
});

export default connect(mapStateToProps, mapDispatchToprops)(UserPanel);
