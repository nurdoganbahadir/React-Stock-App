import axios from "axios";

export const login = async (userData) => {
  const BASE_URL = "https://11194.fullstack.clarusway.com";
  const data = await axios(`${BASE_URL}/auth/login`, userData);
  console.log(data);
};
