import { typeData } from "./type";

const initialStateMenue = {
  data: [],
};
const initialtasteState = {
  data: [],
};

export const tasteSelectDataReducer = (state = initialtasteState, action) => {
  switch (action.type) {
    case typeData.SET_TASTE_DATA_SUCSESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
export const menueDataReducer = (state = initialStateMenue, action) => {
  switch (action.type) {
    case typeData.GET_MENUE_DATA_SUCSESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const customerMenuDataReducer = (state = initialStateMenue, action) => {
  switch (action.type) {
    case typeData.GET_CUSTOMER_DATA_SUCSESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const orderDataReducer = (state = initialStateMenue, action) => {
  switch (action.type) {
    case typeData.GET_ORDER_DATA_SUCSESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const customerPackageDataReducer = (
  state = initialStateMenue,
  action
) => {
  switch (action.type) {
    case "GET_PACKAGE_CUSTOMER_DATA_SUCSESS":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
