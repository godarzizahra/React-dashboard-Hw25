import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import "./index.css";
import { persistor, store } from "./store/store.ts";

const queryclient = new QueryClient();
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryclient}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<App />
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	</StrictMode>,
);
