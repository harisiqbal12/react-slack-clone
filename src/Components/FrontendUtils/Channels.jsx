import React from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';

import CustomizedSnackbars from './Snackbar';
import firebase from '../../Firebase/firebase';
import { selectAuthenticatedUser } from '../../redux/user/selector';
import { setCurrentChannel } from '../../redux/channels/action';
import { setLoaderFalse, setLoaderTrue } from '../../redux/user/action';

import './frontEndUtils.scss';

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
		firstLoad: true,
		activeChannel: '',
	};

	componentDidMount() {
		this.addListeners();
	}

	componentWillUnmount() {
		this.removeListeners();
	}

	removeListeners = () => {
		this.state.channelsRef.off();
	};

	addListeners = async () => {
		let loadedChannels = [];
		this.state.channelsRef.on('child_added', snap => {
			loadedChannels.push(snap.val());
			this.setState({ channels: loadedChannels }, () => {
				this.setFirstChannel();
				this.props.setCurrentChannel(this.state.channels[0]);
				console.log('channel id');
				console.log(this.state.channels[0].id);
			});
		});
	};

	setFirstChannel = () => {
		const firstChannel = this.state.channels[0];
		if (this.state.firstLoad && this.state.channels.length > 0) {
			this.props.setCurrentChannel(firstChannel);
			this.setState({ activeChannel: firstChannel.id });
		}

		this.setState({ firstLoad: false });
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
				message: [`Created Successfully`],
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

	changeChannel = channel => {
		console.log('haris');

		this.setActiveChannel(channel);
		console.log(channel);
		this.props.setCurrentChannel(channel);
		console.log(channel);
		// console.log('channels channelsssss');
		// this.addMessageListeners(channel.id);
	};

	addMessageListeners = channelId => {
		let loadedMessages = [];
		console.log('message listeners')

		this.state.messagesRef.child(channelId).on('child_added', snap => {
			loadedMessages.push(snap.val());
			console.log(loadedMessages);
			console.log('completed')
		});

		console.log('message listners')
	};

	setActiveChannel = channel => {
		this.setState({ activeChannel: channel.id });
	};

	displayChannels = channels => {
		return (
			channels.length > 0 &&
			channels.map(channel => (
				<Menu.Item
					className='channels'
					key={channel.id}
					onClick={() => this.changeChannel(channel)}
					name={channel.name}
					style={{ opacity: 0.7 }}
					active={channel.id === this.state.activeChannel}>
					# {channel.name}
				</Menu.Item>
			))
		);
	};

	render() {
		const { channels, modal, snackBarOpen, message, snackBarSeverity, loading } =
			this.state;

		return this.props.display ? (
			<React.Fragment>
				<Menu.Menu className='userpanel' style={{ paddingBottom: '2em' }}>
					<Menu.Item className='userpanel-menu'>
						<span>
							<Icon style={{ color: 'white' }} name='exchange' /> Channels{' '}
						</span>
						({channels.length}){' '}
						<Icon
							name='add'
							style={{ cursor: 'pointer' }}
							onClick={this.openModal}
						/>
					</Menu.Item>

					{this.displayChannels(channels)}
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
							className={(loading && 'loading', 'modal-send__button')}
							disabled={loading}
							onClick={this.handleSubmit}>
							<Icon name='checkmark' /> Add
						</Button>
						<Button className='modal-cancel__button' onClick={this.closeModal}>
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
		) : (
			<div></div>
		);
	}
}

const mapDispatchToprops = dispatch => ({
	setCurrentChannel: channel => dispatch(setCurrentChannel(channel)),
	setLoaderTrue: () => dispatch(setLoaderTrue()),
	setLoaderFalse: () => dispatch(setLoaderFalse()),
});

const mapStateToProps = createStructuredSelector({
	selectAuthenticatedUser: selectAuthenticatedUser,
});

export default connect(mapStateToProps, mapDispatchToprops)(Channels);
