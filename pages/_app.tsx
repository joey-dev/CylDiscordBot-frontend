import { ThemeProvider } from "@emotion/react";
import { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import Header from "../components/layout/Header/Header";
import store from "../store";
import theme from "../util/Theme";
import "./../index.css";


export default function MyApp({Component, pageProps}: AppProps) {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Header token={null} />

					<Component {...pageProps} />
				</ThemeProvider>
			</Provider>
		</React.StrictMode>
	);
}
