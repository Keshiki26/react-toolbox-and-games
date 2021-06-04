import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Route } from 'react-router';
import Calculator from './Tools/Calculator/Calculator';

function Screen(props) {
	return (
		<Grid
			item
			container
			className="screen-cont"
			direction="column"
			justify="center"
		>
			<Grid item container className="screen-title-cont" justify="center">
				<Typography variant="h6" align="center" className="helvetica-neue-font">
					{props.currentApp}
				</Typography>
			</Grid>
			<Route exact path="/calculator">
				<Calculator />
			</Route>
		</Grid>
	);
}

export default Screen;
