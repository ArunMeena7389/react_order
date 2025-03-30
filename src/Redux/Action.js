import Config from "../Config";
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
      const response = await axios.get(Config.url + '/menu');
      const data = response;
      dispatch({ type: typeData.GET_MENUE_DATA_SUCSESS, payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_DATA_ERROR', payload: error });
    }
  };

}

const addMenuDataAction = (payload) => {
  return async (dispatch) => {
    try {
      console.log(payload, "payload");

      // Create FormData object
      const formData = new FormData();

      // Append fields dynamically
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      const response = await axios.post(`${Config.url}/menu/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`, // Uncomment if needed
        },
      });

      dispatch({
        type: typeData.ADD_MENU_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error adding menu data:", error);

      dispatch({
        type: typeData.ADD_MENU_DATA_ERROR,
        payload: error.response?.data || error.message,
      });
    }
  };
};

const deleteMenuDataAction = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${Config.url}/menu/${id}`);

      dispatch({
        type: typeData.DELETE_MENU_DATA_SUCCESS,
        payload: id
      });

      // Optionally, fetch updated data after deletion
      // dispatch(getMenuDataAction());
    } catch (error) {
      dispatch({
        type: typeData.DELETE_MENU_DATA_ERROR,
        payload: error.response?.data || error.message,
      });
    }
  };
};

export { addItem, deleteItem, getmenueDataAction, addMenuDataAction, deleteMenuDataAction };