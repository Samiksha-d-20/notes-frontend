import api from "./api";

//Register
export const registerUser = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

// Login
export const loginUser = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  return res.data;
};

// Get logged-in user
export const getProfile = async () => {
  const res = await api.get("/auth/profile");
  return res.data.data;
};
