import React from 'react';
import { Sidebar, Menu, Button, Divider } from 'semantic-ui-react';

class ColorPanel extends React.Component {
	render() {
		return (
			<Sidebar
				as={Menu}
				icon='labeled'
				inverted
				verticle
				visible
				width='very thin'>
				<Divider>
					<Button
						icon='add'
						size='small'
						compact
						color='blue'
						style={{ height: '2.5rem', backgroundColor: '#e07a5f' }}
					/>
				</Divider>
			</Sidebar>
		);
	}
}

export default ColorPanel;
