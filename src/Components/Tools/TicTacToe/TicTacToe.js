import {
	FormControl,
	Grid,
	IconButton,
	Typography,
	Select,
	InputLabel,
	MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import "./tictactoe.css";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import _ from "lodash";

function TicTacToe(props) {
	const options = ["X", "O", ""];
	const [player, setPlayer] = useState(2);
	const [isWinner, setIsWinner] = useState([]);
	const [currentWinner, setCurrentWinner] = useState("none");
	const [gameMode, setGameMode] = useState("HvEAI");
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
	};

	const easyAI = async (b) => {
		//find a possible random move to make
		const possibleMoves = b
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
		const thisTheMove =
			possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

		setTimeout(() => makeAiMove(thisTheMove), 500);
	};
	const hardAI = async (b) => {
		//find list of possible moves
		const possibleMoves = b
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
		//go through each move checking out wins or losses
		const moveToMake = possibleMoves.reduce(
			(a, c, i) => {
				let tempBoard = _.cloneDeep(b);
				console.log(tempBoard);

				//Make that one move as AI and check win
				tempBoard.map((cc) => {
					return cc.map((aa) => {
						if (aa["number"] === c) {
							aa["current"] =
								player === 1 ? "X" : player === 0 ? "O" : "";
						}
						return aa;
					});
				});
				let checkIfWinner = checkWin(tempBoard, true);
				if (checkIfWinner[0] === true) {
					a[0].push(c);
					return a;
				}

				//Make that one move as Player and check win
				tempBoard.map((cc) => {
					return cc.map((aa) => {
						if (aa["number"] === c) {
							aa["current"] =
								player === 1 ? "O" : player === 0 ? "X" : "";
						}
						return aa;
					});
				});
				checkIfWinner = checkWin(tempBoard, true);
				if (checkIfWinner[0] === true) {
					a[1].push(c);
					return a;
				}

				a[2].push(c);
				return a;
			},
			[[], [], []]
		);
		let thisTheMove =
			moveToMake[2][Math.floor(Math.random() * moveToMake[2].length)];
		if (moveToMake[0].length > 0) {
			thisTheMove =
				moveToMake[0][Math.floor(Math.random() * moveToMake[0].length)];
		} else if (moveToMake[1].length > 0) {
			thisTheMove =
				moveToMake[1][Math.floor(Math.random() * moveToMake[1].length)];
		}
		setTimeout(() => makeAiMove(thisTheMove), 500);
		console.log(moveToMake);
	};

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
									currentWinner === "none"
								) {
									//Make Player Move
									let tempBoard = [...board];
									tempBoard[i][ii]["current"] =
										options[player];
									setBoard(tempBoard);
									//AI MOVES
									if (!checkWin(tempBoard)[0]) {
										if (gameMode === "HvEAI")
											easyAI(tempBoard);
										if (gameMode === "HvHAI")
											hardAI(tempBoard);
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
		<Grid
			item
			container
			className="tic-tac-toe-main-cont"
			justify="center"
			align
		>
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
						{/* <MenuItem value="HvH">Human vs Human</MenuItem> */}
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
				Choose:
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
					{currentWinner === options[player]
						? "Player Wins!"
						: currentWinner === "none"
						? ""
						: currentWinner === "Tie"
						? "It's a Tie..."
						: "AI Wins!"}
				</Typography>
			</Grid>
		</Grid>
	);
}

export default TicTacToe;
