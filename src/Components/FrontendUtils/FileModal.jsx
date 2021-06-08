import React from 'react';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';
import mime from 'mime-types';

import { showSnackBar } from '../../redux/channels/action';
import { selectShowSnackBar } from '../../redux/channels/selector';

import './frontEndUtils.scss';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

class FileModal extends React.Component {
	state = {
		file: null,
		modal: false,
		authorized: ['image/jpeg', 'image/png'],
	};

	addFile = evt => {
		const file = evt.target.files[0];
		file && this.setState({ file });
		console.log(file);
	};

	sendFile = () => {
		const { file } = this.state;
		const { setSnackBar, uploadFile, closeModal } = this.props;
		const properties = {
			message: 'No File Found',
			snackBarSeverity: 'error',
		};

		!file && setSnackBar(properties) && closeModal();

		if (file && this.isAuthorized(file.name)) {
			// send file
			const metadata = { contentType: mime.lookup(file.name) };
			console.log(metadata);

			uploadFile(file, metadata);
			closeModal();
			this.clearFile();
			setSnackBar({
				message: 'File uploaded successfully',
				snackBarSeverity: 'success',
			});
		}
	};

	clearFile = () => this.setState({ file: null });

	isAuthorized = filename =>
		this.state.authorized.includes(mime.lookup(filename));

	render() {
		const { closeModal, modal } = this.props;

		console.log(this.props.snackBar);
		return (
			<Modal basic open={modal} onClose={closeModal}>
				<Modal.Header>Select an Image File</Modal.Header>
				<Modal.Content>
					<Input
						onChange={this.addFile}
						fluid
						label='File types: jpg, png'
						name='file'
						type='file'
					/>
				</Modal.Content>
				<Modal.Actions>
					<Button
						onClick={this.sendFile}
						style={{ border: 'none', outline: 'none' }}
						className='modal-send__button'>
						<Icon name='checkmark' /> Send
					</Button>
					<Button className='modal-cancel__button' onClick={closeModal}>
						<Icon name='remove' /> Cancel
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	setSnackBar: properties => dispatch(showSnackBar(properties)),
});

const mapStateToProsp = createStructuredSelector({
	snackBar: selectShowSnackBar,
});

export default connect(mapStateToProsp, mapDispatchToProps)(FileModal);
