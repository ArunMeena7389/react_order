import Config from "../Config";
import { typeData } from "./type";
import axios from 'axios';

const token = localStorage.getItem('token');
const selectTasteAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: typeData.SET_TASTE_DATA_SUCSESS, payload: data });
  }
}
const getmenueDataAction = (datas) => {

  return async (dispatch) => {
    const token_st = localStorage.getItem('token');
    try {
      const response = await axios.post(Config.url + '/menu', datas, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_st}`,
        },
      });
      const data = response;
      dispatch({ type: typeData.GET_MENUE_DATA_SUCSESS, payload: data });
    } catch (error) {
      if (error?.response?.data?.error && error?.response?.data?.error === "Invalid token") {
        localStorage.removeItem('token');
        window.location.reload();
      }
      dispatch({ type: 'FETCH_DATA_ERROR', payload: error });
    }
  };

}

const addMenuDataAction = (payload) => {
  return async (dispatch) => {
    try {
      // Create FormData object
      const formData = new FormData();

      // Append fields dynamically
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      const response = await axios.post(`${Config.url}/menu/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
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
      await axios.delete(`${Config.url}/menu/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      dispatch({
        type: typeData.DELETE_MENU_DATA_SUCCESS,
        payload: id
      });

    } catch (error) {
      dispatch({
        type: typeData.DELETE_MENU_DATA_ERROR,
        payload: error.response?.data || error.message,
      });
    }
  };
};

const updateMenuDataAction = (id, payload) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();

      // Append fields dynamically to formData
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      const response = await axios.put(`${Config.url}/menu/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });

      dispatch({
        type: typeData.UPDATE_MENU_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error updating menu data:", error);

      dispatch({
        type: typeData.UPDATE_MENU_DATA_ERROR,
        payload: error.response?.data || error.message,
      });
    }
  };
};

const getCustomerDataAction = (businessID) => {

  return async (dispatch) => {
    try {
      const response = await axios.get(Config.url + '/menu/data', {
        headers: {
          "Content-Type": "application/json",
          business_id: businessID
        },
      });
      const data = response;
      dispatch({ type: typeData.GET_CUSTOMER_DATA_SUCSESS, payload: data });
    } catch (error) {
      dispatch({
        type: typeData.GET_CUSTOMER_DATA_ERROR,
        payload: error.response?.data || error.message,
      });
    }
  };

}

export { selectTasteAction, getmenueDataAction, addMenuDataAction, deleteMenuDataAction, updateMenuDataAction, getCustomerDataAction };