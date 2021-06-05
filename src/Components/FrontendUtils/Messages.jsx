import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MessagesHeader from './MessagesHeader';
import MessagesForm from './MessagesForm';
import firebase from '../../Firebase/firebase';
import Message from './Message';
import { setLoaderTrue, setLoaderFalse } from '../../redux/user/action';
import { displayChats } from '../../redux/channels/action';
import { selectIsDisplayChats } from '../../redux/channels/selector';
import { selectLoader } from '../../redux/user/selector';

import './frontEndUtils.scss';
import Spinner from './Spinner';

class Messages extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			messagesRef: firebase.database().ref('messages'),
			user: this.props.currentUser,
			messages: [],
			messagesLoading: true,
			channel: this.props.currentChannel.payload,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.currentChannel.payload.id !== this.props.currentChannel.payload.id
		) {
			console.log('trueeeeee');
			this.setState({ channel: nextProps.currentChannel.payload }, () => {
				this.addeventListener(this.state.channel.id);
				console.log(this.state.channel);
			});
		}
	}

	componentDidMount() {
		console.log('component mounted');
		this.addeventListener(this.state.channel.id);
	}

	componentWillUnmount() {
		this.removeListeners();
	}

	removeListeners = () => {
		this.state.messagesRef.off();
	};

	addeventListener = channelId => {
		this.props.setLoadingTrue();
		console.log('event listenerss');
		console.log(channelId);
		this.addMessageListener(channelId);
	};

	addMessageListener = channelId => {
		console.log(channelId);
		let loadedMessages = [];
		this.state.messagesRef.child(channelId).on('child_added', snap => {
			loadedMessages.push(snap.val());
			console.log(loadedMessages);
			this.setState({
				messages: loadedMessages,
				messagesLoading: false,
			});
		});

		this.props.setLoadingFalse();
	};

	displayMessages = messages => {
		console.log(messages.length);
		console.log(messages)
		return (
			messages.length > 0 &&
			messages.map(message => (
				<Message
					key={message.timestamp}
					message={message}
					user={this.state.user}
					channel={this.state.channel}
				/>
			))
		);
	};

	render() {
		const { messagesRef, messages, channel } = this.state;
		console.log(this.props.currentChannel);

		return (
			<React.Fragment>
				<MessagesHeader channel={channel} />

				<Segment className='messages'>
					<Comment.Group>{this.displayMessages(messages)}</Comment.Group>
				</Segment>

				<MessagesForm currentChannel={channel} messagesRef={messagesRef} />
			</React.Fragment>
		);
	}
}

const mapDispatchtoProps = dispatch => ({
	setLoadingTrue: () => dispatch(setLoaderTrue()),
	setLoadingFalse: () => dispatch(setLoaderFalse()),
	displayChats: () => dispatch(displayChats()),
});

const mapStateToProps = createStructuredSelector({
	isDisplayChats: selectIsDisplayChats,
	isLoading: selectLoader,
});

export default connect(mapStateToProps, mapDispatchtoProps)(Messages);
