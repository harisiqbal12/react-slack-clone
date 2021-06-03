import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';

import MessagesHeader from './MessagesHeader';
import MessagesForm from './MessagesForm';
import firebase from '../../Firebase/firebase';

import './frontEndUtils.scss';

class Messages extends React.Component {
	state = {
		messagesRef: firebase.database().ref('messages'),
		user: this.props.currentUser,
		channel: null,
	};

	static getDerivedStateFromProps(props, state) {
		return {
			channel: props.currentChannel,
		};
	}

	componentDidMount() {}

	addListeners = channelId => {
		this.addMessageListener(channelId);
	};

	addMessageListener = channelId => {
		let loadedMessages = [];
		this.state.messagesRef.child(channelId).on('child_added', snapshot => {
			loadedMessages.push(snapshot.val());

			console.log(loadedMessages);
		});
	};

	render() {
		const { messagesRef, channel } = this.state;
		if (channel.payload) {
			console.log('haris');

			this.addListeners(channel.payload.id);
		}
		// console.log(channel);
		return (
			<React.Fragment>
				<MessagesHeader />

				<Segment className='messages'>
					<Comment.Group>{/* Messages */}</Comment.Group>
				</Segment>

				<MessagesForm currentChannel={channel} messagesRef={messagesRef} />
			</React.Fragment>
		);
	}
}

export default Messages;
