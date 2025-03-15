import { ADD_ITEM, DELETE_ITEM, typeData } from "./type";

const initialState = {
  numOfItems: 0,
};

const initialStateMenue = {
  data: []
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        numOfItems: state.numOfItems + 1,
      };

    case DELETE_ITEM:
      return {
        ...state,
        numOfItems: state.numOfItems - 1,
      };
    default:
      return state;
  }
};

export const menueDataReducer = (state = initialStateMenue, action) => {
  console.log(action);
  
  switch (action.type) {
    case typeData.GET_MENUE_DATA_SUCSESS:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }

}