import {
	FormControl,
	Grid,
	IconButton,
	Typography,
	Select,
	MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import "./tictactoe.css";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import _ from "lodash";

function TicTacToe(props) {
	//players pick
	const options = ["X", "O", ""];
	const [player, setPlayer] = useState(2);
	//win or not

	const [isWinner, setIsWinner] = useState([]);
	const [currentWinner, setCurrentWinner] = useState("none");
	//gamemode pick
	const [gameMode, setGameMode] = useState("HvHAI");
	//AI making move timeout
	const [aiMakingMove, setAiMakingMove] = useState(false);
	//default board
	const resetBoard = [
		[
			{ number: 1, current: "" },
			{ number: 2, current: "" },
			{ number: 3, current: "" },
		],
		[
			{ number: 4, current: "" },
			{ number: 5, current: "" },
			{ number: 6, current: "" },
		],
		[
			{ number: 7, current: "" },
			{ number: 8, current: "" },
			{ number: 9, current: "" },
		],
	];
	//Checks win (two modes - check and change board or just check a board)
	const checkWin = (b, check = false, win = false, winner = "none") => {
		for (let i = 0; i < b.length; i++) {
			//horizantal
			if (
				b[i][0]["current"] === b[i][1]["current"] &&
				b[i][1]["current"] === b[i][2]["current"] &&
				b[i][0]["current"] !== ""
			) {
				win = true;
				winner = b[i][0]["current"];
				if (!check) {
					setIsWinner([
						b[i][0]["number"],
						b[i][1]["number"],
						b[i][2]["number"],
					]);
					setCurrentWinner(winner);
				}
			}
			//vertical
			if (
				b[0][i]["current"] === b[1][i]["current"] &&
				b[1][i]["current"] === b[2][i]["current"] &&
				b[0][i]["current"] !== ""
			) {
				win = true;
				winner = b[0][i]["current"];
				if (!check) {
					setIsWinner([
						b[0][i]["number"],
						b[1][i]["number"],
						b[2][i]["number"],
					]);
					setCurrentWinner(winner);
				}
			}
			//diagonal top left to bottom right
			if (
				b[0][0]["current"] === b[1][1]["current"] &&
				b[1][1]["current"] === b[2][2]["current"] &&
				b[0][0]["current"] !== ""
			) {
				win = true;
				winner = b[0][0]["current"];
				if (!check) {
					setIsWinner([
						b[0][0]["number"],
						b[1][1]["number"],
						b[2][2]["number"],
					]);

					setCurrentWinner(winner);
				}
			}
			//diagonal top right to bottom left
			if (
				b[0][2]["current"] === b[1][1]["current"] &&
				b[1][1]["current"] === b[2][0]["current"] &&
				b[0][2]["current"] !== ""
			) {
				win = true;
				winner = b[2][0]["current"];
				if (!check) {
					setIsWinner([
						b[0][2]["number"],
						b[1][1]["number"],
						b[2][0]["number"],
					]);

					setCurrentWinner(winner);
				}
			}
		}

		return [win, winner];
	};
	//Make the AI MOVE (0.5 sec, check board for win etc all that)
	const makeAiMove = (thisTheMove) => {
		let tempBoard = [...board];
		//Make that one move
		tempBoard.map((c) => {
			return c.map((a) => {
				if (a["number"] === thisTheMove) {
					a["current"] = player === 1 ? "X" : player === 0 ? "O" : "";
				}
				return a;
			});
		});
		setBoard(tempBoard);
		checkWin(tempBoard);
		setAiMakingMove(false);
	};
	//Different AI's
	const easyAI = async (possibleMoves) => {
		const thisTheMove =
			possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
		setAiMakingMove(true);
		setTimeout(() => makeAiMove(thisTheMove), 500);
	};
	const hardAI = async (b, possibleMoves) => {
		//go through each move checking out wins or losses
		const moveToMake = possibleMoves.reduce(
			(a, c) => {
				let tempBoard = _.cloneDeep(b);
				let boardCurRef = null;
				//Make that one move as AI and check win
				for (let i = 0; i < tempBoard.length; i++) {
					for (let j = 0; j < tempBoard[i].length; j++) {
						if (tempBoard[i][j]["number"] === c) {
							boardCurRef = tempBoard[i][j];
							tempBoard[i][j]["current"] =
								player === 1 ? "X" : player === 0 ? "O" : "";
						}
					}
				}
				let checkIfWinner = checkWin(tempBoard, true);
				if (checkIfWinner[0] === true) {
					a[0].push(c);
					return a;
				}
				//Make that one move as Player and check win
				if (boardCurRef !== null) {
					boardCurRef["current"] =
						player === 1 ? "O" : player === 0 ? "X" : "";
					checkIfWinner = checkWin(tempBoard, true);
					if (checkIfWinner[0] === true) {
						a[1].push(c);
						return a;
					}
				}
				a[2].push(c);
				return a;
			},
			[[], [], []]
		);
		const winLossTie =
			moveToMake[0].length > 0 ? 0 : moveToMake[1].length > 0 ? 1 : 2;
		const thisTheMove =
			moveToMake[winLossTie][
				Math.floor(Math.random() * moveToMake[winLossTie].length)
			];
		setAiMakingMove(true);
		setTimeout(() => makeAiMove(thisTheMove), 500);
	};

	//setUpto create new game
	const newGame = () => {
		setCurrentWinner("none");
		setIsWinner([]);
		setBoard([...resetBoard]);
	};

	const [board, setBoard] = useState([...resetBoard]);
	const boardUI = board.map((c, i, arr) => {
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
				{c.map((cc, ii, arrr) => {
					return (
						<Grid
							item
							container
							xs={4}
							justify="center"
							color="secondary"
							alignItems="center"
							className={`tictactoe-each ${
								cc["number"] === 1 ||
								cc["number"] === 2 ||
								cc["number"] === 4 ||
								cc["number"] === 5
									? "border-bot-right"
									: cc["number"] === 3
									? "border-bot"
									: cc["number"] === 6
									? "border-bot"
									: cc["number"] === 7 || cc["number"] === 8
									? "border-right"
									: ""
							}`}
							onClick={(e) => {
								if (
									cc["current"] !== "X" &&
									cc["current"] !== "O" &&
									currentWinner === "none" &&
									!aiMakingMove
								) {
									//Make Player Move
									let tempBoard = [...board];
									tempBoard[i][ii]["current"] =
										options[player];
									setBoard(tempBoard);

									if (!checkWin(tempBoard)[0]) {
										//AI MOVES

										//find a possible random move to make
										const possibleMoves = tempBoard
											.flat()
											.map((c) => {
												if (c["current"] === "") {
													return c["number"];
												}
												return null;
											})
											.filter((c) => c !== null);
										// if no more possible moves then it is a tie
										if (possibleMoves.length === 0) {
											setCurrentWinner("Tie");
										}
										if (
											gameMode === "HvEAI" ||
											gameMode === "HvHAI"
										) {
											if (gameMode === "HvEAI")
												easyAI(possibleMoves);
											if (gameMode === "HvHAI")
												hardAI(
													tempBoard,
													possibleMoves
												);
										}
										// HUMAN V HUMAN MOVES
										if (gameMode === "HvH") {
											setPlayer(player === 1 ? 0 : 1);
										}
									}
								} else if (currentWinner !== "none") {
									newGame();
								}
							}}
						>
							<Typography
								className={`board-item-text ${
									isWinner.includes(cc["number"])
										? "tictac-winner"
										: isWinner.length === 3
										? "tictac-rando-lost"
										: ""
								} ${
									board[i][ii]["current"] === "X"
										? "board-item-x"
										: board[i][ii]["current"] === "O"
										? "board-item-o"
										: ""
								}`}
								color={`${
									isWinner.includes(cc["number"])
										? "secondary"
										: ""
								}`}
							>
								{board[i][ii]["current"]}
							</Typography>
						</Grid>
					);
				})}
			</Grid>
		);
	});
	return (
		<Grid item container className="tic-tac-toe-main-cont" justify="center">
			Tic Tac Toe
			{/* Player Selection */}
			<Grid
				item
				container
				className="board-option-cont"
				justify="center"
				alignItems="center"
				direction="row"
			>
				Game Mode:
				<FormControl
					className="tictac-gamemode"
					color="secondary"
					variant="outlined"
				>
					<Select
						value={gameMode}
						onChange={(e) => {
							setGameMode(e.target.value);
							newGame();
						}}
						className="tictac-gamemode-options"
						IconComponent={() => (
							<ExpandMoreIcon className="invis" />
						)}
						autoWidth={true}
					>
						<MenuItem value="HvEAI">Human vs Easy AI</MenuItem>
						<MenuItem value="HvH">Human vs Human</MenuItem>
						<MenuItem value="HvHAI">Human vs Hard AI</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid
				item
				container
				className="board-option-cont"
				justify="center"
				alignItems="center"
				direction="row"
			>
				{gameMode !== "HvH" ? "Choose: " : "Turn: "}
				<IconButton
					className={`tictactoe-button-picker ${
						player === 0 ? "tictactoe-picked" : ""
					}`}
					onClick={() => {
						newGame();
						setPlayer(0);
					}}
				>
					<CloseIcon color="secondary"></CloseIcon>
				</IconButton>
				<IconButton
					className={`tictactoe-button-picker ${
						player === 1 ? "tictactoe-picked" : ""
					}`}
					onClick={() => {
						newGame();
						setPlayer(1);
					}}
				>
					<RadioButtonUncheckedIcon
						color="secondary"
						fontSize="default"
					></RadioButtonUncheckedIcon>
				</IconButton>
			</Grid>
			{/* Actual Board: */}
			<Grid
				item
				container
				className="board-cont"
				justify="center"
				alignItems="center"
			>
				<Grid
					item
					xs={10}
					container
					className="board-center-cont"
					justify="center"
					alignItems="center"
					direction="column"
				>
					{boardUI}
				</Grid>
			</Grid>
			<Grid
				item
				container
				className="board-results"
				justify="center"
				alignItems="center"
				direction="row"
			>
				<Typography color="secondary" className="tictac-result-text">
					{gameMode !== "HvH" &&
						(currentWinner === options[player]
							? "Player Wins!"
							: currentWinner === "none"
							? ""
							: currentWinner === "Tie"
							? "It's a Tie..."
							: "AI Wins!")}
					{gameMode === "HvH" &&
						(currentWinner === "Tie"
							? "It's a Tie..."
							: currentWinner === "none"
							? ""
							: `${options[player].toUpperCase()} Wins!`)}
				</Typography>
			</Grid>
		</Grid>
	);
}

export default TicTacToe;
