import { API_AI, API_APP } from "@/Services";
import { API_AUTH } from "@/Services/baseAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { authReducers, authRefreshReducers, homeReducers, refreshingToken, themeReducers } from "./reducers";

const reducers = combineReducers({
  api: API_APP.reducer,
  apiAuth: API_AUTH.reducer,
  theme: themeReducers,
  home: homeReducers,
  auth: authReducers,
  authRefresh: authRefreshReducers,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["theme", "auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, refreshingToken.type],
        ignoredPaths: ["authRefresh"],
      },
    }).concat(API_APP.middleware).concat(API_AUTH.middleware);

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require("redux-flipper").default;
    //   middlewares.push(createDebugger());
    // }

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
export type RootState = ReturnType<typeof reducers>;
