import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
	interface Theme {
		palette: {
			primary: {
				main: string;
				contrastText: string;
			};
			secondary: {
				main: string;
				contrastText: string;
			};
		};
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		status?: {
			danger?: string;
		};
	}
}

export const theme = createTheme({
	palette: {
		secondary: {
			light: "#fff",
			main: "#fff",
			dark: "#fff",
		},
		primary: {
			light: "#466680",
			main: "#243746",
			dark: "#17232d",
		},
	},
	components: {
		MuiFormLabel: {
			styleOverrides: {
				asterisk: {
					color: "#f44336",
				},
			},
		},
	},
});
