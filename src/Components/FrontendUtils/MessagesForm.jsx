import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Segment, Button, Input } from 'semantic-ui-react';

import { selectAuthenticatedUser } from '../../redux/user/selector';
import CustomizedSnackbars from './Snackbar';
import firebase from '../../Firebase/firebase';

class MessagesForm extends React.Component {
	state = {
		message: '',
		loading: false,
		snackBarOpen: false,
		snackBarSeverity: '',
		errors: [''],
		channel: '',
		user: '',
	};

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

	createMessage = () => {
		// console.log('function run');
		// console.log(this.state.user.displayName);
		// console.log(this.state.user.photoURL);
		const message = {
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			content: this.state.message,
			user: {
				id: this.state.user.uid,
				name: this.state.user.displayName,
				avatar: this.state.user.photoURL,
			},
		};

		return message;
	};

	sendMessage = async () => {
		const { messagesRef, currentChannel } = this.props;

		this.setState({ loading: true });

		console.log(currentChannel.payload.id);
		try {
			await messagesRef
				.child(currentChannel.payload.id)
				.push()
				.set(this.createMessage());
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

		this.setState({
			snackBarOpen: false,
		});
	};

	render() {
		const { message, loading, snackBarOpen, snackBarSeverity, errors } =
			this.state;
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
						color='orange'
						content='Sent'
						labelPosition='left'
						icon='angle double right'
						onClick={this.sendMessage}
						disabled={(message.length === 0 && true) || loading}
						loading={loading}
					/>
					<Button
						color='teal'
						content='Uplaod Media'
						labelPosition='right'
						icon='cloud upload'
					/>
				</Button.Group>
			</Segment>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectAuthenticatedUser,
});

export default connect(mapStateToProps)(MessagesForm);
