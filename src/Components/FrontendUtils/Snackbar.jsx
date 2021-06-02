import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
	root: {
		background: 'black',
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
	alert: {
		backgroundColor: '#ff7096',
	},
	alertSuccess: {
		backgroundColor: '#2a9d8f',
	},
}));

export default function CustomizedSnackbars(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Snackbar
				open={props.open}
				autoHideDuration={1200}
				onClose={props.handleClose}
				className={
					props.snackBarSeverity === 'success'
						? classes.alertSuccess
						: classes.alert
				}
			>
				<Alert
					className={
						props.snackBarSeverity === 'success'
							? classes.alertSuccess
							: classes.alert
					}
					onClose={props.handleClose}
				>
					{props.message}
				</Alert>
			</Snackbar>
		</div>
	);
}
