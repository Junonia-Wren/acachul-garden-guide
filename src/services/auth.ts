import axios from "../api/axios";

export const registerUser = async (userData: {
  name: string;
  age: number;
  email: string;
  password: string;
  city: string;
}) => {
  const response = await axios.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post("/auth/login", credentials);
  return response.data;
};
