import { useDispatch } from "react-redux";
import {
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
      await axiosToken.post(path, values);
      getStock(path);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };
  const deleteStock = async (path, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`${path}/${id}`);
      getStock(path);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  return { getStock, postStock, deleteStock };
};

export default useStockRequests;
