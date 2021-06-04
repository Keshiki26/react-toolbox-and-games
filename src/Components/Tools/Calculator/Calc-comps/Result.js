import { Grid, Typography } from '@material-ui/core';
import React from 'react';

function Result(props) {
	//create UI to display history
	const history = props.history.map((h, i) => (
		<Grid item container key={i} className="results">
			<Grid item container xs={8} className="equation">
				<Typography className="helvetica-neue-font ">{h.answer}</Typography>
			</Grid>
			<Grid item container xs={4} justify="flex-end">
				<Typography className="helvetica-neue-font ">{h.equation}</Typography>
			</Grid>
		</Grid>
	));
	return (
		<Grid item container alignItems="flex-end" alignContent="flex-end">
			{history}
		</Grid>
	);
}

export default Result;
