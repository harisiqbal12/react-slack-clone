import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ColorPanel from '../FrontendUtils/ColorPanel';
import SidePanel from '../FrontendUtils/SidePanel';
import Messages from '../FrontendUtils/Messages';
import MetaPanel from '../FrontendUtils/MetaPanel';
import { selectAuthenticatedUser } from '../../redux/user/selector';
import { selectCurrentChannel } from '../../redux/channels/selector';

const Homepage = ({ currentChannel, currentUser }) => {
	let channel = {};

	currentChannel.payload ? channel = currentChannel : channel = {};

	return (
		<Grid
			columns='equal'
			className='app'
			style={{ background: '#1e1e1c', color: '#fff' }}>
			<ColorPanel />
			<SidePanel />

			<Grid.Column style={{ marginLeft: 320 }}>
				<Messages currentUser={currentUser} currentChannel={channel} />
			</Grid.Column>

			<Grid.Column width={4}>
				<MetaPanel />
			</Grid.Column>
		</Grid>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectAuthenticatedUser,
	currentChannel: selectCurrentChannel,
});

export default connect(mapStateToProps)(Homepage);
