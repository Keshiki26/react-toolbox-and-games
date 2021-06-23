import { Grid, IconButton } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import TicTacToe from "./Tools/TicTacToe/TicTacToe";

function Modal(props) {
	const isAppInGames = props.isAppInGames(props.currentApp);
	return (
		<Grid
			container
			className="modal-cont"
			justify="center"
			alignItems="center"
			alignContent="flex-start"
		>
			<Grid item container justify="flex-end">
				<IconButton onClick={() => props.exitModal()}>
					<CloseIcon color="secondary" />
				</IconButton>
			</Grid>
			{isAppInGames && props.currentApp === "TicTacToe" && <TicTacToe />}
		</Grid>
	);
}

export default Modal;
