import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import Modal from "./Modal";
import Screen from "./Screen";
import Selection from "./Selection";

const createToolGame = (title, img, link) => {
	return { title, img, link };
};
let g = [];
g.push(createToolGame("TicTacToe", "", ""));
g.push(createToolGame("Sudoku", "", ""));
g.push(createToolGame("Snake", "", ""));
g.push(createToolGame("Dummy Game 1", "", ""));
g.push(createToolGame("Dummy Game 2", "", ""));

const games = g.reduce((a, c, i, arr) => {
	return i % 3 === 0
		? [
				...a,
				arr[i + 1]
					? arr[i + 2]
						? [arr[i], arr[i + 1], arr[i + 2]]
						: [arr[i], arr[i + 1]]
					: arr[i],
		  ]
		: a;
}, []);
const t = [];
t.push(createToolGame("Calculator", "", ""));
t.push(createToolGame("To-Do", "", ""));
t.push(createToolGame("Dice", "", ""));
const tools = t.reduce((a, c, i, arr) => {
	return i % 3 === 0
		? [
				...a,
				arr[i + 1]
					? arr[i + 2]
						? [arr[i], arr[i + 1], arr[i + 2]]
						: [arr[i], arr[i + 1]]
					: arr[i],
		  ]
		: a;
}, []);
class Toolbox extends Component {
	state = {
		games: games,
		tools: tools,
		currentGamePage: 1,
		currentToolPage: 1,
		currentApp: "welcome",
		game: null,
	};
	isAppInGames = (app) =>
		games.flat().reduce((a, c) => {
			if (c["title"] === app) {
				a = true;
			}
			return a;
		}, false);
	changeCurrentApp = (newapp) => {
		const isAnApp = games
			.flat()
			.concat(tools.flat())
			.reduce((a, c) => {
				if (c["title"] === newapp) {
					a = true;
				}
				return a;
			}, false);
		if (isAnApp) {
			this.setState({ currentApp: newapp });
		}
	};
	exitModal = () => {
		this.setState({ game: null });
	};
	changeCurrentGamePage = (c, type) => {
		if (type === "games") {
			const newP = this.state.currentGamePage + c;
			if (newP <= this.state.games.length && newP > 0)
				this.setState({ currentGamePage: newP });
		} else if (type === "tools") {
			const newP = this.state.currentToolPage + c;
			if (newP <= this.state.tools.length && newP > 0)
				this.setState({ currentToolPage: newP });
		}
	};
	changeCurrentGame = () => {
		if (this.state.currentApp !== "welcome") {
			this.setState({ game: this.state.currentApp });
		}
		console.log(this.state.currentApp);
	};
	render() {
		return (
			<Grid
				container
				xs={12}
				sm={10}
				md={8}
				lg={6}
				item
				direction="column"
				className="toolbox-cont"
			>
				{this.state.game !== null && (
					<Modal
						changeCurrentApp={this.changeCurrentApp}
						currentApp={this.state.currentApp}
						isAppInGames={this.isAppInGames}
						exitModal={this.exitModal}
					/>
				)}
				<Screen
					currentApp={this.state.currentApp}
					changeCurrentGame={this.changeCurrentGame}
					changeCurrentApp={this.changeCurrentApp}
					isAppInGames={this.isAppInGames}
				/>
				<Selection
					games={this.state.games}
					tools={this.state.tools}
					currentGamePage={this.state.currentGamePage}
					currentToolPage={this.state.currentToolPage}
					changeCurrentPage={this.changeCurrentGamePage}
					changeCurrentApp={this.changeCurrentApp}
				/>
			</Grid>
		);
	}
}
export default Toolbox;
