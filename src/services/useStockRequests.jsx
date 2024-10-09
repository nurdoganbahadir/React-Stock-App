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
      toastSuccessNotify("The splicing was successful.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Insertion failed.");
    }
  };
  const deleteStock = async (path, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`${path}/${id}`);
      getStock(path);
      toastSuccessNotify("The deletion was successful.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("The deletion failed.");
    }
  };

  const updateStock = async (path, data) => {
    dispatch(fetchStart());
    try {
      await axiosToken.put(`${path}/${data._id}`, data);
      getStock(path);
      toastSuccessNotify("The information has been successfully updated.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("The update of the information failed.");
    }
  };

  return { getStock, postStock, deleteStock, updateStock };
};

export default useStockRequests;
