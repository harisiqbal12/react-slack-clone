import React from 'react';
import moment from 'moment';
import { Comment, Image } from 'semantic-ui-react';

import './frontEndUtils.scss';

const isOwnMessage = (message, user) => {
	return message.user.id === user.uid ? 'message__self' : '';
};

const isImage = message => {
	console.log(message.image);
	return message.hasOwnProperty('image');
};

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user }) => {
	console.log(message);

	return (
		<Comment>
			<Comment.Avatar src={message.user.avatar} />
			<Comment.Content className={isOwnMessage(message, user)}>
				<Comment.Author style={{ color: '#e07a5f' }} as='a'>
					@{message.user.name}
				</Comment.Author>
				<Comment.Metadata style={{ color: '#2a9d8f' }}>
					{timeFromNow(message.timestamp)}
				</Comment.Metadata>
				{isImage(message) ? (
					<Image
						src={message.image}
						className='message__image'
					/>
				) : (
					<Comment.Text style={{ color: 'white' }}>
						{message.content}
					</Comment.Text>
				)}
			</Comment.Content>
		</Comment>
	);
};

export default Message;
