import React from "react";
import "./App.css";
import { RootNavigation } from "./navigation/RootNavigation";
import { Provider } from "react-redux";
import { reduxRoot } from "./redux/reduxRoot";
import { BrowserRouter } from "react-router-dom";

function App(): JSX.Element {
	return (
		<Provider store={reduxRoot}>
			<BrowserRouter>
				<RootNavigation />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
