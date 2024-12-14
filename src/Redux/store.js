import { createStore } from "redux";
import { cartReducer } from "./Reduser";

const store = createStore(cartReducer);

export default store;