import axios from "axios"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import { fetchFail, fetchStart, loginSuccess } from "../features/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

//?Custom hook
const useApiRequest = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = async (userData) => {
    //   const BASE_URL = "https://10001.fullstack.clarusway.com"

    dispatch(fetchStart())
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        userData
      )
      dispatch(loginSuccess(data))
      toastSuccessNotify("Login işlemi başarılı")
      navigate("/stock")
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Login başarısız oldu")
      console.log(error)
    }
  }

  const register = async () => {}
  const logout = async () => {}

  return { login, register, logout }
}

export default useApiRequest
