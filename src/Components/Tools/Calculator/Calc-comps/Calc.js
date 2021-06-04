import { Grid, Typography } from '@material-ui/core';
import React from 'react';

function calc(props) {
	const buttons = [
		[7, 8, 9, '÷'],
		[4, 5, 6, '×'],
		[1, 2, 3, '-'],
		[0, '.', '=', '+'],
	];
	//creating ui for the buttons
	const buttonsUI = buttons.map((buttonRow, i) => (
		<Grid
			item
			key={i}
			container
			className="calc-row-each"
			// style={{ background: 'green' }}
		>
			{buttonRow.map((button, ii) => (
				<Grid
					key={ii}
					item
					xs={3}
					justify="center"
					container
					alignItems="center"
					className="calc-each-button-cont"
					//when button press call parent function which adds the button's value to  input for calculation
					//Buttons like instead call calculate from parent directly
					onClick={(e) =>
						button !== '='
							? button === '×'
								? props.buttonClick('•')
								: props.buttonClick(button)
							: props.submit()
					}
				>
					<Typography className="calc-button-text helvetica-neue-font">
						{button}
					</Typography>
				</Grid>
			))}
		</Grid>
	));

	return (
		<Grid
			item
			container
			className="calc-cont"
			direction="column"
			alignItems="center"
			// style={{ background: 'red' }}
		>
			<Grid container xs={12} item>
				{buttonsUI}
			</Grid>
		</Grid>
	);
}

export default calc;
