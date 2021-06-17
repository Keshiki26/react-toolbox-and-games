import { Grid, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import "./tictactoe.css";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

function TicTacToe(props) {
	const options = ["X", "O", ""];
	const [player, setPlayer] = useState(2);
	const [isWinner, setIsWinner] = useState([]);
	const [currentWinner, setCurrentWinner] = useState("none");
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

	const checkWin = (board) => {
		let win = false;
		for (let i = 0; i < board.length; i++) {
			//horizantal
			if (
				board[i][0]["current"] === board[i][1]["current"] &&
				board[i][1]["current"] === board[i][2]["current"] &&
				board[i][0]["current"] !== ""
			) {
				setIsWinner([
					board[i][0]["number"],
					board[i][1]["number"],
					board[i][2]["number"],
				]);
				win = true;
				setCurrentWinner(board[i][0]["current"]);
			}
			//vertical
			if (
				board[0][i]["current"] === board[1][i]["current"] &&
				board[1][i]["current"] === board[2][i]["current"] &&
				board[0][i]["current"] !== ""
			) {
				setIsWinner([
					board[0][i]["number"],
					board[1][i]["number"],
					board[2][i]["number"],
				]);
				win = true;
				setCurrentWinner(board[0][i]["current"]);
			}
			//diagonal top left to bottom right
			if (
				board[0][0]["current"] === board[1][1]["current"] &&
				board[1][1]["current"] === board[2][2]["current"] &&
				board[0][0]["current"] !== ""
			) {
				setIsWinner([
					board[0][0]["number"],
					board[1][1]["number"],
					board[2][2]["number"],
				]);
				win = true;
				setCurrentWinner(board[0][0]["current"]);
			}
			//diagonal top right to bottom left
			if (
				board[0][2]["current"] === board[1][1]["current"] &&
				board[1][1]["current"] === board[2][0]["current"] &&
				board[0][2]["current"] !== ""
			) {
				setIsWinner([
					board[0][2]["number"],
					board[1][1]["number"],
					board[2][0]["number"],
				]);
				win = true;
				setCurrentWinner(board[2][0]["current"]);
			}
		}

		return win;
	};

	const makeAiMove = (thisTheMove) => {
		let tempBoard = [...board];
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
	const aiMakeMove = async (b) => {
		//find a possible move to make
		const possibleMoves = b
			.flat()
			.map((c) => {
				if (c["current"] === "") {
					return c["number"];
				}
				return null;
			})
			.filter((c) => c !== null);
		if (possibleMoves.length === 0) {
			setCurrentWinner("Tie");
		}
		const thisTheMove =
			possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

		setTimeout(() => makeAiMove(thisTheMove), 500);
	};

	const newGame = () => {
		setIsWinner([]);
		setBoard([...resetBoard]);
		setCurrentWinner("none");
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
									isWinner.length === 0
								) {
									let tempBoard = [...board];
									tempBoard[i][ii]["current"] =
										options[player];
									setBoard(tempBoard);
									if (!checkWin(tempBoard)) {
										aiMakeMove(tempBoard);
									}
								} else if (isWinner.length === 3) {
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
