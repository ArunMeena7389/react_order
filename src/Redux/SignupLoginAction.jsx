import Config from "../Config";
import { typeData } from "./type";
import axios from "axios";

const OtpAction = (datas, onSucces, onError) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        Config.url + "/person/send-otp",
        datas,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response;
      onSucces(data);
      dispatch({ type: typeData.OTP_GENRATE_ACCOUNT, payload: data });
    } catch (error) {
      onError(error);
      dispatch({ type: typeData.OTP_GENRATE_ERROR, payload: error });
    }
  };
};

const SignpuAction = (datas) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        Config.url + "/person/register",
        datas,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response;
      localStorage.setItem("token", data?.data?.token);
      dispatch({ type: typeData.CREATE_SIGNUP_ACCOUNT, payload: data });
    } catch (error) {
      dispatch({ type: typeData.CREATE_SIGNUP_ERROR, payload: error });
    }
  };
};

const LoginAction = (datas, onSucces, onError) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(Config.url + "/person/login", datas, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response;
      localStorage.setItem("token", data?.data?.token);
      localStorage.setItem("profile", JSON.stringify(data?.data?.response));
      localStorage.setItem("businessID", data?.data?.response?._id);
      onSucces(data);
      dispatch({ type: typeData.SUBMIT_LOGIN_ACCOUNT, payload: data });
    } catch (error) {
      onError(error);
      dispatch({ type: typeData.SUBMIT_LOGIN_ERROR, payload: error });
    }
  };
};

export { OtpAction, SignpuAction, LoginAction };
