import React from 'react';
import { Menu } from 'semantic-ui-react';

import UserPanel from './UserPanel';
import Channels from './Channels';
import { selectAuthenticatedUser } from '../../redux/user/selector';
import { selectCurrentChannel } from '../../redux/channels/selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

class SidePanel extends React.Component {
	state = {
		channel: undefined,
	};

	render() {
		return (
			<Menu
				size='large'
				fixed='left'
				vertical
				style={{ background: '#e07a5f', fontSize: '1.2rem' }}>
				<UserPanel />
				<Channels display />
			</Menu>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	currentChannel: selectCurrentChannel,
});

export default connect(mapStateToProps)(SidePanel);
