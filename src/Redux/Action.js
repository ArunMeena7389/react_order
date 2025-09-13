import Config from "../Config";
import { typeData } from "./type";
import axios from "axios";
import instance from "./axiosInstance";
import { apiAction } from "./ApiAction";

const token = localStorage.getItem("token");
const selectTasteAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: typeData.SET_TASTE_DATA_SUCSESS, payload: data });
  };
};

const getmenueDataAction = (datas, onSuccess) => {
  return apiAction({
    method: "post",
    url: "/menu",
    payload: datas,
    headers: {
      "Content-Type": "application/json",
    },
    types: {
      REQUEST: "GET_MENUE_DATA_REQUEST",
      SUCCESS: "GET_MENUE_DATA_SUCSESS",
      ERROR: "FETCH_DATA_ERROR",
    },
    onSuccess,
  });
};

const addMenuDataAction = (payload) => {
  const formData = new FormData();
  Object.keys(payload).forEach((key) => formData.append(key, payload[key]));

  return apiAction({
    method: "post",
    url: "/menu/create",
    payload: formData,
    types: {
      REQUEST: "ADD_MENU_DATA_REQUEST",
      SUCCESS: "ADD_MENU_DATA_SUCCESS",
      ERROR: "ADD_MENU_DATA_ERROR",
    },
  });
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
  return apiAction({
    method: "get",
    url: "/order",
    headers: {
      business_id: businessID,
    },
    types: {
      REQUEST: "GET_ORDER_DATA_REQUEST",
      SUCCESS: "GET_ORDER_DATA_SUCSESS",
      ERROR: "GET_CUSTOMER_DATA_ERROR",
    },
  });
};

const updateOrderDataAction = (orderId, updateFields, onSuccess) => {
  const businessID = localStorage.getItem("businessID");
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `${Config.url}/order/${orderId}`,
        updateFields,
        {
          headers: {
            "Content-Type": "application/json",
            business_id: businessID,
          },
        }
      );
      onSuccess(response.data);
      dispatch({
        type: "UPDATE_ORDER_DATA_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_ORDER_DATA_ERROR",
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

const addPackageAction = (payload) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();

      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      const response = await instance.post(
        `${Config.url}/package/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "ADD_PACKAGE_DATA_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error adding menu data:", error);

      dispatch({
        type: "ADD_PACKAGE_DATA_ERROR",
        payload: error.response?.data || error.message,
      });
    }
  };
};

const getpackageDataAction = (onSuccess) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(Config.url + "/package/get", {
        headers: {
          "Content-Type": "application/json",
          business_id: "check is it pass",
        },
      });
      const data = response;
      onSuccess(data);
      dispatch({ type: "GET_PACKAGE_DATA_SUCSESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_DATA_ERROR", payload: error });
    }
  };
};

const getpackageCustomerDataAction = (ID, onSuccess) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(
        Config.url + "/package/get-customer",
        {
          headers: {
            "Content-Type": "application/json",
            business_id: ID,
          },
        }
      );
      const data = response;
      onSuccess(data);
      dispatch({
        type: "GET_PACKAGE_CUSTOMER_DATA_SUCSESS",
        payload: data.data,
      });
    } catch (error) {
      dispatch({ type: "FETCH_DATA_ERROR", payload: error });
    }
  };
};

const updatePackageDataAction = (id, payload) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();

      // Append fields dynamically to formData
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      const response = await instance.put(
        `${Config.url}/package/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`
          },
        }
      );

      dispatch({
        type: "UPDATE_PACKAGE_DATA_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error updating menu data:", error);

      dispatch({
        type: "UPDATE_PACKAGE_DATA_ERROR",
        payload: error.response?.data || error.message,
      });
    }
  };
};

const deletePackageDataAction = (id) => {
  return async (dispatch) => {
    try {
      await instance.delete(`${Config.url}/package/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: "DELETE_MENU_DATA_SUCCESS",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "DELETE_PACKAGE_DATA_ERROR",
        payload: error.response?.data || error.message,
      });
    }
  };
};

const createTableAction = (datas, onSuccess) => {
  return apiAction({
    method: "post",
    url: "/table/create",
    payload: datas,
    types: {
      REQUEST: "CREATE_TABLE_REQUEST",
      SUCCESS: "CREATE_TABLE_SUCCESS",
      ERROR: "CREATE_TABLE_ERROR",
    },
    onSuccess,
  });
};

const getTableAction = (onSuccess) => {
  return apiAction({
    method: "get",
    url: "/table", // backend route
    types: {
      REQUEST: "GET_TABLES_REQUEST",
      SUCCESS: "GET_TABLES_SUCCESS",
      ERROR: "GET_TABLES_ERROR",
    },
    onSuccess,
  });
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
  addPackageAction,
  getpackageDataAction,
  updatePackageDataAction,
  deletePackageDataAction,
  getpackageCustomerDataAction,
  updateOrderDataAction,
  createTableAction,
  getTableAction,
};
