import React from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';

import CustomizedSnackbars from './Snackbar';
import firebase from '../../Firebase/firebase';
import { selectAuthenticatedUser } from '../../redux/user/selector';

import './frontEndUtils.scss';
import { connect } from 'react-redux';

class Channels extends React.Component {
	state = {
		channels: [],
		modal: false,
		channelName: '',
		channelDetails: '',
		snackBarOpen: false,
		message: [''],
		snackBarSeverity: '',
		channelsRef: firebase.database().ref('channels'),
		loading: false,
	};

	closeModal = () => this.setState({ modal: false });
	openModal = () => this.setState({ modal: true });

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	addChannel = async () => {
		try {
			const { displayName, photoURL } = this.props.selectAuthenticatedUser;
			const { channelsRef, channelName, channelDetails } = this.state;
			console.log(displayName);
			console.log(this.props.selectAuthenticatedUser);
			const key = (await channelsRef.push()).key;

			const newChannel = {
				id: key,
				name: channelName,
				details: channelDetails,
				createdBy: {
					user: displayName,
					avatar: photoURL,
				},
			};

			await channelsRef.child(key).update(newChannel);

			this.setState({
				channelName: '',
				channelDetails: '',
			});

			this.closeModal();
			this.setState({
				snackBarOpen: true,
				message: [`${this.state.channelName} Created Successfully`],
				snackBarSeverity: 'success',
				loading: false,
			});
		} catch (error) {
			console.log(error);
			this.closeModal();
			this.setState({
				snackBarOpen: true,
				message: [error.message],
				snackBarSeverity: 'error',
				loading: false,
			});
		}
	};

	handleSubmit = event => {
		event.preventDefault();
		this.setState({
			loading: true,
		});
		if (!this.isFormValid()) {
			this.closeModal();
			this.setState({
				snackBarOpen: true,
				message: ['Channel Name And Details Can Not Be Empty'],
				snackBarSeverity: 'error',
				loading: false,
			});
			return;
		}

		this.addChannel();
	};

	isFormValid = () => {
		const { channelName, channelDetails } = this.state;
		return (channelName.length && channelDetails.length) > 1;
	};

	handleSnackBarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({
			snackBarOpen: false,
		});
	};

	render() {
		const { channels, modal, snackBarOpen, message, snackBarSeverity, loading } =
			this.state;

		return (
			<React.Fragment>
				<Menu.Menu style={{ paddingBottom: '2em' }}>
					<Menu.Item>
						<span>
							<Icon name='exchange' /> Channels{' '}
						</span>
						({channels.length}){' '}
						<Icon
							name='add'
							style={{ cursor: 'pointer' }}
							onClick={this.openModal}
						/>
					</Menu.Item>
					{/* All Channels */}
				</Menu.Menu>
				{/* // Add Channel Modal */}
				<Modal basic open={modal} onClose={this.closeModal}>
					<Modal.Header>Add A Channel</Modal.Header>
					<Modal.Content>
						<Form onSubmit={this.handleSubmit}>
							<Form.Field>
								<Input
									fluid
									label='Name of channel'
									name='channelName'
									onChange={this.handleChange}
								/>
							</Form.Field>
							<Form.Field>
								<Input
									fluid
									label='About The Channel'
									name='channelDetails'
									onChange={this.handleChange}
								/>
							</Form.Field>
						</Form>
					</Modal.Content>

					<Modal.Actions>
						<Button
							className={loading && 'loading'}
							color='green'
							inverted
							disabled={loading}
							onClick={this.handleSubmit}>
							<Icon name='checkmark' /> Add
						</Button>
						<Button onClick={this.closeModal} color='red' inverted>
							<Icon name='remove' /> Cancel
						</Button>
					</Modal.Actions>
				</Modal>
				<CustomizedSnackbars
					open={snackBarOpen}
					message={message[0]}
					handleClose={this.handleSnackBarClose}
					snackBarSeverity={snackBarSeverity}
				/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	selectAuthenticatedUser: selectAuthenticatedUser,
});

export default connect(mapStateToProps)(Channels);