import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles(theme => ({
	root: {
		background: 'black',
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
		position: 'relative',
		top: '10rem',
	},
	alert: {
		backgroundColor: '#ff7096 !important',
	},
	alertSuccess: {
		backgroundColor: '#2a9d8f !important',
	},
}));

export default function CustomizedSnackbars(props) {
	const classes = useStyles();
	let verticleOrigin = '';
	let horizonleOrigin = '';
	props.horizontal
		? (horizonleOrigin = props.horizonleOrigin)
		: (horizonleOrigin = 'center');
	props.verticle
		? (verticleOrigin = props.verticle)
		: (verticleOrigin = 'bottom');

	return (
		<div className={classes.root}>
			<Snackbar
				anchorOrigin={{ vertical: verticleOrigin, horizontal: horizonleOrigin }}
				open={props.open}
				autoHideDuration={1500}
				onClose={props.handleClose}
				className={
					props.snackBarSeverity === 'success'
						? classes.alertSuccess
						: classes.alert
				}>
				<Alert
					severity={props.snackBarSeverity}
					className={
						props.snackBarSeverity === 'success'
							? classes.alertSuccess
							: classes.alert
					}
					onClose={props.handleClose}>
					{props.message}
				</Alert>
			</Snackbar>
		</div>
	);
}
