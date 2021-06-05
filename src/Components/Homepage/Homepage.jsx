import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ColorPanel from '../FrontendUtils/ColorPanel';
import SidePanel from '../FrontendUtils/SidePanel';
import Messages from '../FrontendUtils/Messages';
import MetaPanel from '../FrontendUtils/MetaPanel';
import { selectAuthenticatedUser } from '../../redux/user/selector';
import { selectCurrentChannel } from '../../redux/channels/selector';
import Spinner from '../FrontendUtils/Spinner';
import Channels from '../FrontendUtils/Channels';

const Homepage = ({ currentChannel, currentUser }) => {
	const [displayMessages, setDisplayMessages] = useState(false);
	console.log('homepage');
	console.log(displayMessages);

	return (
		<React.Fragment>
			<Channels display={false} />

			<Grid
				columns='equal'
				className='app'
				style={{ background: '#1e1e1c', color: '#fff' }}>
				<ColorPanel />
				<SidePanel />

				<Grid.Column style={{ marginLeft: 320 }}>
					{currentChannel.payload ? (
						<Messages currentChannel={currentChannel} currentUser={currentUser} />
					) : (
						<div></div>
					)}
				</Grid.Column>

				<Grid.Column width={4}>
					<MetaPanel />
				</Grid.Column>
			</Grid>
		</React.Fragment>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectAuthenticatedUser,
	currentChannel: selectCurrentChannel,
});

export default connect(mapStateToProps)(Homepage);
