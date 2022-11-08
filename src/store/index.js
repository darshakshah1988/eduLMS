// import { createStore } from 'redux'

// const store = createStore(changeState)
// export default store

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userInfo"],
  timeout: null,
};
const middlewares = [thunk];
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);
export { store, persistor };
