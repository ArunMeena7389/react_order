import Config from "../Config";
import { typeData } from "./type";
import axios from "axios";
import instance from "./axiosInstance";

const token = localStorage.getItem("token");
const selectTasteAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: typeData.SET_TASTE_DATA_SUCSESS, payload: data });
  };
};

const getmenueDataAction = (datas) => {
  return async (dispatch) => {
    try {
      const response = await instance.post(Config.url + "/menu", datas, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response;
      dispatch({ type: typeData.GET_MENUE_DATA_SUCSESS, payload: data });
    } catch (error) {
      if (
        error?.response?.data?.error &&
        error?.response?.data?.error === "Invalid token"
      ) {
        // localStorage.removeItem('token');
        // window.location.reload();
      }
      dispatch({ type: "FETCH_DATA_ERROR", payload: error });
    }
  };
};

const addMenuDataAction = (payload) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();

      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      const response = await instance.post(
        `${Config.url}/menu/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
          },
        }
      );

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
      await instance.delete(`${Config.url}/menu/${id}`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: typeData.DELETE_MENU_DATA_SUCCESS,
        payload: id,
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

      const response = await instance.put(
        `${Config.url}/menu/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`
          },
        }
      );

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

const getCustomerDataAction = (businessID, onSuccess) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(Config.url + "/menu/data", {
        headers: {
          "Content-Type": "application/json",
          business_id: businessID,
        },
      });
      const data = response;
      onSuccess(data);
      dispatch({ type: typeData.GET_CUSTOMER_DATA_SUCSESS, payload: data });
    } catch (error) {
      dispatch({
        type: typeData.GET_CUSTOMER_DATA_ERROR,
        payload: error.response?.data || error.message,
      });
    }
  };
};

const addOrderAction = (payloadData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${Config.url}/order/create`,
        payloadData,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: typeData.ADD_ORDER_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error adding menu data:", error);

      dispatch({
        type: typeData.ADD_ORDER_DATA_ERROR,
        payload: error.response?.data || error.message,
      });
    }
  };
};

const getorderDataAction = (datas) => {
  const businessID = localStorage.getItem("businessID");
  console.log(businessID, "businessID");

  return async (dispatch) => {
    try {
      const response = await axios.get(Config.url + "/order", {
        headers: {
          "Content-Type": "application/json",
          business_id: businessID,
        },
      });
      const data = response;
      dispatch({ type: typeData.GET_ORDER_DATA_SUCSESS, payload: data });
    } catch (error) {
      dispatch({
        type: typeData.GET_CUSTOMER_DATA_ERROR,
        payload: error.response?.data || error.message,
      });
    }
  };
};

const addFindCustomerAction = (payloadData, onSuccess) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${Config.url}/customer/add-find`,
        payloadData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: typeData.ADD_FIND_CUSTOMER_DATA_SUCSESS,
        payload: response.data,
      });
      onSuccess(response.data);
    } catch (error) {
      console.error("Error adding menu data:", error);

      dispatch({
        type: typeData.ADD_ORDER_DATA_ERROR,
        payload: error.response?.data || error.message,
      });
    }
  };
};

const genrateAiText = (datas, onSuccess) => {
  return async (dispatch) => {
    try {
      const response = await instance.post(
        Config.url + "/ai/generate-description",
        datas,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response;
      onSuccess(data.data);
      dispatch({ type: typeData.GET_GENRATE_AI_DATA_SUCSESS, payload: data });
    } catch (error) {
      if (
        error?.response?.data?.error &&
        error?.response?.data?.error === "Invalid token"
      ) {
        // localStorage.removeItem('token');
        // window.location.reload();
      }
      dispatch({ type: "FETCH_DATA_ERROR", payload: error });
    }
  };
};
export {
  selectTasteAction,
  getmenueDataAction,
  addMenuDataAction,
  deleteMenuDataAction,
  updateMenuDataAction,
  getCustomerDataAction,
  addOrderAction,
  getorderDataAction,
  addFindCustomerAction,
  genrateAiText,
};
