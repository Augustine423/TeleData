
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import selectedItemReducer from "./selectedItem";
import companyReducer from "./informationData/companySlice";
import vesselReducer from "./informationData/vesselSlice";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import languageReducer from '../stores/language/languageSlice'; //translation

// Persist Config
const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["selectedItem"],
};

// Root Reducer with Persist
const rootReducer = combineReducers({
  selectedItem: persistReducer(persistConfig, selectedItemReducer),
  companies: companyReducer,
  vessels: vesselReducer,
  language:languageReducer,
});

// Store Configuration
export const store = configureStore({
  reducer: rootReducer,
});

// Persistor
export const persistor = persistStore(store);
