import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Segment, Button, Input } from 'semantic-ui-react';
import { uuid } from 'uuidv4';

import { selectAuthenticatedUser } from '../../redux/user/selector';
import CustomizedSnackbars from './Snackbar';
import firebase from '../../Firebase/firebase';
import FileModal from './FileModal';
import {
	selectShowSnackBar,
	selectSnackBarPropeties,
} from '../../redux/channels/selector';
import { closeSnackBar } from '../../redux/channels/action';

class MessagesForm extends React.Component {
	state = {
		uploadState: '',
		uplaodTask: null,
		message: '',
		loading: false,
		snackBarOpen: false,
		snackBarSeverity: '',
		errors: [''],
		channel: '',
		user: '',
		modal: false,
		storageRef: firebase.storage().ref(),
		percentUploaded: 0,
	};

	openModal = () => this.setState({ modal: true });
	closeModal = () => this.setState({ modal: false });

	componentDidMount() {
		this.setState({
			channel: this.props.currentChannel,
			user: this.props.currentUser,
		});
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	createMessage = (fileUrl = null) => {
		// console.log('function run');
		// console.log(this.state.user.displayName);
		// console.log(this.state.user.photoURL);
		const message = {
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			content: this.state.message,
			channelId: this.props.currentChannel.id,
			user: {
				id: this.state.user.uid,
				name: this.state.user.displayName,
				avatar: this.state.user.photoURL,
			},
		};

		if (fileUrl !== null) {
			message['image'] = fileUrl;
		} else {
			message['content'] = this.state.message;
		}

		console.log('messagess');
		console.log(message);

		return message;
	};

	sendMessage = async () => {
		const { messagesRef, currentChannel } = this.props;

		this.setState({ loading: true });
		console.log(currentChannel.id);

		try {
			await messagesRef.child(currentChannel.id).push().set(this.createMessage());
			this.setState({ loading: false, message: '' });
		} catch (error) {
			console.log(error);
			this.setState({
				snackBarOpen: true,
				snackBarSeverity: 'error',
				errors: [error.message],
				loading: false,
			});
		}
	};

	handleSnackBarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.props.closeSnackBarFunc();
		this.setState({
			snackBarOpen: false,
		});
	};

	uploadFile = (file, metadata) => {
		const pathToUpload = this.state.channel.id;
		const ref = this.props.messagesRef;
		const filepath = `chat/public/${uuid()}.jpg`;

		this.setState(
			{
				uploadState: 'uploading',
				uplaodTask: this.state.storageRef.child(filepath).put(file, metadata),
			},
			() => {
				this.state.uplaodTask.on(
					'state_changed',
					snap => {
						const percentUploaded =
							Math.round(snap.bytesTransferred / snap.totalBytes) * 100;

						this.setState({ percentUploaded });
					},
					err => {
						console.log(err);
						this.setState({
							errors: [err.message],
							uploadState: 'error',
							uplaodTask: null,
						});
					},
					() => {
						this.state.uplaodTask.snapshot.ref
							.getDownloadURL()
							.then(downloadUrl => {
								console.log();
								this.sendFileMessage(downloadUrl, ref, pathToUpload);
							})
							.catch(err => {
								console.log(err);
								this.setState({
									errors: [err.message],
									uploadState: 'error',
									uplaodTask: null,
								});
							});
					}
				);
			}
		);
	};

	sendFileMessage = (fileUrl, ref, pathToUpload) => {
		ref
			.child(pathToUpload)
			.push()
			.set(this.createMessage(fileUrl))
			.then(() => {
				this.setState({ uploadState: 'done' });
			})
			.catch(err => {
				console.log(err);
				this.setState({
					errors: [err.message],
				});
			});
	};
	render() {
		const {
			message,
			loading,
			snackBarOpen,
			snackBarSeverity,
			errors,
			modal,
			percentUploaded,
		} = this.state;

		const { isSnackBar, snackBarPropeties } = this.props;

		console.log('percent upload: ' + percentUploaded);
		return (
			<Segment className='message__form'>
				<CustomizedSnackbars
					open={snackBarOpen}
					message={errors[0]}
					handleClose={this.handleSnackBarClose}
					snackBarSeverity={snackBarSeverity}
					verticle='top'
				/>
				<Input
					fluid
					name='message'
					onChange={this.handleChange}
					style={{ marginBottom: '0.7em' }}
					label={<Button icon='add' />}
					labelPosition='left'
					placeholder='Write your message'
					value={message}
				/>

				<Button.Group icon widths='2'>
					<Button
						style={{ backgroundColor: '#e07a5f' }}
						content='Sent'
						labelPosition='left'
						icon='angle double right'
						onClick={this.sendMessage}
						disabled={(message.length === 0 && true) || loading}
						loading={loading}
					/>
					<Button
						color='teal'
						onClick={this.openModal}
						style={{ backgroundColor: '#2a9d8f' }}
						content='Uplaod Media'
						labelPosition='right'
						icon='cloud upload'
					/>
					<FileModal
						uploadFile={this.uploadFile}
						modal={modal}
						closeModal={this.closeModal}
					/>
				</Button.Group>
				<CustomizedSnackbars
					open={isSnackBar}
					message={snackBarPropeties.message}
					snackBarSeverity={snackBarPropeties.snackBarSeverity}
					handleClose={this.handleSnackBarClose}
					verticle='top'
				/>
			</Segment>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectAuthenticatedUser,
	isSnackBar: selectShowSnackBar,
	snackBarPropeties: selectSnackBarPropeties,
});

const mapDispatchToProps = dispatch => ({
	closeSnackBarFunc: () => dispatch(closeSnackBar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesForm);
