import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ParallaxProvider } from "react-scroll-parallax";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./store";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ParallaxProvider>
          <App />
        </ParallaxProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
