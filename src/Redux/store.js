import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage

import { customerMenuDataReducer, menueDataReducer,tasteSelectDataReducer } from "./Reduser";


// persist config
const persistConfig = {
    key: 'root',
    storage,
  };
  
  const rootReducer = combineReducers({
    user: menueDataReducer,
    taste:tasteSelectDataReducer,
    customerMenu:customerMenuDataReducer,
  });

  // wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create store
const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
  );

// create persistor
const persistor = persistStore(store);

export { store, persistor };