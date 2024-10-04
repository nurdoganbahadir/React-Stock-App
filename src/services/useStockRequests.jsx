import { useDispatch } from "react-redux";
import {
  deleteStockSuccess,
  fetchFail,
  fetchStart,
  getStockSuccess,
  postStockSuccess,
} from "../features/stockSlice";
import useAxios from "./useAxios";

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
      const { data } = await axiosToken.post(path, values);
      dispatch(postStockSuccess({ data: data.data, path }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };
  const deleteStock = async (path, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`${path}/${id}`);
      dispatch(deleteStockSuccess({ path, id }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  return { getStock, postStock, deleteStock };
};

export default useStockRequests;
