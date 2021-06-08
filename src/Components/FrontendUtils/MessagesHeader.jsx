import React from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

class MessageHeader extends React.Component {
	countUser = () => {
		const { messages } = this.props;
		const rawUsersId = messages.map(message => message.user.id);
		const usersId = rawUsersId.filter(
			(id, index) => id !== rawUsersId[index + 1]
		);

		return usersId.length;
	};

	render() {
		return (
			<Segment clearing>
				{/* Channel Title  */}
				<Header fluid='true' as='h2' floated='left' style={{ marginBottm: 0 }}>
					<span style={{ color: '#e07a5f' }}>{this.props.channel.name}</span>
					<Header.Subheader style={{ color: '#2a9d8f' }}>
						users {this.countUser()}
					</Header.Subheader>
				</Header>

				{/* channel search */}
				<Header floated='right'>
					<Input
						size='mini'
						icon='search'
						name='searchTerm'
						placeholder='Search Messages'
					/>
				</Header>
			</Segment>
		);
	}
}

export default MessageHeader;
