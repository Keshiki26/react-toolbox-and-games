import { Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Route } from "react-router";
import Calculator from "./Tools/Calculator/Calculator";
import { useHistory } from "react-router-dom";

function Screen(props) {
	let history = useHistory();
	useEffect(() => {
		props.changeCurrentApp(history.location.pathname.replace("/", ""));
	}, []);
	const isAppInGames = props.isAppInGames(props.currentApp);
	return (
		<Grid
			item
			container
			className="screen-cont"
			direction="column"
			justify="center"
		>
			<Grid
				item
				container
				className="screen-title-cont"
				justify="center"
				direction="column"
			>
				<Typography
					variant="h6"
					align="center"
					className="helvetica-neue-font"
				>
					{props.currentApp}
				</Typography>
				{isAppInGames && (
					<Button
						color="secondary"
						onClick={() => {
							props.changeCurrentGame();
						}}
					>
						Play
					</Button>
				)}
			</Grid>
			<Route exact path="/calculator">
				<Calculator />
			</Route>
		</Grid>
	);
}

export default Screen;
