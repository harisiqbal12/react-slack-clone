import React from 'react';
import { Grid } from 'semantic-ui-react';

import ColorPanel from '../FrontendUtils/ColorPanel';
import SidePanel from '../FrontendUtils/ColorPanel';
import Messages from '../FrontendUtils/ColorPanel';
import MetaPanel from '../FrontendUtils/ColorPanel';

const Homepage = () => (
	<Grid columns="equal" className="app" style={{ background: '#1e1e1c', color: '#fff' }}>
		<ColorPanel />
		<SidePanel />

		<Grid.Column style={{ marginLeft: 320 }}>
			<Messages />
		</Grid.Column>

		<Grid.Column width={4}>
			<MetaPanel />
		</Grid.Column>
	</Grid>
);

export default Homepage;
