import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import './tictactoe.css';

function TicTacToe(props) {
	const options = ['X', 'O', ''];
	const [currentOption, setCurrentOption] = useState(2);
	let player = 'X';
	const board = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	].map((c, i, arr) => {
		return (
			<Grid
				item
				container
				xs={12}
				sm={8}
				md={6}
				lg={4}
				className="tictactoe-row"
				justify="center"
			>
				{c.map((cc, ii, arrr) => (
					<Grid
						item
						container
						xs={4}
						justify="center"
						className={`tictactoe-each ${
							cc === 1 || cc === 2 || cc === 4 || cc === 5
								? 'border-bot-right'
								: cc === 3
								? 'border-bot'
								: cc === 6
								? 'border-bot'
								: cc === 7 || cc === 8
								? 'border-right'
								: ''
						}`}
						onClick={() => {
							setCurrentOption(0);
						}}
					>
						{options[currentOption]}
					</Grid>
				))}
			</Grid>
		);
	});
	return (
		<Grid
			item
			container
			className="tic-tac-toe-main-cont"
			justify="center"
			align
		>
			Tic Tac Toe
			<Grid
				item
				container
				className="board-cont"
				justify="center"
				alignItems="center"
				direction="column"
			>
				{board}
			</Grid>
		</Grid>
	);
}

export default TicTacToe;
