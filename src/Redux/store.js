import { createStore, combineReducers,applyMiddleware } from "redux";
import { cartReducer, menueDataReducer } from "./Reduser";
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({
    cart: cartReducer,
    user: menueDataReducer
});
const store = createStore(
    rootReducer,
    applyMiddleware(thunk) // Apply the thunk middleware
);

export default store;