import React from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

class MessageHeader extends React.Component {
	render() {
		return (
			<Segment clearing>
				{/* Channel Title  */}
				<Header fluid='true' as='h2' floated='left' style={{ marginBottm: 0 }}>
					<span style={{ color: '#e07a5f' }}>
						{this.props.channel.name}
					</span>
					<Header.Subheader style={{ color: '#2a9d8f' }}>
						2 Users
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
