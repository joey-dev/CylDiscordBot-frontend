import { ThemeProvider } from "@emotion/react";
import { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import Header from "../components/layout/Header/Header";
import store from "../store";
import theme from "../util/Theme";
import "./../index.css";
import { QueryClient, QueryClientProvider } from "react-query";


export default function MyApp({Component, pageProps}: AppProps) {
	const queryClient = new QueryClient();

	return (
		<React.StrictMode>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<QueryClientProvider client={queryClient}>
						<Header token={null} />

						<Component {...pageProps} />
					</QueryClientProvider>
				</ThemeProvider>
			</Provider>
		</React.StrictMode>
	);
}
