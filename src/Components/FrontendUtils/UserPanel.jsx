import React from 'react';
import firebase from '../../Firebase/firebase';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';
import CustomizedSnackbars from './Snackbar';
import { selectLoader } from '../../redux/user/selector';
import {
	setLoaderTrue,
	setLoaderFalse,
	clearUser,
} from '../../redux/user/action';
class UserPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = { open: false, message: [''], snackBarSeverit: '' };
	}

	dropdownOptions = () => [
		{
			key: 'user',
			text: (
				<span>
					Signed in as <strong>User</strong>
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
			await firebase.auth().signOut();
			this.setState({
				open: true,
				message: ['Signout Successfully'],
				snackBarSeverit: 'success',
			});

			this.props.clearUser();
		} catch (err) {
			this.setState({
				open: true,
				message: [err.messages],
				snackBarSeverit: 'error',
			});
			console.log(err);
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
		return (
			<Grid style={{ background: '#4c3c4c' }}>
				<Grid.Column>
					<Grid.Row style={{ padding: '1.2rem', margin: 0 }}>
						<Header inverted floated='left' as='h2'>
							<Icon name='code' />
							<Header.Content>Dev Chat</Header.Content>
						</Header>
					</Grid.Row>

					<Header style={{ padding: '0.25rem' }} as='h4' inverted>
						<Dropdown
							trigger={<span>user</span>}
							options={this.dropdownOptions()}
						/>
					</Header>
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
});

const mapDispatchToprops = dispatch => ({
	setLoadingToTrue: dispatch(setLoaderTrue()),
	setLoadingToFasle: dispatch(setLoaderFalse()),
	clearUser: dispatch(clearUser()),
});

export default connect(mapStateToProps, mapDispatchToprops)(UserPanel);
