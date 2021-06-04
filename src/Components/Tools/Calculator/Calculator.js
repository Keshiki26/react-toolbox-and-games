import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import reactDom from 'react-dom';
import Calc from './Calc-comps/Calc';
import Screen from './Calc-comps/Screen';
import { isMobile } from 'react-device-detect';

export default class componentName extends Component {
	state = {
		currentCalculation: 0,
		term: '',
		history: JSON.parse(localStorage.getItem('CalcHistory')) || [],
	};

	//Calculate Input
	calculate = (equation) => {
		//test
		//4-5•6÷9•9+4•6÷5•9+563•7÷6÷6++1--2+-3-+4

		/*
		Sort out the string from input to:
			Split based on the signs (+-•÷) --> makes sure that numbers in sequence like 444 is retained as a number (split and filter)
			Then check for + - signs in sequence such as --+ which as works to differeciate negative, positive numbers
			The final result is an array that contains numbers (0-9) and strings ("+-•÷")
			Reverse the array so we can apply pemdas to it
	*/

		let calc = equation
			.split(/(•|÷|\+|-)/)
			.filter((c, i) => c !== '')
			.flatMap((c, i, arr) => {
				if (c === '-') {
					if (arr[i + 1] === '+') {
						arr[i + 1] = '-';
						return [];
					} else if (arr[i + 1] === '-') {
						arr[i + 1] = '+';
						return [];
					}
				} else if (c === '+') {
					if (arr[i + 1] === '-') {
						arr[i + 1] = '-';
						return [];
					} else if (arr[i + 1] === '+') {
						arr[i + 1] = '+';
						return [];
					}
				}
				return parseInt(c) || c;
			})
			.reverse();
		//Order of operations: multiplication and divison
		for (let i = calc.length - 1; i >= 0; i--) {
			if (calc[i + 1] && calc[i - 1]) {
				if (calc[i] === '•') {
					calc[i - 1] = calc[i + 1] * calc[i - 1];
					calc.splice(i + 1, 1);
					calc.splice(i, 1);
				} else if (calc[i] === '÷') {
					calc[i - 1] = calc[i + 1] / calc[i - 1];
					calc.splice(i + 1, 1);
					calc.splice(i, 1);
				}
			}
		}
		calc = calc.reverse();
		//Order of operations: addition and subtraction
		const finalCalc = calc.reduce((a, c, i, arr) => {
			if (typeof arr[i - 1] === 'string') return a;
			if (c === '-') {
				return a - arr[i + 1];
			} else if (c === '+') {
				return arr[i + 1] + a;
			} else {
				return a + c;
			}
		}, 0);
		this.setState({ currentCalculation: Math.round(finalCalc * 100) / 100 });
	};

	//changes the history state and adds to local storage
	addToHistory = () => {
		if (!isNaN(this.state.currentCalculation) && this.state.term !== '') {
			const newHistory = [
				...this.state.history,
				{ equation: this.state.currentCalculation, answer: this.state.term },
			];
			this.setState({
				history: newHistory,
				currentCalculation: 0,
				term: '',
			});
			localStorage.setItem('CalcHistory', JSON.stringify(newHistory));
		}
	};

	//Check input
	checkKeys = (term) =>
		term
			.split('')
			.map((c, i) => {
				if (c === '*') return '•';
				if (c === '/') return '÷';
				return c;
			})
			.filter((c, i) => !(i === 0 && /(•|÷|\+)/.test(c)))
			.join('');

	finalCheck = (term) => /^([•÷0-9+-])+$/.test(term);
	//Changes term (input) in state
	changeInput = (term) => {
		let t = this.checkKeys(term);

		if (this.finalCheck(t)) this.setState({ term: t });
		if (t.length < 1) this.setState({ term: '' });
		this.calculate(t);
	};
	//Adds input when button clicked
	buttonClick = (button) => {
		if (this.finalCheck(button)) {
			const newTerm = this.state.term + button;
			this.setState({ term: newTerm });
			this.calculate(newTerm);
		}
	};
	//makes sure input is always focused when interacting unless on mobile
	focus = (re) => {
		if (!isMobile) reactDom.findDOMNode(re).focus();
	};

	render() {
		return (
			<Grid
				direction="column"
				justify="flex-end"
				item
				className="screen-app-cont"
				container
			>
				<Screen
					focus={this.focus}
					term={this.state.term}
					changeInput={this.changeInput}
					calculate={this.calculate}
					currentCalculation={this.state.currentCalculation}
					buttonClick={this.buttonClick}
					history={this.state.history}
					submit={this.addToHistory}
				/>
				<Calc
					buttonClick={this.buttonClick}
					term={this.state.term}
					submit={this.addToHistory}
				/>
			</Grid>
		);
	}
}
