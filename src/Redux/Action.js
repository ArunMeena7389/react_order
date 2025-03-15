import { ADD_ITEM, DELETE_ITEM, typeData } from "./type";
import axios from 'axios';


const addItem = () => {
  return {
    type: ADD_ITEM,
  };
};

const deleteItem = () => {
  return {
    type: DELETE_ITEM,
  };
};

const getmenueDataAction = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://dev-hotels.onrender.com/menu');
      const data =  response;
        dispatch({ type: typeData.GET_MENUE_DATA_SUCSESS, payload: data });
    } catch (error) {
        dispatch({ type: 'FETCH_DATA_ERROR', payload: error });
    }
};

}

export { addItem, deleteItem,getmenueDataAction };