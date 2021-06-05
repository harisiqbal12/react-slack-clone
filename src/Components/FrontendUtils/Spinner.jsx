import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

const Spinner = ({ title = 'Preparing Chat...', isInverted = false }) => (
	<Dimmer active  style={{ backgroundColor: '#2A2A28' }}>
		<Loader inverted size='huge' content={title} />
	</Dimmer>
);

export default Spinner;
