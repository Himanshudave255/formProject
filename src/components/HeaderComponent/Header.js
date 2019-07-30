import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Header.css';
function Header(props) {
	const styles = {
		root: {
			color: 'red',
		},
	};

	return (
		<div style={styles.root}>
			<Typography variant="h3">{props.heading}</Typography>
		</div>
	);
}

export default Header;
