import { Grid } from "@material-ui/core";
import "./App.css";
import Toolbox from "./Components/Toolbox";

function App() {
	return (
		<Grid container justify="center" className="main-cont">
			<Toolbox />
		</Grid>
	);
}

export default App;
