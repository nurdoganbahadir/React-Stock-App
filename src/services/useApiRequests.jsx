import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";

const useApiRequests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const login = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        userData
      );
      toastSuccessNotify("Login işlemi başarılı");
      dispatch(loginSuccess(data));
      navigate("stock");
      console.log(data);
    } catch (error) {
      toastErrorNotify("Login işlemi başarısız");
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const register = async (userData) => {
    console.log(userData);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/`,
        userData
      );
      toastSuccessNotify("Register işlemi başarıyla sonuçlandı.");
      navigate("/");
      console.log(data);
      dispatch(registerSuccess());
    } catch (error) {
      toastErrorNotify("Register işlemi başarısız oldu.");
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axios(`${process.env.REACT_APP_BASE_URL}/auth/logout/`, {
        headers: { Authorization: `Token ${token}` },
      });
      navigate("/");
      dispatch(logoutSuccess());
    } catch (error) {
      console.log(error);
    }
  };
  return { login, register, logout };
};

export default useApiRequests;
