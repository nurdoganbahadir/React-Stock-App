import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFirmSuccess,
  fetchFail,
  fetchStart,
  firmListSuccess,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useEffect } from "react";

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Tüm istekler için temel URL
});

const useApiRequests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  client.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  });

  const login = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await client.post(`/auth/login`, userData);
      toastSuccessNotify("Login işlemi başarılı");
      dispatch(loginSuccess(data));
      navigate("stock");
    } catch (error) {
      toastErrorNotify("Login işlemi başarısız");
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await client.post(`/users/`, userData);
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
      await client(`/auth/logout/`, {
        headers: { Authorization: `Token ${token}` },
      });
      navigate("/");
      dispatch(logoutSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  //!firms
  const addFirm = async (firmData) => {
    try {
      const { data } = await client.post(`/firms/`, firmData);
      toastSuccessNotify("Firma başarıyla eklendi");
      navigate("/stock/firms/");
      dispatch(addFirmSuccess(data));
    } catch (error) {
      toastErrorNotify("Firma eklemesi başarısız oldu.");
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getFirm = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await client.get(`/firms/`);
      toastSuccessNotify("Firma listeleme başarılı");
      dispatch(firmListSuccess(data));
    } catch (error) {
      toastErrorNotify("Firmalar görüntülenirken bir hata oluştu.");
      dispatch(fetchFail());
      console.log(error);
    }
  };

  useEffect(() => {
    getFirm();
  }, []);

  return { login, register, logout, addFirm, getFirm };
};

export default useApiRequests;
