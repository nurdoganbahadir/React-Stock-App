// import axios from "axios"
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
      const { data } = await axiosToken.post(path, values);
      console.log(data);
      dispatch(postStockSuccess({ data: data.data, path }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  return { getStock, postStock };
};

export default useStockRequests;
