import React from "react";
import "./App.css";
import { RootNavigation } from "./navigation/RootNavigation";
import { Provider } from "react-redux";
import { reduxRoot } from "./redux/reduxRoot";

function App(): JSX.Element {
	return (
		<Provider store={reduxRoot}>
			<RootNavigation />
		</Provider>
	);
}

export default App;
