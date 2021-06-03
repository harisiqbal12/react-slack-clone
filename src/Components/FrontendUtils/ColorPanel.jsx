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
						style={{ height: '2.5rem' }}
						color='blue'
					/>
				</Divider>
			</Sidebar>
		);
	}
}

export default ColorPanel;
