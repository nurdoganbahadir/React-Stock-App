// import axios from "axios"
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, getStockSuccess } from "../features/stockSlice";
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

  return { getStock };
};

export default useStockRequests;
