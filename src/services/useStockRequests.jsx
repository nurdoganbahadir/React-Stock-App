import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, getStockSuccess } from "../features/stockSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useStockRequests = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();

  const getStock = async (path) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get(path);
      dispatch(getStockSuccess({ data: data.data, path }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  const postStock = async (path, values) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(path, values);
      getStock(path);
      toastSuccessNotify("Ekleme başarılı oldu.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Ekleme başarısız oldu.");
    }
  };
  const deleteStock = async (path, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`${path}/${id}`);
      getStock(path);
      toastSuccessNotify("Silme işlemi başarılı oldu.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Silme işlemi başarısız oldu.");
    }
  };

  const updateStock = async (path, values, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.put(`${path}/${id}`, values);
      getStock(path);
      toastSuccessNotify("Bilgiler başarıyla güncellendi.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Bilgilerin güncellenmesi başarısız oldu.");
    }
  };

  return { getStock, postStock, deleteStock, updateStock };
};

export default useStockRequests;
