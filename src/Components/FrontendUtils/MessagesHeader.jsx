import React from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

class MessageHeader extends React.Component {
	render() {
		return (
			<Segment clearing>

        {/* Channel Title  */}
				<Header fluid='true' as='h2' floated='left' style={{ marginBottm: 0 }}>
					<span>
						{this.props.channel.name}
						<Icon name={'star outline'} color='black' />
					</span>
					<Header.Subheader>2 Users</Header.Subheader>
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
