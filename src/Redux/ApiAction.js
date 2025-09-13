// actions/apiAction.js
import instance from "./axiosInstance";
import Config from "../Config";

export const apiAction = ({
  method = "get",
  url = "",
  payload = {},
  headers = {},
  types = {},
  onSuccess,
  onError,
}) => {
  return async (dispatch) => {
    const { REQUEST, SUCCESS, ERROR } = types;

    if (REQUEST) dispatch({ type: REQUEST });

    try {
      const isFormData = payload instanceof FormData;
      const businessID = localStorage.getItem("businessID");
      const response = await instance({
        method,
        url: `${Config.url}${url}`,
        data: ["post", "put", "patch"].includes(method) ? payload : undefined,
        headers: {
          ...(isFormData
            ? {} // don’t force Content-Type (axios sets automatically)
            : { "Content-Type": "application/json" }),
          business_id: businessID || "",
          ...headers,
        },
      });

      if (onSuccess) onSuccess(response.data);

      if (SUCCESS) {
        dispatch({
          type: SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      if (onError) onError(error);

      if (ERROR) {
        dispatch({
          type: ERROR,
          payload: error.response?.data || error.message,
        });
      }
    }
  };
};
