import React from "react";
import "./App.css";
import { RootNavigation } from "./navigation/RootNavigation";
import { Provider } from "react-redux";
import { reduxRoot } from "./redux/reduxRoot";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme";

function App(): JSX.Element {
	return (
		<Provider store={reduxRoot}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<RootNavigation />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
