import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router-dom';

function Selection(props) {
	let history = useHistory();
	const [currentState, setCurrentState] = useState('tools');

	return (
		<Grid
			item
			container
			className="selection-cont"
			direction="column"
			justify="flex-end"
		>
			{/* TOP */}
			<Grid item container className="selection-bar-cont" justify="center">
				{/* GAMES TEXT*/}
				<Grid
					item
					className="selection-bar-option"
					xs={6}
					justify="center"
					container
					onClick={() => setCurrentState('games')}
				>
					<Typography
						align="center"
						style={{
							fontWeight: currentState === 'games' ? 600 : 300,
							borderBottom: currentState === 'tools' ? '' : '3px solid white',
						}}
						className="selection-bar-text helvetica-neue-font"
						variant="p"
					>
						Games
					</Typography>
				</Grid>
				{/* TOOLS TEXT */}
				<Grid
					item
					xs={6}
					justify="center"
					container
					className="selection-bar-option helvetica-neue-font"
					onClick={() => setCurrentState('tools')}
				>
					<Typography
						align="center"
						variant="p"
						style={{
							fontWeight: currentState === 'tools' ? 600 : 300,
							borderBottom: currentState === 'games' ? '' : '3px solid white',
						}}
						className="selection-bar-text helvetica-neue-font"
					>
						Tools
					</Typography>
				</Grid>
			</Grid>
			{/* BOTTOM */}

			<Grid
				item
				container
				className="item-selection-cont"
				justify="center"
				alignItems="center"
			>
				<ArrowBackIosIcon
					className="lefta arrow"
					onClick={() => props.changeCurrentPage(-1, currentState)}
				>
					{'<'}
				</ArrowBackIosIcon>
				{currentState === 'games' &&
					props.games[props.currentGamePage - 1].map((g, i) => (
						<Grid
							item
							key={i}
							container
							xs={4}
							onClick={() => {
								props.changeCurrentApp(g.title);
								history.push('/' + g.title.replace(/\s/g, ''));
							}}
							className="selection-object"
							justify="center"
							alignItems="center"
						>
							{g.title}
						</Grid>
					))}
				{currentState === 'tools' &&
					props.tools[props.currentToolPage - 1].map((g, i) => (
						<Grid
							item
							key={i}
							container
							xs={4}
							onClick={() => {
								props.changeCurrentApp(g.title);
								history.push('/' + g.title.replace(/\s/g, ''));
							}}
							className="selection-object"
							justify="center"
							alignItems="center"
						>
							{g.title}
						</Grid>
					))}

				<ArrowForwardIosIcon
					className="righta arrow"
					onClick={() => props.changeCurrentPage(1, currentState)}
				>
					{'>'}
				</ArrowForwardIosIcon>
			</Grid>
		</Grid>
	);
}

export default Selection;
